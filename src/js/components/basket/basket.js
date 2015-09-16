
'use strict';

let React = require('react');
let Reflux = require('reflux');
let Globalize = require('globalize');
let FormatCurrency = require('react-globalize').FormatCurrency;
let FormatNumber = require('react-globalize').FormatNumber;

let basketStore = require('../../stores/basket-store');
let actions = require('../../actions/app-actions');

let AddToBasket = require('../basket/add-to-basket.js');
let RemoveFromBasket = require('../basket/remove-from-basket.js');

require('./basket.css');

let Basket = React.createClass({

  mixins: [Reflux.connect(basketStore), Reflux.ListenerMixin],

  getBasketTotals() {
    return basketStore.getBasketTotals();
  },

  getBasketData() {
    return basketStore.getBasketData();
  },

  onBasketChange() {
    this.setState(this.getBasketTotals());
  },

  componentWillMount() {
    this.setState(this.getBasketTotals());
    this.listenTo(actions.addItem, this.onBasketChange);
    this.listenTo(actions.removeItem, this.onBasketChange);
  },

  render() {
    var statusClassName = this.state.qty === 0 ? 'appBasket--is-empty ' : '';
    var list = this.getBasketData().map((item,n)=> {
      return (
        <li key={n} className="pure-g">
          <div className="pure-u-1-2">
            <span className="appBasket-itemDetails">
              {item.name} : <FormatCurrency locale={this.props.locale} currency={this.props.currency}>{item.price}</FormatCurrency>
            </span>
            <span className="appBasket-qty">x {item.qty}</span>
            </div>

          <div className="pure-u-1-2 appBasket-controls">
            <AddToBasket text="+" item={item} />
            <RemoveFromBasket item={item} />
          </div>
        </li>);
    });
    return (
      <div className={"appBasket pure-u-3-5 pure-u-md-3-5 pure-u-lg-2-5 " + statusClassName}>
        <div className="pure-g">
          <div className="appBasket-label pure-u-1-2">Basket</div>
          <div className="pure-u-1-2">
            <span className="appBasket-nrItems"> x <FormatNumber locale={this.props.locale}>{this.state.qty}</FormatNumber></span>
            <span className="appBasket-total"><FormatCurrency locale={this.props.locale} currency={this.props.currency}>{this.state.total}</FormatCurrency></span>
          </div>
        </div>
        <ul className="basketList list-reset">{list}</ul>
      </div>
    );
  }
});

module.exports = Basket;
