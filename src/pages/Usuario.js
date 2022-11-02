import React from "react";
import { useParams } from "react-router-dom";

const Usuario = () => {
  // let params = useParams();
  // console.log(params);
  let { username, age } = useParams();
  return (
    <div>
      <h3>Perfil del Usuario</h3>
      <p>
        Nombre del usuario <b>{username}</b> de {age} años
      </p>
    </div>
  );
};

export default Usuario;
