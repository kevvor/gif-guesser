import React, { Component } from 'react';
import Gif from './Gif';

import '../stylesheets/Modal.css'

class Modal extends Component {
  // componentDidMount() {
  //   console.log(this.props.winningGif())
  // }
  render() {
    const { message, isCorrect, winningGif, resetGame } = this.props;

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
