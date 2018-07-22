const loginStyle = {

    "@import": "url(https://fonts.googleapis.com/css?family=Roboto:300)",
    "@font-face": {
        fontFamily: "Pluto",
        src: "url(../assets/Pluto-Sans-Bold.otf)"
    },
    "loginPage": {
        fontFamily: '"Roboto", sans-serif',
        W: "antialiased",
        M: "grayscale",
        width: 360,
        padding: "8% 0 0",
        margin: "auto"
    },
    "loginHeader": {
        "& img": {
            display: "block",
            margin: "0 auto",
            paddingBottom: "10%",
            maxWidth: 300,
            width: "auto",
            height: "auto"
        },
        "& p": {
            fontFamily: "Pluto",
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 24,
            color: "#231F20",
            paddingBottom: 50,
            margin: "0",
            marginTop: -55,
            marginLeft: 145

        },
    },

    "loginForm": {
        position: "relative",
        zIndex: "1",
        background: "#6EC1E4",
        maxWidth: 360,
        margin: "0 auto 100px",
        padding: 45,
        textAlign: "center",
        borderRadius: 4,
        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.3), 0 5px 5px 0 rgba(0, 0, 0, 0.34)",
        "& input": {
            fontFamily: "Pluto, sans-serif",
            outline: "0",
            background: "#FCF8F3",
            borderRadius: 4,
            width: "100%",
            border: "0",
            margin: "0 0 15px",
            padding: 15,
            boxSizing: "border-box",
            fontSize: 14
        },
        "& button": {
            fontFamily: "Pluto",
            textTransform: "uppercase",
            outline: "0",
            background: "none",
            border: "10px solid #f5da51",
            width: "100%",
            padding: 15,
            color: "#FFFFFF",
            fontSize: 24,
            fontWeight: "bold",
            W: "all 0.3 ease",
            transition: "all 0.3 ease",
            cursor: "pointer",
            "&:hover": {
                background: "#533455"
            }
        },
        "message": {
            margin: "15px 0 0",
            color: "#FFFFFF",
            fontSize: 12,
            a: {
                color: "#f5da51",
                textDecoration: "none"
            }
        },
        "registerForm": {
            display: "none"
        },

    },

    "loginSpan": {
        display: "block",
        position: "relative",
        bottom: "1em",
        fontWeight: "bold",
        borderRadius: 5,
        padding: 7,
        background: "#f5da51"
    },

    "@media screen and (max-width: 375px)": {
        "loginForm": {
            padding: "15% 3%",
            left: -4
        }
    }
};

export default loginStyle;