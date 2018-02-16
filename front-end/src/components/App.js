import React, { Component } from 'react';

/* Components */
import Gif from './Gif';
import Form from './Form';
import Modal from './Modal';

/* Utils */
import { getAnswer} from '../utils/words';
import { handlePromiseError } from '../utils/handlePromiseError';

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
      isCorrect: null,
      modal: {
        isOpen: false,
        message: ''
      },
      requestSent: false,
      score: 0
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
      <Gif 
        key={gif.id}
        gif={gif.gif}
        still={gif.still}
      />
    ))

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
          <div className="masonry">
            {gifs}
          </div>
          <Form
            words={words}
            onAnswerSubmit={this.onAnswerSubmit}
            answer={this.state.answer}
          />
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
      isCorrect: null,
      modal: {
        isOpen: false,
        message: ''
      },
      requestSent: false,
      score: 0
    });
    this.loadPage();
  }

  onAnswerSubmit = answer => {
    if (answer === this.state.answer) {
      this.setState(prevState => ({ score: prevState.score + 1, isCorrect: true }));
      this.modalOpen('Yea! You got it!!1!');
    } else if (answer !== this.state.answer) {
      this.modalOpen('No.. the answer was ' + this.state.answer + ' :(');
    }
  }

  handleOnScroll = () => {
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    let clientHeight = document.documentElement.clientHeight || window.innerHeight;
    let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !this.state.modal.isOpen) { 
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

    const allGifs = this.state.gifs.allGifs.splice(5);
    const currentViewableGifs = this.state.gifs.viewableGifs.concat(this.state.gifs.allGifs.slice(0, 5));

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
