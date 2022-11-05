import React, { useState, useEffect } from "react";
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import { helpHttp } from "../helpers/helpHttp";
import Error404 from "../pages/Error404";
import SongPage from "../pages/SongPage";
import { Loader } from "./Loader";
import SongDetails from "./SongDetails";
import SongForm from "./SongForm";
import SongTable from "./SongTable";

let mySongsInit = JSON.parse(localStorage.getItem("mySongs")) || [];

const SongSearch = () => {
  const [search, setSearch] = useState(null);
  const [lyric, setLyric] = useState(null);
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mySongs, setMySongs] = useState(mySongsInit);

  useEffect(() => {
    if (search === null) return;

    const fetchData = async () => {
      const { artist, song } = search;
      let artistUrl = `https://shazam.p.rapidapi.com/search?term=${artist}`;
      setLoading(true);

      const artistRes = await helpHttp()
        .get(artistUrl, {
          headers: {
            "X-RapidAPI-Key":
              "ae1561cdddmsh4a42f9b00329c1fp1438eejsnc4c31129ddaf",
            "X-RapidAPI-Host": "shazam.p.rapidapi.com",
          },
        })
        .then((res) => {
          let dataArtist = {};
          res.artists.hits.forEach((el) => {
            if (el.artist.name.toLowerCase() === artist.toLowerCase()) {
              dataArtist = {
                artistName: el.artist.name,
                artistId: el.artist.adamid,
                artistWeburl: el.artist.weburl,
                artistAvatar: el.artist.avatar,
              };
            }
          });
          console.log(dataArtist);
          if (Object.keys(dataArtist).length === 0) {
            return;
          }
          res.tracks.hits.forEach((el) => {
            if (
              el.track.subtitle.toLowerCase() === artist.toLowerCase() &&
              el.track.title.toLowerCase() === song.toLowerCase()
            ) {
              dataArtist.songKey = el.track.key;
            }
          });

          return { dataArtist };
        });
      console.log(artistRes);

      let songUrl = `https://shazam.p.rapidapi.com/songs/get-details?key=${artistRes.dataArtist.songKey}&locale=en-US`;

      const songRes = await helpHttp()
        .get(songUrl, {
          headers: {
            "X-RapidAPI-Key":
              "ae1561cdddmsh4a42f9b00329c1fp1438eejsnc4c31129ddaf",
            "X-RapidAPI-Host": "shazam.p.rapidapi.com",
          },
        })
        .then((res) => {
          console.log(res);
          if (Object.keys(res).length === 0) {
            return;
          }
          let dataSong = {
            songTitle: res.title,
            songLyrics: res.sections[1].text,
          };
          // console.log(res);
          // console.log(res.title);
          // console.log(res.sections[1].text);

          return dataSong;
        });
      console.log(songRes);

      // let key = artistRes.tracks.hits[0].track.key,
      //   songUrl = `https://shazam.p.rapidapi.com/songs/get-details?key=${key}&locale=en-US`;

      // const songRes = await helpHttp().get(songUrl, {
      //   headers: {
      //     "X-RapidAPI-Key":
      //       "ae1561cdddmsh4a42f9b00329c1fp1438eejsnc4c31129ddaf",
      //     "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      //   },
      // });

      // console.log(artist, song);

      // console.log(artistRes);

      // console.log(artistRes.artists.hits[0].artist.name);
      // console.log(artistRes.artists.hits[0].artist.adamid);
      // console.log(artistRes.artists.hits[0].artist.weburl);
      // console.log(artistRes.artists.hits[0].artist.avatar);

      // console.log(artistRes.tracks.hits[0].track.title);
      // console.log(artistRes.tracks.hits[0].track.subtitle);
      // console.log(artistRes.tracks.hits[0].track.key);
      // console.log(songRes.sections);
      // console.log(songRes.sections[1].text);

      //key -> 10579725
      //https://shazam.p.rapidapi.com/search?term=Coldplay
      //weburl -> https://music.apple.com/us/artist/coldplay/471744
      //song details -> https://shazam.p.rapidapi.com/songs/get-details?key=40333609&locale=en-US

      // console.log(artistRes, songRes);

      setBio(artistRes);
      setLyric(songRes);
      setLoading(false);
    };

    fetchData();
    localStorage.setItem("mySongs", JSON.stringify(mySongs));
  }, [search, mySongs]);

  const handleSearch = (data) => {
    //console.log(data);
    setSearch(data);
  };

  const handleSaveSong = () => {
    alert("Guardando canción");
    let currentSong = {
      search,
      lyric,
      bio,
    };
    let songs = [...mySongs, currentSong];
    setMySongs(songs);
    setSearch(null);
    localStorage.setItem("mySongs", JSON.stringify(songs));
  };
  const handleDeleteSong = (id) => {
    let isDelete = window.confirm(`¿Estás seguro de eliminar la canción?`);
    if (isDelete) {
      let songs = mySongs.filter((el, index) => index !== id);
      setMySongs(songs);
      localStorage.setItem("mySongs", JSON.stringify(songs));
    }
  };

  return (
    <div>
      <HashRouter basename="canciones">
        <header>
          <h2>Song Search</h2>
          <Link to="/">Home</Link>
        </header>
        {loading && <Loader />}
        <article className="grid-1-2">
          <Switch>
            <Route exact path="/">
              <SongForm
                handleSearch={handleSearch}
                handleSaveSong={handleSaveSong}
              />
              <SongTable
                mySongs={mySongs}
                handleDeleteSong={handleDeleteSong}
              />

              {search && !loading && (
                <SongDetails search={search} lyric={lyric} bio={bio} />
              )}
            </Route>
            <Route
              exact
              path="/:id"
              children={<SongPage mySongs={mySongs} />}
            />
            <Route path="*" children={<Error404 />} />
          </Switch>
        </article>
      </HashRouter>
    </div>
  );
};

export default SongSearch;
