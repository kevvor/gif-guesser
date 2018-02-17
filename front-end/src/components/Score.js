import React, { Component } from 'react';

import '../stylesheets/Score.css';

export default class Score extends Component {
    render() {
        const { score } = this.props;

        return (
            <div className="score-container">
                Score: {score}
            </div>
        )
    }
}