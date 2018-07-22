const modalStyle = {
  display: {
    display: 'block'
  },

  hide: {
    display: 'none'
  },

  background: {
    zIndex: '1',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.6)'
  },

  main: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    background: '#f5f6f8',
    width: '35%',
    minHeight: '47%',
    borderRadius: '1em',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '2em',
    transition: 'all 0.7s ease 0s',
    '& #modal-loading-img': {
      display: 'flex',
      flex: '1'
    }
  },

  bookContainer: {
    display: 'flex',
    flex: '1'
  },

  bookInfo: {
    display: 'flex',
    flex: '2',
    justifyContent: 'left'
  },

  bookLabels: {
    margin: '0 1em',

    '& #modal-author': {
      fontStretch: 'condensed',
      color: '#a8a8a8'
    },

    '& #modal-location': {
      fontStretch: 'condensed',
      color: '#533455'
    },

    '& #modal-copies': {
      color: 'rgb(99, 204, 0)'
    },
    '& #modal-na': {
      color: 'rgb(238, 31, 31)'
    },
    '& #modal-loading-img': {
      display: 'flex',
      flex: '1'
    }
  },

  label: {
    margin: '0 0 5px 0',
    flex: '1'
  },

  reservation: {
    '& #submit-button': {
      fontFamily: 'pluto-sans',
      textTransform: 'uppercase',
      outline: '0',
      border: '2px solid #6EC1E4',
      borderRadius: 7,
      width: '50%',
      padding: 4,
      margin: '6px 0',
      color: '#FFFFFF',
      background: '#533455',
      fontSize: 12,
      cursor: 'pointer'
    }
  },

  buttons: {
    flex: '1',

  },

  dynButtons: {
    '& button': {
      fontFamily: 'pluto-sans',
      textTransform: 'uppercase',
      outline: '0',
      border: '5px solid #6EC1E4',
      borderRadius: 10,
      width: '100%',
      padding: 10,
      margin: '5px 0',
      color: '#FFFFFF',
      background: '#533455',
      fontSize: 15,
      fontWeight: 'bold',
      W: 'all 0.3 ease',
      transition: 'all 0.3 ease',
      cursor: 'pointer'
    }
  },

  summary: {
    flex: '1',
    '& h5': {
      margin: '1em 0'
    },
    '& #modal-book-summary': {
      fontStretch: 'condensed',
      fontWeight: 'lighter',
      fontSize: 11.1,
      margin: '0',
      maxHeight: '10em',
      overflow: 'scroll',
      textAlign: 'justify'
    }
  }
}

export default modalStyle;