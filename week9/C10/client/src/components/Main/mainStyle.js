const mainStyle = {
  "@global": {
    '.fa': {
      position: 'relative',
      top: 2,
      fontSize: 12,
      maxWidth: 10
    },
    body: {
      margin: "0",
    },
    'ol, ul': {
      fontSize: 12,
      lineHeight: '34px'
    },
    i: {
      padding: '0 16px'
    },
    a: {
      color: 'inherit',
      textDecoration: 'none'
    },
    '.display-btn': {
      padding: '0 5.5px'
    },
    '::-webkit-scrollbar': {
      display: 'none'
    },

    // global media queries
    '@media only screen and (max-height: 550px),\nscreen and (max-width: 1200px)': {
      '.wrapper': {
        height: '100%'
      },
      '.sidebar': {
        display: 'none'
      },
      '.books-headers': {
        display: 'none'
      },
      '#title': {
        flex: '1'
      },
      '#profile-ph': {
        margin: '-8px 10px'
      },
      '.search': {
        flex: '2',
        right: '2%'
      },
      '.fa-bars': {
        fontSize: 25
      },
      '#search-bar input[type="text"]': {
        width: '40%'
      },
      '#mobile': {
        paddingTop: 10,
        display: 'block',
        paddingRight: 10,
        fontSize: 30
      },
      '#mobile a': {
        maxHeight: 20,
        fontSize: 20
      },
      '#filters': {
        backgroundColor: '#7fccea'
      },
      '#filters:hover': {
        backgroundColor: '#48bceb'
      }
    },

    '@media only screen and (max-width: 880px)': {
      '.search': {
        flex: '1',
        right: '7%'
      }
    },
    '@media only screen and (max-width: 725px)': {
      '#search-bar input[type="text"]': {
        display: 'none'
      },
      '.search': {
        flex: 'none'
      }
    },
    '@media only screen and (max-width: 600px)': {
      '#login': {
        display: 'none'
      }
    }

  },

  "@font-face": [{
      fontFamily: "pluto-sans",
      fontWeight: "bolder",
      src: "url(/assets/Pluto-Sans-Bold.otf)"
    },
    {
      fontFamily: "pluto-sans",
      fontWeight: "bold",
      src: "url(/assets/Pluto-Sans-Medium.otf)"
    },
    {
      fontFamily: "pluto-sans",
      fontStretch: "condensed",
      fontWeight: "bolder",
      src: "url(/assets/Pluto-Sans-Cond-Bold.otf)"
    },
    {
      fontFamily: "pluto-sans",
      fontStretch: "condensed",
      fontWeight: "bold",
      src: "url(/assets/Pluto-Sans-Cond-Medium.otf)"
    },
    {
      fontFamily: "pluto-sans",
      fontStretch: "condensed",
      fontWeight: "normal",
      src: "url(/assets/Pluto-Sans-Cond-Regular.otf)"
    },
    {
      fontFamily: "pluto-sans",
      fontStretch: "condensed",
      fontWeight: "lighter",
      src: "url(/assets/Pluto-Sans-Cond-Light.otf)"
    },
    {
      fontFamily: "pluto-sans",
      fontStretch: "condensed",
      fontWeight: "lighter",
      src: "url(/assets/Pluto-Sans-Cond-Light.otf)"
    }
  ],

  main: {
    fontFamily: "pluto-sans"
  }

};

export default mainStyle