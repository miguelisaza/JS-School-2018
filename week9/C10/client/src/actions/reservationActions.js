const openReservationModal = () => ({
    type: 'OPEN_RESERVATION_MODAL',
})

const closeReservationModal = () => ({
    type: 'CLOSE_RESERVATION_MODAL',
})

const loadBookInModal = (bookInModal) => ({
    type: 'LOAD_BOOK_IN_MODAL',
    payload: {
        bookInModal
    }
})
export {
    openReservationModal,
    closeReservationModal,
    loadBookInModal,
}