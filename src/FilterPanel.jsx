import './FilterPanel.less'
import Agreement from './Filters/Agreement'
import { connect } from 'react-redux'
import Issuer from './Filters/Issuer'
import React from 'react'

export class FilterPanel extends React.Component {
  render() {
    const descPublicResponse = "The company's optional public-facing " +
      "response to a consumer's complaint"
    const descConsumerConsent = 'Whether a consumer opted to publish their ' +
      'compaint narrative'
    const descTags = 'Data that supports easier searching and sorting of ' +
      'complaints submitted by or on behalf of older Americans and/or ' +
      'servicemembers'

    return (
      <section className="filter-panel">
        <h3>Filter results by...</h3>
        <Agreement />
        <hr />
        <Issuer />
      </section>
    )
  }
}

const mapStateToProps = state => ( {
  aggs: state.aggs
} )

export default connect( mapStateToProps )( FilterPanel )
