import React, { Component } from 'react';
import Gif from './Gif';

/* Utils */
import winningGif from '../utils/modal';

import '../stylesheets/Modal.css'

class Modal extends Component {
  render() {
    const { message, isCorrect, resetGame } = this.props;

    console.log(winningGif())

    return (
      <div>
        <div className="modal" onClick={resetGame}>
          {isCorrect && <Gif gif={ winningGif() }/>}
          <p><b> { message } </b></p>
          <p>Play again?</p>
        </div>
        <div className="modal-overlay">
        </div>
      </div>
    )
  }
}

export default Modal;
