import './ResultsPanel.less'
import ActionBar from './ActionBar'
import { bindAll } from './utils'
import { connect } from 'react-redux'
import Loading from './Dialogs/Loading'
import { MemoryRouter } from 'react-router'
import Pagination from './Pagination'
import ProgramCard from './ProgramCard'
import React from 'react'
import Warning from './Warning'

const ERROR = 'ERROR'
const NO_RESULTS = 'NO_RESULTS'
const RESULTS = 'RESULTS'

const WARN_DATA_ISSUE = 'We’re currently experiencing technical issues that' +
  ' have delayed the refresh of data on the Consumer Complaint Database.  We' +
  ' expect to refresh the data in the next few days.'

const WARN_NARRATIVES_STALE = 'We’re currently experiencing technical issues' +
  ' that have delayed the refresh of consumer complaint narratives on the ' +
  'Consumer Complaint Database.  We expect to refresh the data in the next ' +
  'few days.'

const WARN_DATA_STALE = 'We’re currently experiencing technical issues that' +
  ' have delayed the refresh of data in the ' +
  'Consumer Complaint Database.  We expect to refresh the data in the next ' +
  'few days.'

export class ResultsPanel extends React.Component {
  constructor( props ) {
    super( props )

    // Render/Phase Map
    this.renderMap = {
      ERROR: this._renderError.bind( this ),
      NO_RESULTS: this._renderNoResults.bind( this ),
      RESULTS: this._renderResults.bind( this )
    }

    bindAll( this, [
      '_renderStaleWarnings'
    ] )
  }

  render() {
    const phase = this._determinePhase()

    return (
      <MemoryRouter>
        <section className={ this._className }>
          <ActionBar />
          { this.props.hasDataIssue ?
            <Warning text={ WARN_DATA_ISSUE } /> :
            null
          }
          { this._renderStaleWarnings() }
          { this.renderMap[phase]() }
          <Pagination />
          <Loading isLoading={this.props.isLoading || false} />
        </section>
      </MemoryRouter>
    )
  }

  // --------------------------------------------------------------------------
  // Properties

  get _className() {
    let composeClasses = 'results-panel'
    if ( this.props.className ) {
      composeClasses += ' ' + this.props.className
    }

    return composeClasses
  }

  // --------------------------------------------------------------------------
  // Phase Machine

  _determinePhase() {
    // determine the phase
    let phase = NO_RESULTS
    if ( this.props.error ) {
      phase = ERROR
    } else if ( this.props.items.length > 0 ) {
      phase = RESULTS
    }

    return phase
  }

  // --------------------------------------------------------------------------
  // Subrender Methods

  _renderError() {
    return (
       <h4></h4>
    )
  }

  _renderNoResults() {
    return (
       <h2>No results were found for your search</h2>
    )
  }

  _renderStaleWarnings() {
    return (
      <div>
      { this.props.isDataStale ?
        <Warning text={ WARN_DATA_STALE } /> :
        null
      }
      { this.props.isNarrativeStale && !this.props.isDataStale ?
        <Warning text={ WARN_NARRATIVES_STALE } /> :
        null
      }
      </div>
    )
  }

  _renderResults() {
    return (
      <ul className="cards-panel">
        { this.props.items.map(
          ( item, i ) => <ProgramCard key={item.slug} row={item} index={i} key={i} />
        )}
      </ul>
    )
  }
}

const mapStateToProps = state => ( {
  error: state.results.error,
  hasDataIssue:  state.results.hasDataIssue,
  isDataStale:  state.results.isDataStale,
  isNarrativeStale: state.results.isNarrativeStale,
  isLoading: state.results.isLoading,
  items: state.results.items
} )

export default connect( mapStateToProps )( ResultsPanel )
