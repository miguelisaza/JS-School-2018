const styles = theme => ({
  menuList: {
    padding: 0
  },
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.light,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  clipTitle: {
    position: "relative",
    bottom: "5px",
    paddingRight: "45px",
  },
  clipTime: {
    position: "relative",
    top: "14px",
    right: "48px"
  },
  currTime: {
    color: "white",
    fontSize: "1.5em",
    position: "absolute",
    top: "4px",
    right: "30px",
  },
  textContainer: {
    display: "flex",
    width: "138px"
  },
  icon: {
    fontSize: "1.2em",
    position: "relative",
    top: "2px"
  },
  iconButton: {
    width: "40px",
    height: "40px"
  }
});

export default styles;