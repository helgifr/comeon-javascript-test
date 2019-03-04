import React, { Component} from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

import LoginForm from '../../components/login-form';

import './Login.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { username, password } = this.state;
    dispatch(loginUser(username, password));
  }

  render () {
    const { username, password } = this.state;
    const {
      location,
      isFetching,
      isAuthenticated,
      message
    } = this.props;

    if (isAuthenticated) {
      try {
        const { pathname } = location.state.from;
        return (
          <Redirect to={pathname} />
        );
      } catch (e) {
        return (
          <Redirect to="/games" />
        );
      }
    }

    return (
      <div className="login" style={{ display: 'block' }}>
        <div className="ui grid centered">
          <LoginForm
            username={username}
            password={password}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
          />
          {message &&
            <p className="login-error">{message}</p>
          }
          {isFetching &&
            <p className="login-message">Logging in <em>{username}</em>...</p>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}

export default connect(mapStateToProps)(Login);