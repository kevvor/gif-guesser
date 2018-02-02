import React, { Component } from 'react';
import '../stylesheets/Modal.css'

class Modal extends Component {
  render() {
    const { message, modalClose } = this.props;
    return (
      <div>
        <div className="modal" onClick={modalClose}>
          { message }
          <br />
          Play again?
        </div>
        <div className="modal-overlay">
        </div>
      </div>
    )
  }
}

export default Modal;
