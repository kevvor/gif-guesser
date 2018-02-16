import React, { Component } from 'react';

/* Components */
import Gif from './Gif';
import Form from './Form';
import Modal from './Modal';

/* Utils */
import { getAnswer} from '../utils/words';
import { handlePromiseError } from '../utils/handlePromiseError';
import scrolledToBottom from '../utils/window';

/* API stuff */
import { getWords, getGifs } from '../api';

/* Stylesheets */
import '../stylesheets/App.css';

/* Giftionary-App */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      gifs: {
        allGifs: [],
        viewableGifs: []
      },
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
    // Check handleOnScroll() => binds event listener for when bottom of page is reached
    window.addEventListener('scroll', this.handleOnScroll);

    this.loadPage();
  }

  render() {

    const { error, isLoaded, words, modal, isCorrect } = this.state;

    const gifs = this.state.gifs.viewableGifs.map((gif) => (
      <Gif key={gif.id}
          gif={gif.gif}
          still={gif.still}
        />
      )
    )

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className='answered user-msg'>Loading...</div>
    } else {
      return (
        <div className="App">
          {modal.isOpen &&
            <Modal
              modalClose={this.modalClose}
              message={modal.message}
              isCorrect={isCorrect}
              resetGame={this.resetGame}
            />
          }
          <Form
            words={words}
            onAnswerSubmit={this.onAnswerSubmit}
            answer={this.state.answer}
          />
          <div className="masonry">
            {gifs}
          </div>
        </div>
      )
    }
  }

  loadPage() {
    getWords()
    .then(words => {
      const answer = getAnswer(words);
      this.setState({ words, answer });
      return answer;
    })
    .then(term => getGifs(term))
    .then(gifs => {
      const viewableGifs = this.state.gifs.viewableGifs.concat(gifs.slice(0, 10));
      const allGifs = gifs.splice(10)
      
      this.setState({ 
        gifs: {
          allGifs,
          viewableGifs
        }, 
        isLoaded: true 
      });
    })
    .catch(handlePromiseError)
  }

  modalOpen = message => {
    this.setState({
      modal: {
        isOpen: true,
        message
      }
    });
  }

  modalClose = () => {
    this.setState({
      modal: { 
        isOpen: false 
      }
    });
  }

  resetGame = () => {
    this.setState({
      error: null,
      isLoaded: false,
      gifs: {
        allGifs: [],
        viewableGifs: []
      },
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
    });
    this.loadPage();
  }

  onAnswerSubmit = answer => {
    console.log(answer)
    if (answer === this.state.answer) {
      console.log('You won!')
    }
  }

  handleOnScroll = () => {
    if (scrolledToBottom) { // imported from ./utils/window
      this.querySearchResult();
    }
  }

  querySearchResult() {
    // Handle multiple queries by returning if request is in state
    if (this.state.requestSent) {
      console.log('A request is already being processed');
      return;
    } else {
      this.setState({ requestSent: true });
    }

    const allGifs = this.state.gifs.allGifs.splice(10);
    const currentViewableGifs = this.state.gifs.viewableGifs.concat(this.state.gifs.allGifs.slice(0, 10));

    this.setState({
      requestSent: false,
      gifs: {
        allGifs: allGifs,
        viewableGifs: currentViewableGifs
      }
    })
  }
}

export default App;
