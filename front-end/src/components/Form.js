import React, { Component } from 'react';
import '../stylesheets/Form.css';

class Form extends Component {
  render() {
    const { onAnswerSubmit, words } = this.props;

    const formButtons = words.map(word => (
        <button
            className='btn'
            key={word.id}
            onClick={() => onAnswerSubmit(word.word)}
        >
            {word.word}
        </button>
    ))

    return (
        <div className='form'>
            {formButtons}
        </div>
    )
  }
}

export default Form;
