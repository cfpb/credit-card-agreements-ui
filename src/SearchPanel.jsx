import './SearchPanel.less'
import { connect } from 'react-redux'
import { FormattedDate } from 'react-intl'
import PillPanel from './PillPanel'
import React from 'react';

export class SearchPanel extends React.Component {
  render() {
    var lastIndexedMessage = null;
    this.props.lastIndexed = 'Sun Mar 01 2018 01:01:01 GMT-0400 (EDT)';

    if ( this.props.lastIndexed ) {
      lastIndexedMessage =
        <span>
          <FormattedDate
            value={ this.props.lastIndexed }
            year="numeric"
            month="long"
          />
        </span>
    }

    return (
        <div>
          <h2>Search credit card agreements submitted after { lastIndexedMessage }</h2>
          <div className="search-panel">
            <PillPanel />
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => ( {
  lastIndexed: state.results.lastIndexed
} )

export default connect( mapStateToProps )( SearchPanel )
