import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import waitUntil from 'async-wait-until';

import Loading from '../../components/loading';

import './Game.css';

class Game extends Component {

  state = { loading: true };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    // Wait for the comeon game api to load
    // before launching game
    await waitUntil(() => window.comeon !== undefined);

    this.setState({ loading: false });

    // Launch game
    try {
      window.comeon.game.launch(id);
    } catch (error) {
      console.error('error occurred while starting game', error);
      this.setState({ error });
    }
  }

  render() {
    const { loading, error } = this.state;

    if (loading) return (<Loading />);

    return (
      <div className="ingame">
        <div className="ui grid centered">
          <div className="three wide column">
            <Link to="/games" className="ui right floated secondary button inverted">
              <i className="left chevron icon"></i>Back
            </Link>
          </div>
          <div className="ten wide column">
            <div id="game-launch">
              {error && (
                <h2 className="game__not-found">Game not found</h2>
              )}
            </div>
          </div>
          <div className="three wide column"></div>
        </div>
      </div>
    );
  }
}

export default Game;