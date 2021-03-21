import Vue from 'vue'
import { QSpinnerFacebook, Loading } from 'quasar'

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
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
        console.log(error)
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
export {
  setBooks,
  setBook
}
