import React, { Component } from 'react';

import Score from '../components/Score';

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
            <div className="form-container">
                <div id='game-form'>
                    {formButtons}
                </div>
                <Score
                    score={this.props.score}
                />
            </div>
        )
    }
}

export default Form;
