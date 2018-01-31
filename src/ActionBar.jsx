import './ActionBar.less';
import { changeSize, changeSort } from './actions/paging'
import { connect } from 'react-redux'
import { FormattedNumber } from 'react-intl'
import React from 'react';
import { showExportDialog } from './actions/dataExport'

const sizes = [ 10, 25, 50, 100 ]

/* eslint-disable camelcase */

const sorts = {
  created_date_desc: 'Sort by newest to oldest',
  created_date_asc: 'Sort by oldest to newest',
  relevance_desc: 'Sort by relevance',
  relevance_asc: 'Sort by relevance (asc)'
}

/* eslint-enable camelcase */

export class ActionBar extends React.Component {
  render() {
    // This is a hideous hack. When no filter is selected, the API returns
    // 20 results so we're checking for that quantity. Yes, if a series of
    // filter selections results in 20 results it will erroneously display
    // this message. We should instead check if filters are selected and if not,
    // display this message.
    if ( this.props.total === 20 ) {
      return (
        <summary className="action-bar">
          <div>
            <h4>Showing all credit cards</h4>
          </div>
        </summary>
      );
    }
    return (
        <summary className="action-bar">
          <div>
            <h4>
              Showing <FormattedNumber value={this.props.total} /> matched results
            </h4>
          </div>
        </summary>
    );
  }
}

export const mapStateToProps = state => ( {
  size: state.query.size,
  sort: state.query.sort,
  hits: state.results.total,
  total: state.results.doc_count
} )

export const mapDispatchToProps = dispatch => ( {
  onSize: ev => {
    const iSize = parseInt( ev.target.value, 10 )
    dispatch( changeSize( iSize ) )
  },
  onSort: ev => {
    dispatch( changeSort( ev.target.value ) )
  },
  onExportResults: () => {
    dispatch( showExportDialog() )
  }
} )

export default connect( mapStateToProps, mapDispatchToProps )( ActionBar )
