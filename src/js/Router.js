
'use strict';

let React = require('react');
let ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
let Router = require('react-router');
let { Route, DefaultRoute, RouteHandler, Link } = Router;
require('./Router.css');

let Globalize = require('globalize');
Globalize.load(
  require('cldr-data/main/en/numbers'),
  require('cldr-data/main/en/currencies'),
  require('cldr-data/main/de/numbers'),
  require('cldr-data/main/de/currencies'),
  require('cldr-data/supplemental/currencyData'),
  require('cldr-data/supplemental/plurals'),
  require('cldr-data/supplemental/likelySubtags')
);
Globalize.locale('en');

let Header = require('./components/header/header');

let Food = require('./components/page/page');
let Fashion = require('./components/page/page');

let App = React.createClass({
  mixins: [ Router.State ],

  getInitialState: function() {
    return {
      locale: "en",
      currency: "GBP"
    };
  },

  render: function () {
    let name = this.getRoutes().slice(0).reverse()[0].name;

    return (
      <div>
      <Header {...this.state}>
        <nav className='appNav'>
            <ul className='appNav-list'>
              <li className='appNav-listItem'><Link className='appBtn' to='food' >Food</Link></li>
              <li className='appNav-listItem'><Link className='appBtn' to='fashion' >Fashion</Link></li>
            </ul>
        </nav>
      </Header>
        <ReactCSSTransitionGroup component="div" transitionName="routerTransition">
          <RouteHandler key={name} {...this.props} {...this.state} />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

let RedirectTo = React.createClass({
  statics: {
    willTransitionTo (transition) {
      transition.redirect('/food');
    }
  },
  render () {}
});

let routes = (
  <Route handler={App}>
    <DefaultRoute handler={RedirectTo}/>
      <Route name="food" handler={Food} addHandlerKey={true} />
      <Route name="fashion" handler={Fashion} addHandlerKey={true} />
  </Route>
);

Router.run(routes, function (Handler, state) {
  React.render(<Handler {...state} />, document.getElementById('app'));
});

module.exports = App;
