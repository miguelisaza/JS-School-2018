module.exports = {
    "parser": "babel-eslint",
    "extends": ["airbnb",
        "prettier",
        "prettier/flowtype", // if you are using flow
        "prettier/react"
    ],
    "env": {
        "browser": true,
    },
    "rules": {
        "linebreak-style": ["error", "windows"],
        "react/forbid-prop-types": 0,
        "import/no-extraneous-dependencies": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "react/jsx-no-bind": [true, {
            "ignoreRefs": true,
        }],
        "import/no-mutable-exports": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "jsx-a11y/anchor-is-valid": 0,


    }
};