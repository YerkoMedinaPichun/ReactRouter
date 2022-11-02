import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Acerca from "../pages/Acerca";
import Contacto from "../pages/Contacto";
import Dashboard from "../pages/Dashboard";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Productos } from "../pages/Productos";
import ReactTopics from "../pages/ReactTopics";
import Usuario from "../pages/Usuario";
import { MenuConceptos } from "./MenuConceptos";
import PrivateRoute from "./PrivateRoute";

const ConceptosBasicos = () => {
  return (
    <div>
      <h2>Conceptos Básicos </h2>
      <Router>
        <MenuConceptos />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/acerca" component={Acerca} />
          <Route exact path="/contacto" component={Contacto} />
          <Route exact path="/usuario/:username/:age" component={Usuario} />
          <Route exact path="/productos" component={Productos}></Route>
          <Route exact path="/about">
            <Redirect to="/acerca" />
          </Route>
          <Route exact path="/contact">
            <Redirect to="/contacto" />
          </Route>
          <Route path="/react" component={ReactTopics} />

          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/dashboard" component={Dashboard} /> */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />

          <Route path="*" component={Error404} />
        </Switch>
      </Router>
    </div>
  );
};

// const ConceptosBasicos = () => {
//   return (
//     <div>
//       <h2>Conceptos Básicos </h2>
//       <Router>
//         <Switch>
//           <Route exact path="/">
//             <h3>Home</h3>
//             <p>Bienvenidos al tema de las rutas en React</p>
//           </Route>
//           <Route exact path="/acerca">
//             <Acerca />
//             <p>
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis,
//               nam facere non quos hic sequi delectus? Velit aspernatur
//               consequatur commodi unde architecto quos repellat veniam, eos
//               rerum doloremque, exercitationem amet.
//             </p>
//           </Route>
//           <Route exact path="/contacto" children={<Contacto />} />
//           {/* <Route
//             exact
//             path="/contacto"
//             children={
//               <>
//                 <Contacto />
//                 <p>Lorem</p>
//               </>
//             }
//           /> */}
//           {/* <Route exact path="/contacto" component={Contacto} /> */}

//           {/* <Route exact path="/contacto">
//             <Contacto />
//           </Route> */}
//         </Switch>
//       </Router>
//     </div>
//   );
// };

export default ConceptosBasicos;
