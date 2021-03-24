const SET_BOOKS = (state, data) => {
  state.books = data
}
const SET_BOOKS_PAGE = (state, data) => {
  state.books = data.books
}
const SET_BOOK = (state, data) => {
  state.book = data
}
const ADD_BOOK = (state, data) => {
  state.books.unshift(data)
  if (state.books.length >= 30) {
    state.books.pop()
  }
}
const REMOVE_BOOK = (state, index) => {
  state.books.splice(index, 1)
}
const UPDATE_BOOK = (state, data) => {
  const index = state.books.findIndex(book => book.id === data.id)
  state.books[index] = data
  const books = state.books
  state.books = {}
  state.books = books
  console.log(state.books)
}
export {
  SET_BOOKS,
  SET_BOOK,
  ADD_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK,
  SET_BOOKS_PAGE
}
