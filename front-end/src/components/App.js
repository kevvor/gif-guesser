import React, { Component } from 'react';

/* Components */
import Gif from './Gif';
import Form from './Form';
import Modal from './Modal';

/* Utils */
import { winningGif } from '../utils/modal';
import { getAnswer} from '../utils/words';
import { handlePromiseError } from '../utils/handlePromiseError';

/* API stuff */
import { getWords, getGifs } from '../api';

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
      },
      requestSent: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll.bind(this));
    
    this.loadPage();
  }

  loadPage() {
    getWords()
    .then(words => {
      const answer = getAnswer(words);
      this.setState({ words, answer });

      getGifs(answer) // getGifs takes one arg, a search term to fetch gifs
      .then(gifs => {
        this.setState({ gifs: gifs, isLoaded: true });
      })
    })
    .catch(handlePromiseError)
  }

  render() {
    const { error, isLoaded, words, modal, isCorrect } = this.state;
    console.log(this.state.gifs)
    const gifs = this.state.gifs.map((gif) => {
      return (
        <Gif key={gif.id}
             gif={gif.gif}
             still={gif.still}
        />
      )
    })

    if (error) {
      return <div>Error: { error.message }</div>;
    } else if (!isLoaded) {
      return <div className='answered user-msg'>Loading...</div>
    } else {
      return <div className="App">
          {modal.isOpen && 
            <Modal 
              modalClose={this.modalClose.bind(this)} 
              message={modal.message}  
              winningGif={winningGif} 
              isCorrect={isCorrect} 
              resetGame={this.resetGame.bind(this)} 
            />}
          <Form 
            words={words} 
            handleFormSubmit={this.handleFormSubmit.bind(this)} 
            handleOptionChange={this.handleOptionChange.bind(this)} 
            selectedOption={this.state.selectedOption} 
          />
          <div className="masonry">
            {gifs}
          </div>
        </div>;
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

  handleFormSubmit(e) {
    e.preventDefault();

    const { selectedOption, answer } = this.state;

    if (selectedOption === answer) {
      this.setState({ isCorrect: true })
      this.modalOpen('You got it!');
    } else if (selectedOption === null) {
      this.modalOpen('Pick something!');
    } else if (selectedOption !== answer) {
      this.setState({ isCorrect: false })
      this.modalOpen('Sorry! The answer was ' + answer + '.')
    }
  }

  handleOptionChange(e) {
    this.setState({ selectedOption: e.target.value })
  }

  handleOnScroll() {
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    let clientHeight = document.documentElement.clientHeight || window.innerHeight;
    let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.querySearchResult();
    }
  }

  querySearchResult() {
    if (this.state.requestSent) {
      return;
    }
    this.setState({ requestSent: true })
    getGifs(this.state.answer)
      .then(newGifs => {
        this.setState({
          requestSent: false,
          gifs: this.state.gifs.concat(newGifs)
        })
      })
  }

}

export default App;
