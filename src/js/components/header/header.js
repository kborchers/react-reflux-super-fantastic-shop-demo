
let React = require('react');
let Basket = require('../basket/basket.js');

let CurrencyMenu = React.createClass({
  updateCurrency: function(event) {
    this.props.updateLocalization({
      locale: this.props.locale,
      currency: event.target.value
    });
  },

  render: function() {
    return (
      <select onChange={this.updateCurrency}>
        <option value="EUR" selected={this.props.currency == "EUR" ? true : false}>EUR - €</option>
        <option value="GBP" selected={this.props.currency == "GBP" ? true : false}>GBP - £</option>
        <option value="USD" selected={this.props.currency == "USD" ? true : false}>USD - $</option>
      </select>
    );
  }
});

let LocaleMenu = React.createClass({
  updateLocale: function(event) {
    this.props.updateLocalization({
      locale: event.target.value,
      currency: this.props.currency
    });
  },

  render: function() {
    return (
      <select onChange={this.updateLocale}>
        <option value="en" selected={this.props.locale == "en" ? true : false}>English</option>
        <option value="de" selected={this.props.locale == "de" ? true : false}>Deutsch</option>
      </select>
    );
  }
});

var Header =
  React.createClass({
    render:function(){
      return (
        <div className='container'>
        <div className="pure-g">
          <header className="appHeader pure-u-1">
            <h1>Super fantastic shop</h1>
            <p>A demo shop making use of the incredible powers provided by <a href="http://facebook.github.io/react/" target="_new">react</a>, <a href="https://github.com/rackt/react-router" target="_new">react-router</a> and <a href="https://www.npmjs.com/package/reflux" target="_new">reflux</a>. <a href="https://github.com/stylecoder/react-reflux-super-fantastic-shop-demo" target="_new">View source code here.</a></p>

              { this.props.children }
          </header>
          <div className="fixed-container">
            <div className="container">
              <Basket className="pure-g" {...this.props} />
              <div className="clear float-right pure-u-3-5 pure-u-md-3-5 pure-u-lg-2-5">
                <div>
                  <div className="float-right">Currency: <CurrencyMenu {...this.props}/></div>
                  <div className="clear float-right">Locale: <LocaleMenu {...this.props}/></div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      );
    }
  });
module.exports = Header;
