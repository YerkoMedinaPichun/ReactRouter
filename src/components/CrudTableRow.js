import React from "react";
import { useHistory } from "react-router-dom";

export const CrudTableRow = ({ el, setDataToEdit, deleteData }) => {
  let { name, house, id } = el;
  let history = useHistory();
  const handleEdit = () => {
    setDataToEdit(el);
    history.push(`/editar/${id}`);
  };
  return (
    <tr>
      <td>{name}</td>
      <td>{house}</td>
      <td>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={() => deleteData(id, name)}>Eliminar</button>
      </td>
    </tr>
  );
};
