import React from 'react';

const Gif = (props) => {
  return (
    <div style={{ backgroundImage: `url(${props.gif.url})`,
                  height: `${props.gif.height}px`,
                  width: `${props.gif.width}px` }}>
    </div>
  )
}

export default Gif