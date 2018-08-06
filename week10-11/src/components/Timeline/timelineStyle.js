const styles = {
    root: {
        flexGrow: 1,
        position: "relative",
        top: "43px"
    },
    bar: {
        height: "25px"
    },
    marker: {
        zIndex: 1,
        position: "absolute",
        bottom: "-2px",
        color: "#FBCF02",
        fontSize: "33px",
        transform: "rotate(180deg) scaleX(0.5) translateX(25px)",
        opacity: "0.85",
        cursor: "pointer"

    },
    tooltip: {
        position: "relative",
        top: "10px",
        left: "23px"
    },
    currTime: {
        position: "absolute",
        fontSize: "3em",
        bottom: "0px",
        right: "15px"
    }
};

export default styles;