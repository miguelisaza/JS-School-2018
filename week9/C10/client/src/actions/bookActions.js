const loadBookshelf = (bookshelf) => ({
    type: 'LOAD_BOOKSHELF',
    payload: {
        bookshelf
    }
})
const locationFilter = (location) => ({
    type: 'LOCATION_FILTER',
    payload: {
        location
    }
})

const searchFilter = (filterText) => ({
    type: 'TEXT_FILTER',
    payload: {
        filterText
    }
})

const display = (shape) => ({
    type: 'CHANGE_DISPLAY_SHAPE',
    payload: {
        shape
    }
})

export {
    loadBookshelf,
    locationFilter,
    searchFilter,
    display
}