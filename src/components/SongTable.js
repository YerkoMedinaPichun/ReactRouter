import React from "react";
import SongTableRow from "./SongTableRow";

const SongTable = ({ mySongs, handleDeleteSong }) => {
  return (
    <div>
      <h3>Mis Canciones</h3>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Artista</th>
            <th>Canción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mySongs.length > 0 ? (
            mySongs.map((el, index) => (
              <SongTableRow
                handleDeleteSong={handleDeleteSong}
                id={index}
                el={el}
                key={index}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4">Sin Canciones Guardadas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SongTable;
