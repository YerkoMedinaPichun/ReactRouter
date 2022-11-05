import React, { useState } from "react";

const SongLyric = ({ title, lyrics }) => {
  const [verso, setVerso] = useState(lyrics);

  return (
    <section>
      <h3>{title}</h3>
      <div>
        {verso.map((el, index) => {
          return <p key={index}>{el}</p>;
        })}
      </div>

      {/* <blockquote
        style={{ whiteSpace: "pre-wrap" }}
      >{`${lyrics}`}</blockquote> */}
    </section>
  );
};

export default SongLyric;
