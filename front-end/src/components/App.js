import React, { Component } from 'react';

/* Components */
import Gif from './Gif';
import Form from './Form';

import '../stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      gifs: [],
      words: [],
      answer: ''
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.selectedOption === this.state.answer)
  }

  handleOptionChange(e) {
    this.setState({ selectedOption: e.target.value })
  }

  getAnswer(wordsArray) {
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
        const arr = [];
        words.forEach(element => {
          const { id, word, answer = false } = element;
          arr.push({ id, word, answer });
        });
        this.setState({ words: arr, answer: this.getAnswer(words) });
        return words;
      })
    .then(words => {
      fetch(`api/gifs/${ this.getAnswer(words) }`)
        .then(res => res.json())
        .then(gifs => {
          const arr = [];
          gifs.forEach((element) => {
            const { url, height, width, id } = element;
            arr.push({ url, height, width, id });
          });
          this.setState({ gifs: arr, isLoaded: true });
          return gifs;
        })
      })
  }

  render() {
    const { error, isLoaded, gifs, words } = this.state;

    if (error) {
      return <div>Error: { error.message }</div>;
    } else if (!isLoaded) {
      return <div className='loading-msg'>Loading...</div>
    } else {
      return (
        <div className="App">
          <Form words={words}
                handleFormSubmit={this.handleFormSubmit.bind(this)}
                handleOptionChange={this.handleOptionChange.bind(this)}
                selectedOption={this.state.selectedOption}
          />
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
