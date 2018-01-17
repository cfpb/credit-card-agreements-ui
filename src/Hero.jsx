import './Hero.less';
import { MODAL_SHOWN, MODAL_TYPE_MORE_ABOUT } from './constants'
import { connect } from 'react-redux'
import React from 'react';

/**
* Notifies the application that the "More About..." dialog box should appear
*
* @returns {string} a packaged payload to be used by Redux reducers
*/
export function showMoreAboutDialog() {
  return {
    type: MODAL_SHOWN,
    modalType: MODAL_TYPE_MORE_ABOUT,
    modalProps: {}
  }
}

export class Hero extends React.Component {
  render() {
    const socrataUrl = 'https://data.consumerfinance.gov/dataset/' +
      'Consumer-Complaints/s6ew-h6mp'

    return (
      <div className="wrapper content_wrapper">
        <div className="content_main">
          <header className="content_hero">
            <h1 className="content-header">Credit Card Agreement Database</h1>
            <p>
              If you are an issuer, email <a href="mailto:CardAgreements@consumerfinance.gov">CardAgreements@consumerfinance.gov</a> for
              agreement submission instructions. Sapien justo in libero.
              Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum
              elementum. Donec viverra auctor lobortis. Pellentesque eu est a nulla
              placerat dignissim. Morbi a enim in magna semper bibendum. Etiam
              scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget
              auctor orci nibh vel nisi.
            </p>
          </header>
        </div>
        <aside className="content_sidebar o-sidebar-content">
          <div className="block">
            <div className="m-related-links">
              <header className="m-slug-header">
                <h2 className="a-heading">More on the credit card agreement database</h2>
              </header>
              <p>View an archive of agreements submitted to the CFPB prior to March 2018.</p>
              <p><a href="https://www.consumerfinance.gov/credit-cards/agreements/#dwnld">View the archives</a></p>
              <p>Credit card agreement database disclaimer</p>
              <p><a href="#">Read credit card database disclaimer</a></p>
            </div>
          </div>
        </aside>
      </div>
    );
  }
}

export const mapStateToProps = () => ( {
} )

export const mapDispatchToProps = dispatch => ( {
  onMoreAbout: () => {
    dispatch( showMoreAboutDialog() )
  }
} )

export default connect( mapStateToProps, mapDispatchToProps )( Hero )
