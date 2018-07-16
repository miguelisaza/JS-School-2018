const containerStyle = {
    '@global': {
        '.fa-star, .fa-star-o': {
            marginRight: 2.2,
            fontSize: 12,
            color: '#7fccea'
        }
    },

    booksWrapper: {
        flex: '5',
        backgroundColor: '#f5f6f8',
        overflow: 'auto',
        marginTop: 66,
        paddingTop: 3
    },
    booksHeader: {
        display: 'flex',
        height: 45,
        textAlign: 'center',
        alignItems: 'baseline'
    },
    booksContainer: {
        margin: '0 52px',
        marginTop: 2,
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    filterName: {
        flex: '1'
    },
    filterTitle: {
        fontStretch: 'condensed',
        fontWeight: 'lighter',
        position: 'relative',
        right: 5,
        top: 2
    },
    filterOpt: {
        position: 'relative',
        right: 1,
        margin: '0',
        padding: '0',
        flex: '2',
        color: '#a8a8a8',
        fontSize: 12,
        fontStretch: 'condensed'
    },

    displayOpt: {
        position: 'relative',
        left: 32,
        flex: '1',
        fontSize: 30,
        color: '#7fccea'
    },

    pop: {
        fontWeight: 'lighter'
    }

}


export default containerStyle;