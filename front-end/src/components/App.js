import React, { Component } from 'react';

/* Components */

import Gif from './Gif';
import Form from './Form';
import Modal from './Modal';

/* Utils */

import { winningGif } from '../utils/modal';

/* Stylesheets */

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
      isCorrect: null,
      modal: {
        isOpen: false,
        message: ''
      }
    };
  }

  componentDidMount() {
    this.loadPage();
  }

  render() {
    const { error, isLoaded, words, modal, isCorrect } = this.state;

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
    } else {
      return (
        <div className="App">
          {modal.isOpen &&
            <Modal modalClose={this.modalClose.bind(this)}
                   message={modal.message}
                   winningGif={winningGif}
                   isCorrect={isCorrect}
                   resetGame={this.resetGame.bind(this)}
            />
          }
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

  modalOpen(message) {
    this.setState({
      modal: {
        isOpen: true,
        message
      }
    });
  };

  modalClose() {
    this.setState({
      modal: { isOpen: false }
    });
  };

  resetGame() {
    this.setState({
      error: null,
      isLoaded: false,
      gifs: [],
      words: [],
      answer: null,
      selectedOption: null,
      userAnswered: null,
      isCorrect: null,
      modal: {
        isOpen: false,
        message: ''
      }
    });
    this.loadPage();
  }

  handlePromiseError(error) {
    this.setState({ error })
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { selectedOption, answer, isCorrect } = this.state;

    if (selectedOption === answer) {
      this.setState({ isCorrect: true })
      this.modalOpen('You got it!');
    } else if (selectedOption === null) {
      this.modalOpen('Pick something!');
    } else if (selectedOption !== answer) {
      this.setState( isCorrect: false )
      this.modalOpen('Sorry! The answer was ' + answer + '.')
    }
  }

  handleOptionChange(e) {
    this.setState({ selectedOption: e.target.value })
  }

  getAnswer(wordsArray) {
    for (let word of wordsArray) {
      if (word.answer === true) {
        console.log(word.word)
        return word.word;
      }
    }
    this.setState({ error: {message: 'Error getting answer'} });
  }

  loadPage() {
    this.getWords()
      .then(words => {
        this.getGifs(words)
      })
      .catch(this.handlePromiseError)
  }

  getWords() {
    return (
      fetch('https://giftionary-api.herokuapp.com/api/words')
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
        .catch(this.handlePromiseError)
    )
  }

  getGifs(words) {
    return (
      fetch(`https://giftionary-api.herokuapp.com/api/gifs/${ this.state.answer }`)
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
        .catch(this.handlePromiseError)
      )
  }
}

export default App;
