<template>
  <q-page class="container" padding>
    <!-- content -->
    <nav-bar @showDialog="inception = true"/>
    <div v-if="true">
      <div class="row  q-gutter-md q-pa-md justify-center">
          <div class="col-md-3 col-12" v-for="(book,index) in books" :key="index">
            <card-book :book="book"/>
          </div>
      </div>
    </div>
    <div v-else>
        <p class=" absolute-center"> <q-icon color="primary" name="hourglass_disabled" /> sem conteúdo (Livros) </p>
    </div>
    <q-dialog v-model="inception">
      <form-book :book="book" @save="save"/>
    </q-dialog>
  </q-page>
</template>

<script>
import navBar from 'src/components/navBar.vue'
import CardBook from 'src/components/cardBook.vue'
import FormBook from 'src/components/FormBook.vue'
import { QSpinnerFacebook } from 'quasar'
export default {
  components: { navBar, CardBook, FormBook },
  name: 'MyBooks',
  created () {
    this.showLoading()
  },
  data () {
    return {
      inception: false,
      book: { title: 'fred1', author: '', isnb: '', status: '' },
      books: [
        { title: 'fred1', author: '', isnb: '', status: '' },
        { title: 'fred2', author: '', isnb: '', status: '' },
        { title: 'fred2', author: '', isnb: '', status: '' }
      ]
    }
  },
  methods: {
    save () {
      console.log('save')
    },
    showLoading () {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        message: 'carregando os livros...',
        messageColor: 'white'
      })

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = 0
      }, 3000)
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
