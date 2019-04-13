import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import fetch from 'isomorphic-unfetch'
import axios from 'axios'
import Block from 'components/interface/Block'

class Home extends Component {
  // static async getInitialProps({ req, res, match }) {
  //   const users = await fetch('http://localhost:1337/user')
  //   const user = await users.json()
  //   return { user };
  // }

  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentDidMount() {
    axios
      .get('http://localhost:1337/user')
      .then(res => console.log(res))
  }

  render() {
    return (
      <div className="Home">
        <Block>
          <p>Hello, {this.state.user ? this.state.user[0].firstName : '...'}</p>
        </Block>
        <Block>
          <Link to="/about">О проекте</Link><br />
        </Block>
      </div>
    );
  }
}

export default Home;
