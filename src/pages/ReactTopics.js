import React from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const Topic = () => {
  let { topic } = useParams();
  return (
    <div>
      <h4>{topic}</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quas
        totam culpa maxime voluptate facere quam consequuntur ea perferendis
        repudiandae impedit nobis, delectus alias numquam nisi ipsam quia rem
        sit.
      </p>
    </div>
  );
};

const ReactTopics = () => {
  // let match = useRouteMatch();
  // console.log(match);
  //"path" nos permite construir rutas relativas <Route>
  //Mientras que "url" nos permite construir enlaces relativos <Link> o <NavLink>
  let { path, url } = useRouteMatch();
  return (
    <div>
      <h3>ReactTopics</h3>
      <ul>
        <li>
          <Link to={`${url}/jsx`}>JSX</Link>
        </li>
        <li>
          <Link to={`${url}/props`}>Props</Link>
        </li>
        <li>
          <Link to={`${url}/estado`}>Estado</Link>
        </li>
        <li>
          <Link to={`${url}/componentes`}>Componentes</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h4>Elige un tema de React</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, et
            architecto! Non quae earum exercitationem obcaecati? Nesciunt,
            laboriosam? Esse laborum natus maxime quisquam aliquid rerum debitis
            magni blanditiis, molestias qui! Sunt excepturi voluptates aut
            culpa, nesciunt cumque aspernatur repellat doloremque incidunt
            libero ea ab autem ipsum numquam quo eligendi aperiam? Libero
            commodi neque, animi recusandae minus nam maxime veniam cum?
          </p>
        </Route>
        <Route path={`${path}/:topic`} component={Topic} />
      </Switch>
    </div>
  );
};

export default ReactTopics;
