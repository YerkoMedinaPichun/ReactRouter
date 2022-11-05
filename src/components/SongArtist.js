const SongArtist = ({ artistAvatar, artistName, artistWeburl }) => {
  return (
    <section>
      <h3>{artistName}</h3>
      <img src={artistAvatar} alt={artistName} />
      <a href={artistWeburl} target="_blank" rel="noreferrer">
        Sitio web Oficial
      </a>
      {/* <img src={artist.strArtistThumb} alt={artist.strArtist} />
      <p>
        {artist.intBornYear} - {artist.intDiedYear || "Presente"}
      </p>
      <p>{artist.strCountry}</p>
      <p>
        {artist.strGenre} - {artist.strStyle}
      </p>
      <a href={`http://${artist.strWebsite}`} target="_blank" rel="noreferrer">
        Sitio Web Oficial
      </a>
      <p>{artist.strBiographyEN}</p> */}
    </section>
  );
};

export default SongArtist;
