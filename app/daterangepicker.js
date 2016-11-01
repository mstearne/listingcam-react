/* eslint-disable react/no-multi-comp */

import React from 'react';
import moment from 'moment';
import {} from 'moment-range';
var fs = require('fs');
import timekeeper from 'timekeeper';
import RangePicker from '../src';

// import Header from './components/header';
// import Footer from './components/footer';
// import GithubRibbon from './components/github-ribbon';
// import CodeSnippet from './components/code-snippet';
// import Install from './components/install';
// import Features from './components/features';
// import QuickSelection from './components/quick-selection';

const today = moment();
// freeze date to April 1st
timekeeper.freeze(new Date());

function processCodeSnippet(src) {
  var lines = src.split('\n');
  lines.splice(0, 3);
  return lines.join('\n');
}


const DatePickerRange = React.createClass({
  propTypes: {
    value: React.PropTypes.object,
  },

  getInitialState() {
    return {
      value: this.props.value,
      states: null,
    };
  },

  handleSelect(value, states) {
    this.setState({value, states});
  },

  render() {
    return (
      <div>
        <RangePicker {...this.props} onSelect={this.handleSelect} value={this.state.value} />
        <div>
          <input type="text"
            value={this.state.value ? this.state.value.start.format('LL') : ""}
            readOnly={true}
            placeholder="Start date"/>
        </div>
		<div>
			<input type="text"
	          value={this.state.value ? this.state.value.end.format('LL') : ""}
	          readOnly={true}
	          placeholder="End date" />
		</div>
      </div>
    );
  },
});

// Export the componen back for use in other files
module.exports = DatePickerRange;
