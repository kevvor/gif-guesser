import React, { Component } from 'react';
import '../stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      gifs: []
    };
  }

  componentDidMount() {
    fetch('api/gifs/pickle')
      .then(res => {
        return res.json();
      })
      .then(data => {
        data.forEach((element) => {
          const gif = {
            id: element.id,
            url: element.images.original.url,
            image_height: element.images.original.height,
            image_width: element.images.original.width
          };

          this.setState({
            isLoaded: true,
            gifs: [...this.state.gifs, gif]
          })
        });
      })
  }

  render() {
    const { error, isLoaded, gifs } = this.state;
    if (error) {
      return <div>Error: { error.message }</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="App">
          {gifs.map(gif => (
            <div key={gif.id} style={{backgroundImage: `url(${gif.url})`, height: `${gif.image_height}px`, width: `${gif.image_width}px`}}></div>
          ))}
        </div>
      );
    }
  }
}

export default App;
