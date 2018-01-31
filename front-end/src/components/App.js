import React, { Component } from 'react';
import '../stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      gifs: []
    };
  }

  componentDidMount() {
    fetch('api/gifs/pickle')
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        data.forEach((element) => {
          const gif = {
            id: element.id,
            url: element.image_url,
            image_height: element.image_height,
            image_width: element.image_width
          };

          this.setState({
            gifs: [...this.state.gifs, gif]
          })
        });
      })
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: { error.message }</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="App">
          <ul>
            {items.map(item => (
              <li key={item.name}>
                {item.name} {item.price}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
