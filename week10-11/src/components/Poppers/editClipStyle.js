const styles = theme => ({
  paper: {
    margin: theme.spacing.unit,
    position: "relative",
    bottom: "5px",
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
  },
  tagsRoot: {
    marginLeft: "1em",
    width: "12em"
  },
  tagsInput: {
    display: "inline-flex",
  }
});

export default styles;