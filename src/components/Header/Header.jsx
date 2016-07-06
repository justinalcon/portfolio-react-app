import React from 'react';


import connectToStores from 'alt-utils/lib/connectToStores';
import HeaderStore from '../../js/stores/HeaderStore';
import UserStore from '../../js/stores/UserStore';
import TechnologiesActions from '../../js/actions/TechnologiesActions';

import {Link, IndexLink} from 'react-router';
import BackBtn from '../Buttons/BackBtn/BackBtn';



class Header extends React.Component {
  constructor() {
    super();
  }

  // Get HeaderStore.state and pass into this.props
  static getStores(props) {
    return [HeaderStore, UserStore]
  };
  static getPropsFromStores(props) {
    var header_state = HeaderStore.getState();
    var user_state = UserStore.getState();
    return {
      header_title: header_state.header_title,
      is_logged_in: user_state.is_logged_in
    }
  };

  static propTypes = {
    header_title: React.PropTypes.string
  };

  render() {

    if(this.props.is_logged_in){

      let is_home = this.props.header_title === "";

      let title = is_home ? "PORTFOLIO" : this.props.header_title;

      let back_btn_class = "header__back-btn";
      if(is_home){
        back_btn_class += " header__back-btn--hidden";
      }

      return (
        <header>

          <div className={back_btn_class}>
            <BackBtn/>
          </div>

          <span className="header__logo font--headline"><IndexLink to="/" onClick={TechnologiesActions.loadTechnologiesDefault}>{title}</IndexLink></span>

          <nav className="header__nav">
            <Link className="btn-minimal" activeClassName="btn-minimal--active" to="/filter">
              <p className="btn-minimal__text desktop-only">Filter</p>
              <div>
                <svg className="btn-minimal__icon mobile-only" viewBox="0 0 23 23">
                  <path d="M0.406515172,0.000549815738 C0.167364453,0.0461815242 -0.00421147889,0.257351902 7.86900801e-05,0.500779332 L7.86900801e-05,2.00146788 C0.00108574804,2.12991437 0.051460339,2.25305226 0.140768242,2.34537567 L8.00375095,10.6929557 L8.00375095,19.509501 C8.00767905,19.6842195 8.10249634,19.8442237 8.25386571,19.9315696 L13.2561609,22.9329467 C13.4092217,23.0213397 13.5975658,23.022406 13.7516177,22.9357519 C13.9056696,22.8490977 14.0025631,22.6875851 14.0065052,22.5108781 L14.0065052,10.6929557 L21.791327,2.42353654 C21.7966522,2.41844159 21.8018642,2.4132296 21.8069592,2.40790436 L21.8694879,2.34537567 C21.8928913,2.32147791 21.913839,2.29529326 21.9320166,2.26721481 C21.9428937,2.2572592 21.9533253,2.24682757 21.9632809,2.23595047 C21.9930161,2.17225787 22.0089954,2.10301401 22.0101774,2.03273223 C22.0105031,2.02231332 22.0105031,2.01188679 22.0101774,2.00146788 C22.0122158,1.97545413 22.0122158,1.94932077 22.0101774,1.92330702 L22.0101774,0.500779332 C22.0101498,0.224521641 21.7862056,0.000577437364 21.5099479,0.000549815738 L0.500308207,0.000549815738 C0.484684629,-0.000183271913 0.469035267,-0.000183271913 0.453411689,0.000549815738 C0.437788112,-0.000183271913 0.42213875,-0.000183271913 0.406515172,0.000549815738 L0.406515172,0.000549815738 Z M2,1.5 L20.25,1.5 L20.25,2.22222222 L13.2066406,9.5 L9.04335937,9.5 L2,2.22222222 L2,1.5 L2,1.5 Z M9.25,11.0055992 L12.75,11.0055992 L12.75,21.1555988 L9.25,18.8718489 L9.25,11.0055992 L9.25,11.0055992 Z"></path>
                </svg>
              </div>
            </Link>
            {/*<Link className="btn-minimal" activeClassName="btn-minimal--active" to="/search">
              <p className="btn-minimal__text desktop-only">Search</p>
              <div>
                <svg className="btn-minimal__icon mobile-only" viewBox="88 8 23 20">
                    <path d="M97.2545414,24.8289953 C92.9251189,24.8289953 89.4154646,21.3806 89.4154646,17.1200077 C89.4154646,12.8594154 92.9251189,9.40413703 97.2545414,9.40413703 C101.583964,9.40413703 105.094307,12.8594154 105.094307,17.1200077 C105.094307,21.3806 101.583964,24.8289953 97.2545414,24.8289953 L97.2545414,24.8289953 Z M109.800919,28.8211496 L104.116229,23.2252506 C105.604339,21.6077398 106.519093,19.4740021 106.519093,17.1200077 C106.519093,12.0816336 102.371382,8 97.2545414,8 C92.1377009,8 87.9899902,12.0816336 87.9899902,17.1200077 C87.9899902,22.1514987 92.1377009,26.2331324 97.2545414,26.2331324 C99.465369,26.2331324 101.493108,25.4691166 103.08584,24.1957571 L108.793244,29.8123052 C109.072007,30.0876262 109.522845,30.0876262 109.800919,29.8123052 C110.079681,29.5438672 110.079681,29.0964706 109.800919,28.8211496 L109.800919,28.8211496 Z"></path>
                </svg>
              </div>
            </Link>*/}
          </nav>

        </header>
      );

    } else {
      return false;
    }

  }

}

export default Header = connectToStores(Header);
