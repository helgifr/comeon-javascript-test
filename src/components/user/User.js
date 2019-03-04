import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import PropTypes from 'prop-types';

export function User({
  user: {
    name,
    avatar,
    event
  },
  logout
}) {
  return (
    <div className="twelve wide column">
      <div className="ui list">
        <div className="player item">
          <img className="ui avatar image" src={avatar} alt="avatar" />
          <div className="content">
            <div className="header"><b className="name">{name}</b></div>
            <div className="description event">{event}</div>
          </div>
        </div>
      </div>
      {/* logout button */}
      <div
        className="logout ui left floated secondary button inverted"
        onClick={logout}
      >
        <i className="left chevron icon"></i>Log Out
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser())
  }
};

export default connect(null, mapDispatchToProps)(User);