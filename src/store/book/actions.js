import Vue from 'vue'
import { QSpinnerFacebook, Loading, Notify } from 'quasar'

const setBooks = ({ commit }) => {
  Loading.show({
    delay: 100,
    spinner: QSpinnerFacebook,
    spinnerColor: 'yellow',
    spinnerSize: 140,
    backgroundColor: 'purple',
    message: 'carregando os livros...',
    messageColor: 'white'
  })
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(`${process.env.API}api/v1/books`)
      .then((response) => {
        // chamar uma mutacao para alterar o estado de post
        commit('SET_BOOKS', response.data)
        Loading.hide()
        Notify.create({
          message: 'Bem vindo ao BandBook, grave os livros que tem e desejados',
          color: 'primary',
          multiLine: true,
          icon: 'sentiment_satisfied_alt',
          actions: [
            { label: 'fechar', color: 'yellow', handler: () => { /* ... */ } }
          ]
        })
        resolve(response.data)
      })
      .catch((error) => {
        Loading.hide()
        Notify.create({
          message: 'Aviso sem conexao a internet, pode ser a causa de não carregamento de dados',
          color: 'red',
          multiLine: true,
          icon: 'wifi_off',
          actions: [
            { label: 'Fechar', color: 'yellow', handler: () => { /* ... */ } }
          ]
        })
        reject(error)
      })
  })
}
const setBooksPage = ({ commit }, page = 0) => {
  Loading.show({
    delay: 100,
    spinner: QSpinnerFacebook,
    spinnerColor: 'yellow',
    spinnerSize: 140,
    backgroundColor: 'purple',
    message: 'carregando os livros...',
    messageColor: 'white'
  })
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(`${process.env.API}api/v1/books/page/${page}`)
      .then((response) => {
        // chamar uma mutacao para alterar o estado de post
        commit('SET_BOOKS_PAGE', response.data)
        Loading.hide()
        Notify.create({
          message: 'Bem vindo ao BandBook, grave os livros que tem e desejados',
          color: 'primary',
          multiLine: true,
          icon: 'sentiment_satisfied_alt',
          actions: [
            { label: 'fechar', color: 'yellow', handler: () => { /* ... */ } }
          ]
        })
        resolve(response.data)
      })
      .catch((error) => {
        Loading.hide()
        Notify.create({
          message: 'Aviso sem conexao a internet, pode ser a causa de não carregamento de dados',
          color: 'red',
          multiLine: true,
          icon: 'wifi_off',
          actions: [
            { label: 'Fechar', color: 'yellow', handler: () => { /* ... */ } }
          ]
        })
        reject(error)
      })
  })
}
const setBook = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.get(`${process.env.API}api/v1/book/${id}`)
      .then((response) => {
        // chamar uma mutacao para alterar o estado de post
        // console.log(response.data)
        commit('SET_BOOK', response.data)
        resolve(response.data)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
  })
}
const addBook = ({ commit }, data) => {
  commit('ADD_BOOK', data)
}
const removeBook = ({ commit }, index) => {
  commit('REMOVE_BOOK', index)
}
const updateBookAction = ({ commit }, book) => {
  commit('UPDATE_BOOK', book)
}
export {
  setBooks,
  setBook,
  addBook,
  removeBook,
  updateBookAction,
  setBooksPage
}
