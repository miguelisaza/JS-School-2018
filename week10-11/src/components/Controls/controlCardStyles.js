const styles = theme => ({
  card: {
    display: "flex",
    backgroundColor: "#8a2222"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  content: {
    flex: "1 0 auto",
    textAlign: "center",
    paddingBottom: 0,
    position: "relative",
    right: "3em"
  },
  cover: {
    width: 151,
    height: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing.unit,
    position: "relative",
    left: "1em",
  },
  playIcon: {
    height: 38,
    width: 38
  },
  clipButtonsContainer: {
    marginTop: "30px"
  },
  clipButtons: {
    margin: "5px 0",
    minWidth: "110px"
  },
  autoplay: {
    position: "absolute",
    right: "21px",
    top: "88px",
    textAlign: "center",
    width: "89px",
  }
});

export default styles;