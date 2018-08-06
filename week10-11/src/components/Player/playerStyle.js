const styles = theme => ({
    player: {
        margin: 0,
        padding: 0,
        width: "100%",
        position: "relative",
        top: "64px"
    },
    progress: {
        margin: theme.spacing.unit * 2,
        position: "absolute",
        top: "40%",
        left: "34.2%",
        width: "125px",
        height: "inherit"
    },

    countDownText: {
        position: "absolute",
        top: "46%",
        left: "38.8%"

    }
});

export default styles;