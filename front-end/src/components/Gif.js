import React from 'react';

import '../stylesheets/Gif.css';

const Gif = (props) => {
  const { gif } = props;

  return (
    <div className="gif-div">
      <figure>
        <img
          className="gif item"
          src={gif.url}
          alt={gif.id}
        />
      </figure>
    </div>
  )
}

export default Gif;
