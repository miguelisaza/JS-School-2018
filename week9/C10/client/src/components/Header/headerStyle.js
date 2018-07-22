const headerStyle = {

  header: {
    backgroundColor: '#fcf8f3',
    position: 'fixed',
    display: 'flex',
    flex: 2,
    width: '100%',
    height: 66,
    textAlign: 'center',
    fontSize: 17,
    borderBottom: '1px solid #6ec1e4',
    zIndex: '1',
    "& img": {
      margin: 14,
      width: 'auto',
      height: 'auto'
    },

    "& p": {
      margin: 0,
      padding: 0,
      right: 35
    },

    '& #jobsity-logo': {
      maxWidth: 150
    },

    '& #logo': {
      background: 'white',
      flex: '1.04',
      borderRight: '1px solid #d6dde5'
    }
  },

  text: {
    position: 'relative',
    padding: '11.5px 0',
    margin: '11.5px 0',
  },

  title: {
    fontWeight: 'bold',
    textAlign: 'left',
    flex: '2',
    left: 18,
    fontSize: 20
  },

  search: {
    flex: '3',
    '& form': {
      position: 'relative',
      bottom: 3
    },
    '& #search-bar input[type="text"]': {
      position: 'relative',
      left: '25.5%',
      background: 'url(../img/search-white.png) no-repeat 10px 6px #fcfcfc',
      border: '1px solid #6ec1e4',
      font: 'bold 12px Arial, Helvetica, Sans-serif',
      width: '34%',
      height: '1.3em',
      padding: '6px 15px 6px 35px',
      borderRadius: 20,
      textShadow: '0 2px 3px rgba(0, 0, 0, 0.1)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15) inset',
      transition: 'all 0.7s ease 0s',
      '&:focus': {
        width: '35%'
      }
    }

  },

  login: {
    flex: '1.04',
    borderLeft: '1px solid #d6dde5',

    '& #username': {
      fontStretch: 'condensed',
      position: 'relative',
      left: 26,
      bottom: 1,
      fontSize: 12
    },

    '& #caron': {
      position: 'relative',
      left: 33,
      top: 7
    },

    '& #profile-ph': {
      margin: '-5px 15px',
      maxHeight: 30,
      border: '1px solid #6cc0e4',
      borderRadius: '1em'
    }

  },

  dropDown: {
    display: 'block',
    position: 'absolute',
    backgroundColor: '#f1f1f1',
    width: 160,
    overflow: 'auto',
    boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.2)',
    zIndex: '1',
    top: 38,
    right: '0',

    '& a': {
      color: 'white',
      backgroundColor: '#54a2c4',
      padding: '12px 16px',
      textDecoration: 'none',
      display: 'block',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#6cc0e4'
      }
    }

  }

}

export default headerStyle;