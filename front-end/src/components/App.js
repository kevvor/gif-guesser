import React, { Component } from 'react';
import '../stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      gifs: [],
      words: []
    };
  }

  getSearchTerm(wordsArray) {
    console.log(wordsArray)
    for (let word of wordsArray) {
      if (word.answer === true) {
        return word.word;
      }
    }
  }

  componentDidMount() {
    fetch('api/words')
      .then(res => res.json())
      .then(words => {
        words.forEach(element => {
          const { id, word, answer = false } = element;
          this.setState({ words: [...this.state.words, {word, id, answer}] })
        })
        return words;
      })
    .then(words => {
      fetch(`api/gifs/${ this.getSearchTerm(words) }`)
        .then(res => res.json())
        .then(gifs => {
          // console.log(data)
          gifs.forEach((element) => {
            const { url, height, width, id } = element;
            this.setState({
              isLoaded: true,
              gifs: [...this.state.gifs, { url, height, width, id }]
            })
          });
          // console.log('gifs', gifs)
          return gifs;
        })//.then(data => console.log('data', data))
        // return words;
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
            <div key={gif.id} style={{backgroundImage: `url(${gif.url})`, height: `${gif.height}px`, width: `${gif.width}px`}}></div>
          ))}
        </div>
      );
    }
  }
}

export default App;
