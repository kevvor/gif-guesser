import React, { Component } from 'react';
import '../stylesheets/Form.css';

class Form extends Component {
  render() {
    
    const { handleFormSubmit, handleOptionChange, selectedOption, words } = this.props;

    return (
      <form id="game-form" onSubmit={handleFormSubmit}>
        {words.map((word) =>
            <label key={word.id} className="radio-label">
              <input
                className="form-radio"
                type="radio"
                value={word.word}
                checked={selectedOption === word.word}
                onChange={handleOptionChange}
              />
              {word.word}
            </label>
        )}
        <button className="btn submit">submit</button>
      </form>
    )
  }
}

export default Form;
