<template>
  <div>
      <q-card class="my-card">
      <caroussel :title="book.title" :image="book.image_url"/>
      <q-card-section>
          <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="primary" name="attribution" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Autor</q-item-label>
            <q-item-label caption>{{book.author}}.</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="local_library" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Status</q-item-label>
            <q-item-label caption>{{book.status | msg}}</q-item-label>
          </q-item-section>
        </q-item>
          </q-list>
      </q-card-section>
      <q-card-actions  style="background-color: black">
        <q-btn flat  :loading="loading" rounded  icon="info"  color="primary"  @click="singleBook(book.id)" />
        <q-btn flat   rounded icon="create"  color="secondary"  @click="edit = true" />
        <q-btn flat   rounded  icon="remove_circle_outline" color="red"  @click="confirm = true"/>
      </q-card-actions>
    </q-card>
    <q-dialog v-model="single" >
      <single-book :bookInfo="info"/>
    </q-dialog>
    <q-dialog v-model="edit">
      <edit-form :book="book" @update="update()"/>
    </q-dialog>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="red" text-color="white" />
          <span class="q-ml-sm">Tem certeza de que pretende apagar o {{book.title}} ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="confirmar" color="primary" @click="deleteBook(book.id)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Caroussel from './Caroussel.vue'
import EditForm from './EditForm.vue'
import SingleBook from './SingleBook.vue'
import { mapActions, mapState } from 'vuex'
import Vue from 'vue'
export default {
  components: { Caroussel, EditForm, SingleBook },
  props: ['book'],
  data () {
    return {
      loading: false,
      info: {},
      single: false,
      edit: false,
      inception: false,
      confirm: false
    }
  },
  computed: {
    ...mapState('book', ['bookInfo'])
  },
  methods: {
    ...mapActions('book', ['setBook']),
    singleBook (id) {
      this.loading = true
      this.setBook(id).then((info) => {
        console.log(info)
        this.info = info
        this.single = true
        this.loading = false
      })
      // console.log(this.setBook(id))
    },
    update () {
      console.log('actualizar')
    },
    deleteBook (id) {
      Vue.prototype.$axios.delete(`${process.env.API}api/v1/book/${id}`)
        .then(response => {
          console.log(response)
        })
    }
  },
  filters: {
    msg: function (value) {
      if (value === 'owned') return 'Propietario (Seu livro)'
      else return 'Desejado'
    }
  }

}
</script>

<style>

</style>
