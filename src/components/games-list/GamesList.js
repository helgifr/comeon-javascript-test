import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function GamesList({ games }) {
  if (games.length === 0) return null;
  return (
    games.map(({ name, description, icon, code }) => (
      <div key={code} className="game item">
        <div className="ui small image">
          <img src={icon} alt="game-icon" />
        </div>
        <div className="content">
          <div className="header"><b className="name">{name}</b></div>
          <div className="description">
            {description}
          </div>
          <div className="extra">
            <Link to={`game/${code}`} className="play ui right floated secondary button inverted">
              Play
              <i className="right chevron icon"></i>
            </Link>
          </div>
        </div>
      </div>
    ))
  );
}

GamesList.propTypes = {
  games: PropTypes.array.isRequired,
};