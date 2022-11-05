import Message from "./Message";
import SongArtist from "./SongArtist";
import SongLyric from "./SongLyric";

const SongDetails = ({ search, lyric, bio }) => {
  // if (!artist === undefined) {
  //   console.log("Song Details :", artist);
  // }

  console.log(lyric, bio);
  if (!lyric || !bio) return null;
  //console.log(search, lyric, bio);
  let { artistAvatar, artistName, artistWeburl } = bio.dataArtist;
  let { songTitle, songLyrics } = lyric;

  //console.log(bio.dataArtist);
  //console.log(bio.dataArtist.artistName);

  //console.log(lyric.songTitle);
  return (
    <>
      {lyric.error || lyric.err || lyric.name === "AbortError" ? (
        <Message
          msg={`Error: no existe la canción '${search.song}'`}
          bgColor="#dc3545"
        />
      ) : (
        <SongLyric title={songTitle} lyrics={songLyrics} />
      )}
      {/* {!lyric ? (
        <Message
          msg={`Error: no existe la canción '${search.song}'`}
          bgColor="#dc3545"
        />
      ) : (
        <SongLyric title={songTitle} lyrics={songLyrics} />
      )} */}
      {bio ? (
        <SongArtist
          artistName={artistName}
          artistAvatar={artistAvatar}
          artistWeburl={artistWeburl}
        />
      ) : (
        <Message
          msg={`Error: no se ha encontrado el intérprete '${search.artist}'`}
          bgColor="#dc3545"
        />
      )}
    </>
  );
};

export default SongDetails;
