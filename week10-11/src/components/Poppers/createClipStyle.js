const styles = theme => ({
  paper: {
    margin: theme.spacing.unit,
    position: "fixed",
    bottom: "3px",
    right: "80px",
    width: "222px",
    backgroundColor: theme.palette.background.default
  },
  input: {
    margin: theme.spacing.unit,
    display: "block"
  },
  text: {
    color: "black"
  },
  titleInput: {
    margin: "0 18px"
  },
  timeInput: {
    margin: "0 26px",
    marginTop: "10px",
    maxWidth: "55px"
  }
});

export default styles;