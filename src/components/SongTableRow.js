import React from "react";
import { useHistory } from "react-router-dom";

const SongTableRow = ({ id, el, handleDeleteSong }) => {
  console.log(el);
  let { artistAvatar, artistName } = el.bio.dataArtist;
  let history = useHistory();
  return (
    <tr>
      <td>
        <img className="img-table" src={artistAvatar} alt={artistName} />
      </td>
      <td>{artistName}</td>
      <td>{el.lyric.songTitle}</td>
      <td>
        <button onClick={() => history.push(`/${id}`)}>Ver</button>
        <button onClick={() => handleDeleteSong(id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default SongTableRow;
