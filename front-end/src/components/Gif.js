import React from 'react';

import '../stylesheets/Gif.css';

const Gif = (props) => {
  const { gif } = props;
  return (
    <figure>
      <img
        className="gif item"
        src={gif.url}
        alt={gif.id}
      />
    </figure>
  )
}

export default Gif;
