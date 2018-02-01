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
      answer: null,
      selectedOption: null,
      userAnswered: null,
      isModalOpen: false
    };
  }

  modalOpen() {
    this.setState({ isModalOpen: true })
  }

  modalClose() {
    this.setState({ isModalOpen: false })
  }

  handleFormSubmit(e) {
    const { selectedOption, answer } = this.state;
    e.preventDefault();
    if (selectedOption === answer) {
      this.setState({ userAnswered: { message: "Correct!"} })
    } else {
      this.setState({ userAnswered: { message: `Sorry! The answer was ${answer}`} })
    }
  }

  handleOptionChange(e) {
    this.setState({ selectedOption: e.target.value })
  }

  resetGame(e) {
    e.preventDefault();
    this.setState({
      error: null,
      isLoaded: false,
      gifs: [],
      words: [],
      answer: null,
      selectedOption: null,
      userAnswered: null
    });
    this.loadPage();
  }

  getAnswer(wordsArray) {
    for (let word of wordsArray) {
      if (word.answer === true) {
        return word.word;
      }
    }
    this.setState({ error: {message: 'Error getting answer'} });
  }

  componentDidMount() {
    this.loadPage();
  }

  getWords() {
    return (
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
        .catch(error => this.setState({ error }))
    )
  }

  getGifs(words) {
    return (
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
        .catch(error => this.setState({ error }))
      )
  }

  loadPage() {
    this.getWords()
      .then(words => {
        this.getGifs(words)
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    const { error, isLoaded, words, userAnswered } = this.state;

    const gifs = this.state.gifs.map((gif) => {
      return (
        <Gif key={gif.id}
             gif={gif}
        />
      )
    })

    if (error) {
      return <div>Error: { error.message }</div>;
    } else if (!isLoaded) {
      return <div className='answered user-msg'>Loading...</div>
    } else if(userAnswered) {
      return (
        <div className='loading user-msg'>
          { userAnswered.message }
          <br/>
          <button className="btn play-again" onClick={this.resetGame.bind(this)}>Play again?</button>
        </div>
      )
    } else {
      return (
        <div className="App">
          <Form words={words}
                handleFormSubmit={this.handleFormSubmit.bind(this)}
                handleOptionChange={this.handleOptionChange.bind(this)}
                selectedOption={this.state.selectedOption}
          />
          { gifs }
        </div>
      );
    }
  }
}

export default App;
