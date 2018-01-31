import './ProgramDetail.less';
import { bindAll } from './utils'
import { connect } from 'react-redux'
import { FormattedDate } from 'react-intl';
import { getProgramDetail } from './actions/complaints'
import Loading from './Dialogs/Loading'
import PropTypes from 'prop-types'
import React from 'react';

const ERROR = 'ERROR'
const WAITING = 'WAITING'
const RESULTS = 'RESULTS'

export class ProgramDetail extends React.Component {
  constructor( props ) {
    super( props )

    bindAll( this, [
      '_renderBackDefault', '_renderBackDirect',
      '_renderError', '_renderResults', '_renderWaiting'
    ] )

    // Render/Phase Map
    this.renderMap = {
      ERROR: this._renderError,
      WAITING: this._renderWaiting,
      RESULTS: this._renderResults
    }
  }

  // --------------------------------------------------------------------------
  // React Methods

  componentDidMount() {
    this.props.loadDetail( this.props.complaint_id )
  }

  render() {
    return (
      <section className="card-container learning">
        { this.renderMap[this.props.phase]() }
      </section>
    )
  }

  // --------------------------------------------------------------------------
  // Global Access Methods

  _selectWhichBackButton( doc ) {
    return doc.referrer === '' ?
      this._renderBackDirect() :
      this._renderBackDefault()
  }

  _getRootUrl( fullPath ) {
    const idx = fullPath.indexOf( 'detail' )
    return fullPath.substring( 0, idx )
  }

  // --------------------------------------------------------------------------
  // Subrender Methods

  _renderBackDefault() {
    return (
      <button className="a-btn a-btn__link"
              onClick={this.props.onClickedBack}>
          <span className="cf-icon cf-icon-left"></span>
          Credit Card Agreement Data
      </button>
    )
  }

  _renderBackDirect() {
    const root = this._getRootUrl( location.pathname )
    return (
      <button className="a-btn a-btn__link"
              onClick={() => { window.location = root }}>
          <span className="cf-icon cf-icon-left"></span>
          Credit Card Agreement Data
      </button>
    )
  }

  _renderCompanyTimely( value ) {
    const styles = [ 'cf-icon', 'cf-icon__before', 'cf-icon-clock-round' ]
    if ( value.toLowerCase() === 'no' ) {
      styles.push( 'not-timely' )
    }

    return (
      <div>
        <span className={styles.join( ' ' )}></span>
        <span className="body-copy">{ value }</span>
      </div>
    )
  }

  _renderConsumerConsent( value ) {
    const iconMap = {
      'Consent provided': 'cf-icon-approved-round',
      'Consent not provided': 'cf-icon-delete-round',
      'Consent withdrawn': 'cf-icon-minus-round',
      'N/A': 'cf-icon-help-round',
      'Other': 'cf-icon-help-round'
    }

    const styles = [ 'cf-icon', 'cf-icon__before' ]
    if ( value in iconMap ) {
      styles.push( iconMap[value] )
    } else {
      styles.push( 'cf-icon-error-round' )
      value = 'No data available'
    }

    return (
      <div>
        <span className={styles.join( ' ' )}></span>
        <span className="body-copy">{ value }</span>
      </div>
    )
  }

  _renderError() {
    return (
       <h1>There was a problem retrieving { this.props.complaint_id }</h1>
    )
  }

  _renderResults() {
    const row = this.props.row
    console.log(row)

    // Process the narrative
    const narrative = row.complaint_what_happened || ''

    return (
      <main className="content content__2-1 content__bleedbar" id="main" role="main" lang="en">
        <div className="wrapper content_wrapper">
          <div className="content_main">
            <nav className="layout-row">
              <div className="back-to-search flex-fixed">
                { this._selectWhichBackButton( document ) }
              </div>
            </nav>
            <article>
              <h1>{ row.name }</h1>
              <div className="card">
                <div className="layout-column">
                  <h4>Issuer name</h4>
                  <span className="body-copy">{ row.issuer }</span>
                  <span className="body-copy">
                    <FormattedDate value={ row.date_received } />
                  </span>
                  <br />
                  <h4>Initial offer date</h4>
                  <span className="body-copy">{ row.offered }</span>
                  <br />
                  <h4>Program withdrawal date</h4>
                  <span className="body-copy">
                    { row.withdrawan ?
                      <span>this._renderPossibleHighlight( row.withdrawan )</span> :
                      <span>Not applicable, still active</span>
                    }
                  </span>
                  <br />
                  <h4>Download agreements for this card</h4>
                  { row.agreements.map( agreement =>
                    <p>
                      { agreement.effective_string }<br />
                      <a href={ agreement.uri } key={ agreement.uri }>
                        { row.name }
                      </a>
                      &nbsp;({ agreement.size })
                    </p>
                  ) }
                </div>
              </div>
            </article>
          </div>
          <aside className="content_sidebar o-sidebar-content">
            <div className="block">
              <div className="m-related-links">
                <header className="m-slug-header">
                  <h2 className="a-heading">More on the credit card agreement database</h2>
                </header>
                <h4>Archive of credit card agreements</h4>
                <p>View an archive of agreements submitted to the CFPB prior to March 2018.</p>
                <p><a href="https://www.consumerfinance.gov/credit-cards/agreements/#dwnld">View the archives</a></p>
              </div>
            </div>
            <div className="block block__flush-top">
              <div className="m-reusable-text-snippet">
                <div className="rich-text">
                  <h3>Credit card database disclaimer</h3>
                  <p>The Consumer Financial Protection Bureau (CFPB) is a 21st century agency that helps consumer finance markets work by making rules more effective, by consistently and fairly enforcing those rules, and by empowering consumers to take more control over their economic lives.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    )
  }

  _renderSub( label, value ) {
    return (
      value ?
        <div className="layout-row">
          <span className="body-copy subitem">{ label }</span>
          <span className="body-copy">{ value }</span>
        </div> :
         null
    )
  }

  _renderWaiting() {
    return (
      <Loading isLoading={true} />
    )
  }

}

// ----------------------------------------------------------------------------
// Meta

ProgramDetail.propTypes = {
  // eslint-disable-next-line camelcase
  complaint_id: PropTypes.string.isRequired,
  onClickedBack: PropTypes.func,
  phase: PropTypes.string,
  row: PropTypes.object
}

ProgramDetail.defaultProps = {
  onClickedBack: () => history.go( -1 ),
  phase: WAITING,
  row: {}
}

export const mapStateToProps = state => {
  const row = state.detail.data
  let phase = typeof row.pk === 'undefined' ? WAITING : RESULTS

  // Phase Logic
  if ( state.detail.error ) {
    phase = ERROR
  }

  return {
    phase,
    row
  }
}

export const mapDispatchToProps = dispatch => ( {
  loadDetail: id => {
    dispatch( getProgramDetail( id ) )
  }
} )

export default connect( mapStateToProps, mapDispatchToProps )( ProgramDetail )
