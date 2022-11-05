import React from "react";
import { useParams } from "react-router-dom";
import SongDetails from "../components/SongDetails";

const SongPage = ({ mySongs }) => {
  let { id } = useParams();
  let currentSong = mySongs[id];
  let { search, lyric, bio } = currentSong;
  //console.log(id, mySongs, mySongs[id]);
  return <SongDetails search={search} lyric={lyric} bio={bio} />;
};

export default SongPage;
