import React from 'react';

export default function LoginForm({
  username,
  password,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="fields">
        <div className="required field">
          <div className="ui icon input">
            <input type="text" onChange={handleInputChange} value={username} name="username" placeholder="Username" />
            <i className="user icon"></i>
          </div>
        </div>
        <div className="required field">
          <div className="ui icon input">
            <input type="password" onChange={handleInputChange} value={password} name="password" placeholder="Password" />
            <i className="lock icon"></i>
          </div>
        </div>
        <div className="field">
          <div className="ui icon input">
            <input type="submit" value="Login" />
            <i className="right chevron icon"></i>
          </div>
        </div>
      </div>
    </form>
  );
}