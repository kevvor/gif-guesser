import React, { Component } from 'react';
import Gif from './Gif';
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
    for (let word of wordsArray) {
      console.log(word.word)
    }
    for (let word of wordsArray) {
      if (word.answer === true) {
        return word.word;
      }
    }
    this.setState({ error: {message: 'Error getting search term'} });
  }

  componentDidMount() {
    fetch('api/words')
      .then(res => res.json())
      .then(words => {
        words.forEach(element => {
          const { id, word, answer = false } = element;
          this.setState({ words: [...this.state.words, {word, id, answer}] });
        });
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
      return <div className='loading-msg'>Loading...</div>
    } else {
      return (
        <div className="App">
          {gifs.map((gif) =>
            <Gif key={gif.id}
                 gif={gif}
            />
          )}
        </div>
      );
    }
  }
}

export default App;
