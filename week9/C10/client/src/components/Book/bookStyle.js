const bookStyle = {
  books: {
    width: "145px",
    height: "270px",
    margin: "18px 7px",

    "& h4": {
      fontStretch: 'condensed',
      fontWeight: 'bold',
      color: '#484848',
      margin: '0',
      marginTop: 5,
      fontSize: 13.3
    },
    "& h5": {
      fontStretch: 'condensed',
      fontWeight: 'lighter',
      color: '#aeaeae',
      margin: '0',
      marginTop: 2,
      fontSize: 10,
      fontStyle: 'normal'
    },

    "& img": {
      width: 'inherit',
      height: 210,
      borderRadius: 4,
      cursor: 'pointer'
    },

    '& #borrowed-book': {
      position: 'relative',
      left: 5,
      bottom: 50,
      width: 60,
      height: 'auto',
      opacity: '0.9'
    }

  },

  list: {
    flexDirection: 'column',
    height: 100,
    width: '100%',
    padding: '0.7em 0',
    borderBottom: '1px solid #d6dde5',

    "& h4": {
      fontStretch: 'condensed',
      fontWeight: 'bold',
      color: '#484848',
      margin: '0'
    },

    "& h5": {
      fontStretch: 'condensed',
      fontWeight: 'lighter',
      color: '#aeaeae',
      margin: '0',
      fontSize: 10,
      fontStyle: 'normal'
    },

    "& img": {
      marginRight: '1em',
      float: 'left',
      height: 'inherit',
      width: 70
    },

    '& #borrowed-list': {
      float: 'right',
      position: 'relative',
      left: 30,
      height: 'auto'
    }
  }
};

export default bookStyle;