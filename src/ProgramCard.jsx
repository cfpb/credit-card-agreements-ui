import './ProgramCard.less'
import { FormattedDate } from 'react-intl'
import React from 'react'

const MAX_NARRATIVE = 300

export default class ProgramCard extends React.Component {
  render() {
    const row = this.props.row;
    const complaintIdPath = 'detail/' + row.pk
    const index = ( this.props.index || 0 ) + 1

    return (
      <li className="card-container">
        <div className="layout-row">
          <h3 className="to-detail">
            { index }.&nbsp;
            <a href={ this._stripPossibleHighlight( complaintIdPath ) }>
              { this._stripPossibleHighlight( row.name ) }
            </a>
          </h3>
        </div>
        <div className="card">
          <div className="card-left layout-column">
            <h4>Issuer name</h4>
            { this._renderPossibleHighlight( row.issuer ) }
            <br />
            <h4>Initial offer date</h4>
            { this._renderPossibleHighlight( row.offered ) }
            <br />
            <h4>Program withdrawal date</h4>
            { row.withdrawan ?
              <span>this._renderPossibleHighlight( row.withdrawan )</span> :
              <span>Not applicable, still active</span>
            }
          </div>
          <div className="card-right layout-column">
            <h4>Download most recent agreements for this card</h4>
            { row.agreements.map( agreement =>
              <p key={ agreement.uri }>
                { agreement.effective_string }<br />
                <a href={ agreement.uri } key={ agreement.uri }>
                  { row.name }
                </a>
                &nbsp;({ agreement.size })
              </p>
            ) }
            <p>
              <a href={ this._stripPossibleHighlight( complaintIdPath ) }>
                View all agreements for { row.name }
              </a>
          </p>
          </div>
        </div>
      </li>
    )
  }

  // --------------------------------------------------------------------------
  // Helper methods

  _stripPossibleHighlight( s ) {
    const re = /(<em>)?(.*?)(<\/em>)?/gi
    return s.replace( re, '$2' )
  }

  // --------------------------------------------------------------------------
  // Subrender methods

  _renderPossibleHighlight( s ) {
    return <span className="body-copy"
                 dangerouslySetInnerHTML={ { __html: s } }>
           </span>
  }

  _renderNarrative( narrative, url ) {
    const hasOverflow = narrative.length > MAX_NARRATIVE
    narrative = narrative.substring( 0, MAX_NARRATIVE )

    return narrative ?
        <div>
          <br />
          <h4>Consumer Complaint Narrative</h4>
            { this._renderPossibleHighlight( narrative ) }
            { hasOverflow ? <span> <a href={ url }>[...]</a></span> : null }
        </div> :
       null
  }

}
