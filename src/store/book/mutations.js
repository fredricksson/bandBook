const SET_BOOKS = (state, data) => {
  state.books = data
}
const SET_BOOK = (state, data) => {
  state.book = data
}
const ADD_BOOK = (state, data) => {
  state.books.unshift(data)
}
const REMOVE_BOOK = (state, index) => {
  state.books.splice(index, 1)
}
export {
  SET_BOOKS,
  SET_BOOK,
  ADD_BOOK,
  REMOVE_BOOK
}
