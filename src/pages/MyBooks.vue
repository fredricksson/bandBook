<template>
  <q-page class="container" padding>
    <!-- content -->
    <nav-bar @showDialog="inception = true"/>
    <div v-if="true">
      <div class="row  q-gutter-md q-pa-md justify-center">
          <div class="col-md-3 col-12" v-for="(book,index) in books" :key="index">
            <card-book :book="book" @removeIndex="removeIndex(index)"/>
          </div>
      </div>
    </div>
    <div v-else>
        <p class=" absolute-center"> <q-icon color="primary" name="hourglass_disabled" /> sem conteúdo (Livros) </p>
    </div>
    <q-dialog v-model="inception">
      <form-book :book="book" @save="save" />
    </q-dialog>
  </q-page>
</template>

<script>
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase'

var firebaseConfig = {
  apiKey: 'AIzaSyANNGIKFv2l-8erpAEU0ds5J6cXRxlkRjc',
  authDomain: 'bandbook-fc051.firebaseapp.com',
  projectId: 'bandbook-fc051',
  storageBucket: 'bandbook-fc051.appspot.com',
  messagingSenderId: '641116539309',
  appId: '1:641116539309:web:1c78745d2e994626c23924',
  measurementId: 'G-QX72JGDEYF'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
import navBar from 'src/components/navBar.vue'
import CardBook from 'src/components/cardBook.vue'
import FormBook from 'src/components/FormBook.vue'
import { mapActions, mapState } from 'vuex'
import { QSpinnerGears } from 'quasar'
import Vue from 'vue'
export default {
  components: { navBar, CardBook, FormBook },
  name: 'MyBooks',
  mounted () {
    this.setBooks()
  },
  data () {
    return {
      inception: false,
      uploadValue: 0,
      percentage: 0,
      dialog: null,
      book: { title: '', author: '', isnb: '', status: '', edition: '', images: [{ image_url: '', imageLocation: '', isCover: true }] }
      /* books: [
        { title: 'fred1', author: '', isnb: '', status: '' },
        { title: 'fred2', author: '', isnb: '', status: '' },
        { title: 'fred2', author: '', isnb: '', status: '' }
      ] */
    }
  },
  computed: {
    ...mapState('book', ['books'])
  },
  methods: {
    removeIndex (index) {
      this.books.splice(index, 1)
    },
    saveImgFirebase (file) {
      var dialog = this.$q.dialog({
        title: 'enviando dados...',
        dark: true,
        message: '0%',
        progress: {
          spinner: QSpinnerGears,
          color: 'amber'
        },
        persistent: true, // we want the user to not be able to close it
        ok: false // we want the user to not be able to close it
      })
      const location = `bookImgs/${file.name}`
      const storageRef = firebase.storage().ref().child(location).put(file)
      this.book.images[0].imageLocation = location
      storageRef.on('state_changed', snapshot => {
        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // we update the dialog
        let percentage = this.uploadValue
        const interval = setInterval(() => {
          percentage = Math.min(100, percentage + Math.floor(Math.random() * 22))

          // we update the dialog
          dialog.update({
            message: `${percentage}%`
          })
          if (this.uploadValue === 100) {
            clearInterval(interval)
            dialog.update({
              title: 'aguarde um pouco!',
              message: 'Carregando outras informacoes'
            })
          }
          // if we are done..
        }, 100)
      }, error => { console.log(error.message) },
      () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.book.images[0].image_url = url
          if (!this.book.status === 'Desejado') this.book.status = 'Owned'
          else this.book.status = 'Wished'
          Vue.prototype.$axios.post(`${process.env.API}api/v1/books`, this.book)
            .then(response => {
              dialog.update({
                title: 'feito!',
                message: `${response.data.title} foi Salvo com sucesso`,
                progress: false,
                ok: true
              })
              this.books.unshift({ id: response.data.id, title: this.book.title, status: this.book.status, author: this.book.author, image_url: url })
            })
          this.uploadValue = 0
        })
      }
      )
    },
    ...mapActions('book', ['setBooks']),
    save (payload) {
      this.saveImgFirebase(payload)
      console.log(payload)
    }
  },

  beforeDestroy () {
    if (this.timer !== 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  }
}
</script>
