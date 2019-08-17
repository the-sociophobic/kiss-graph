import React, { Component } from 'react';

class Donations extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <iframe
        title="yandex money"
        src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%BD%D0%B0%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D1%82%D0%B8%D0%B5%20%D0%9D%D0%B0%D1%83%D0%BA%D0%B8&targets-hint=&default-sum=&button-text=11&hint=&successURL=&quickpay=shop&account=410013026058450"
        width="423"
        height="222"
        frameborder="0"
        allowtransparency="true"
        scrolling="no"
      />
    )
  }
}

export default Donations
