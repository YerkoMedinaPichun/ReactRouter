import React, { useState } from "react";
import { useEffect } from "react";
import { HashRouter, NavLink, Route, Switch } from "react-router-dom";
import { helpHttp } from "../helpers/helpHttp";
import Error404 from "../pages/Error404";

import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { Loader } from "./Loader";
import Message from "./Message";

export const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = "http://localhost:3333/personajes";

  useEffect(() => {
    setLoading(true);
    //helpHttp().get(url)
    api.get(url).then((res) => {
      if (!res.error) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        // console.log(res);
        setError(res);
      }
      setLoading(false);
    });
  }, [url]);

  const createData = (data) => {
    data.id = Date.now();
    // console.log(data);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      console.log(res);
      if (!res.error) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
    setDb([...db, data]);
  };
  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      console.log(res);
      if (!res.error) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb([...db, res]);
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };
  const deleteData = (id, name) => {
    let isDelete = window.confirm(`¿Estás seguro de eliminar "${name}"?`);

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };
      api.del(endpoint, options).then((res) => {
        if (!res.error) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <>
      <h2>CRUD API</h2>
      <article className="grid-1-2">
        <HashRouter basename="personajes">
          <header>
            <h2>CRUD API con Rutas</h2>
            <nav>
              <NavLink exact to="/" activeClassName="active">
                Personajes
              </NavLink>
              <NavLink exact to="/agregar" activeClassName="active">
                Agregar
              </NavLink>
            </nav>
          </header>
          <Switch>
            <Route exact path="/">
              {loading && <Loader />}
              {error && (
                <Message
                  msg={`Error ${error.status}: ${error.statusText}`}
                  bgColor="#dc3545"
                />
              )}

              {db && (
                <CrudTable
                  data={db}
                  setDataToEdit={setDataToEdit}
                  deleteData={deleteData}
                />
              )}
            </Route>
            <Route exact path="/agregar">
              <CrudForm
                createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
              />
            </Route>
            <Route exact path="/editar/:id">
              <CrudForm
                createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
              />
            </Route>

            <Route path="*" children={<Error404 />} />
          </Switch>
        </HashRouter>
      </article>
    </>
  );
};
