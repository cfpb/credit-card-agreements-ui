:warning: **This prototype is no longer under active development.** Contact a CFPB GitHub admin if you would like to unarchive the repo.


---

# Credit Card Agreement Database Prototype [![Travis](https://img.shields.io/travis/cfpb/credit-card-agreements-ui.svg?style=flat-square)](https://travis-ci.org/cfpb/credit-card-agreements-ui) 

A reenvisioning of CFPB's [credit card agreement database](https://www.consumerfinance.gov/credit-cards/agreements/). Based on the excellent [ccdb5-ui](https://github.com/cfpb/ccdb5-ui/).

## Installation

```bash
git clone https://github.com/cfpb/credit-card-agreements-ui
cd credit-card-agreements-ui

# Setup python development
mkvirtualenv credit-card-agreements-ui
pip install -r requirements.txt

# Setup node/react/webpack development
npm install
export CREDIT_CARD_AGREEMENTS_API_PROD=**secret api url**
export CREDIT_CARD_AGREEMENTS_API_DEV=**secret api url**
npm run build
```

## Development

To run the app in development mode:

```bash
npm start
```

Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

Enter `Control-C` to exit development mode

## How to test the software

#### Unit testing

To launch the test runner in interactive watch/test mode:

```bash
npm test
```

Enter `Control-C` to exit interactive watch mode

## Open source licensing info

1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)

## Links that were helpful

#### React-Redux
* https://egghead.io/lessons/javascript-redux-the-single-immutable-state-tree
* https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e
* https://medium.com/@kylpo/redux-best-practices-eef55a20cc72
* https://github.com/markerikson/react-redux-links/blob/master/tips-and-best-practices.md
* https://getstream.io/blog/react-redux-best-practices-gotchas/
* https://tech.affirm.com/redux-patterns-and-anti-patterns-7d80ef3d53bc
* https://github.com/gaearon/redux-devtools
