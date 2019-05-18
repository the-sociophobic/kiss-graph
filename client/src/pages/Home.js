import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Block from 'components/interface/Block'
import Parser from 'components/Parser'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentDidMount() {
    axios
      .get('user')
      .then(res => this.setState({user: res.data[0]}))
      .catch(err => console.log("DB is off"))
  }

  render() {      
    return (
      <div className="Home">
        <Block>
          {/* <p>Hello, {this.state.user ? this.state.user.firstName : '...'}</p> */}
          <p>Дратути</p>
        </Block>
        <Block>
          <Link to="/about">О проекте</Link><br />
        </Block>
        {/* <Parser /> */}
      </div>
    );
  }
}

export default Home;
