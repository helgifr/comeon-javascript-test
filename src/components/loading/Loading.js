import React, { Component } from 'react';

import './Loading.css';

class Loading extends Component {
  state = { render: false };

  componentDidMount() {
    this.timeOut = setTimeout(
      () => this.setState({
        render: true
      }), 300);
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  render() {
    const { render } = this.state;

    if (!render) return null;

    return (
      <div id="circle">
        <div className="loader">
          <div className="loader">
              <div className="loader">
                <div className="loader">
                </div>
              </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default Loading;