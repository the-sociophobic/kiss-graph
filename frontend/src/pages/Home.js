import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-unfetch'
import Block from 'components/interface/Block'
import Layout from 'components/Layout';

class Home extends Component {
  static async getInitialProps({ req, res, match }) {
    const users = await fetch('http://localhost:1337/user')
    const user = await users.json()
    return { user };
  }

  render() {
    return (
      <Layout>
      <div className="Home">
        <Block>
          <p>Hello, {this.props.user ? this.props.user[0].firstName : '...'}</p>
        </Block>
        <Block>
          <Link to="/about">О проекте</Link><br />
        </Block>
      </div>
      </Layout>
    );
  }
}

export default Home;
