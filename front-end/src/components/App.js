import React, { Component } from 'react';

/* Components */
import Gif from './Gif';
import Form from './Form';
import Modal from './Modal';

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
    const { error, isLoaded, words, modal } = this.state;

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

  handlePromiseError(error) {
    this.setState({ error })
  }

  modalOpen(message) {
    this.setState({
      modal: {
        isOpen: true,
        message
      }
    })
  }

  modalClose() {
    this.setState({
      modal: { isOpen: false }
    })
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { selectedOption, answer } = this.state;

    if (selectedOption === answer) {
      this.modalOpen('You got it!');
    } else if (selectedOption === null) {
      console.log('null')
    } else if (selectedOption !== answer) {
      this.modalOpen('Sorry! The answer was ' + answer + '.')
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
      fetch(`https://giftionary-api.herokuapp.com/api/gifs/${ this.getAnswer(words) }`)
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
