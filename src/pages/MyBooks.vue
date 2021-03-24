<template>
  <q-page class="container" padding>
    <!-- content -->
    <div class="row q-gutter-y-md">
      <div class="col-12">
        <nav-bar @showDialog="inception = true" @pesquisar="pesquisar" @seachByStatus="seachByStatus"/>
      </div>
    <div class="col-12">
      <q-card class="my-card q-mt-md">
        <q-card-section class="q-pb-none">
        <div class="text-h6">Livros</div>
      </q-card-section>
      <q-card-section >
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
       <div v-if="books.length">
          <div v-show="showSimulatedReturnData" class="row  q-gutter-md q-pa-md justify-center">
            <div class="col-md-3 col-12"  v-for="(book,index) in listBooks" :key="index">
            <card-book :book="book" @removeIndex="removeIndex(index, book.title)" @updateState="updateState" @updatePagination="updatePagination"/>
          </div>
          </div>
       </div>
        <div v-else>
        <p class=" absolute-center"> <q-icon color="primary" name="hourglass_disabled" /> Adicione livros ou veja sua conexão a internet </p>
       </div>
        </transition>
      </q-card-section>
        <div class="q-pa-lg flex flex-center">
      <q-pagination
      v-model="current"
      :max="max"
      input
      @input="loadPage()"
    />
      </div>
      <q-inner-loading :showing="visible">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
      </q-card>
    </div>
    <q-dialog v-model="inception">
      <form-book :book="book" @save="save" />
    </q-dialog>
    </div>
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
import { QSpinnerGears, QSpinnerFacebook } from 'quasar'
import Vue from 'vue'
export default {
  components: { navBar, CardBook, FormBook },
  name: 'MyBooks',
  mounted () {
    this.$q.loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'yellow',
      spinnerSize: 140,
      backgroundColor: 'purple',
      message: 'Iniciando BandBook',
      messageColor: 'white'
    })
    this.showSimulatedReturnData = true
    this.setBooksPage().then((response) => {
      this.max = response.numPages
      if (response.numPages === 0) this.current = 0
      else this.current = 1
      this.$q.loading.hide()
      this.$q.notify({
        message: 'Bem vindo ao BandBook, grave os livros que tem e desejados',
        color: 'primary',
        multiLine: true,
        icon: 'sentiment_satisfied_alt',
        actions: [
          { label: 'fechar', color: 'yellow', handler: () => { /* ... */ } }
        ]
      })
    }).catch((error) => {
      this.$q.loading.hide()
      console.log(error)
    })
  },
  data () {
    return {
      status: 'All',
      firstLoad: false,
      current: 0,
      max: 0,
      visible: false,
      showSimulatedReturnData: false,
      search: '',
      inception: false,
      uploadValue: 0,
      percentage: 0,
      dialog: null,
      book: { title: '', author: '', isbn: '', status: '', edition: '', images: [{ image_url: '', image_location: '', isCover: true }] }
      /* books: [
        { title: 'fred1', author: '', isbn: '', status: '' },
        { title: 'fred2', author: '', isbn: '', status: '' },
        { title: 'fred2', author: '', isbn: '', status: '' }
      ] */
    }
  },
  computed: {
    ...mapState('book', ['books', 'numPages']),
    listBooks () {
      // if state equals All it will retun all, else it will filter
      if (this.search === '' || this.search === ' ' || this.status === '') {
        if (this.status === 'All') return this.books
        else return this.books.filter(book => book.title === this.search || book.status === this.status)
      } else {
        if (this.status === 'All') return this.books.filter(book => book.title === this.search)
        else return this.books.filter(book => book.title === this.search || book.status === this.status)
      }
    }
  },
  methods: {
    loadPage () {
      if (this.firstLoad) {
        this.visible = true
        this.showSimulatedReturnData = false
        this.setBooksPage(this.current - 1).then((res) => {
          this.max = res.numPages
          this.visible = false
          this.showSimulatedReturnData = true
        })
      } else {
        this.firstLoad = !this.firstLoad
      }
    },
    updateState (data) {
      this.updateBookAction(data)
    },
    seachByStatus (status) {
      this.status = status.value
    },
    pesquisar (title) {
      this.search = title
    },
    removeIndex (index, title) {
      this.updatePagination().then((response) => {
        this.max = response.numPages
        if (this.books.length === 1) this.current--
      }).catch((error) => {
        console.log('erro' + error)
      })
      this.removeBook(index)
      this.$q.notify({
        type: 'positive',
        message: `O ${title} foi apagado`
      })
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
      this.book.images[0].image_location = location
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
          if (this.book.isbn === '') delete this.book.isbn
          Vue.prototype.$axios.post(`${process.env.API}api/v1/books`, this.book)
            .then(response => {
              dialog.update({
                title: 'feito!',
                message: `${response.data.title} foi Salvo com sucesso`,
                progress: false,
                ok: true
              })
              this.updatePagination().then((response) => {
                this.max = response.numPages
                if (this.books.length === 1) this.current++
              }).catch((error) => {
                console.log('erro' + error)
              })
              this.book = { title: '', author: '', isbn: '', status: '', edition: '', images: [{ image_url: '', image_location: '', isCover: true }] }
              this.addBook({ id: response.data.id, title: response.data.title, status: response.data.status, author: response.data.author, image_url: url })
            }).catch(() => {
              this.$q.notify({
                type: 'negative',
                message: 'ocorreu um erro'
              })
            })
          this.inception = false
          this.uploadValue = 0
          this.$q.notify({
            type: 'positive',
            message: 'Capa adicionada com sucesso'
          })
        })
      }
      )
    },
    ...mapActions('book', ['setBooks', 'addBook', 'removeBook', 'updateBookAction', 'setBooksPage', 'updatePagination']),
    save (payload) {
      this.saveImgFirebase(payload)
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
