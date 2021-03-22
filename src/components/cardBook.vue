<template>
  <div>
      <q-card class="my-card">
        <div class="col-6">
        <q-img :src="book.image_url" style="height: 300px">
          <div class="absolute-top text-center text-subtitle1">
            {{book.title}}
            <q-icon @click="addImage(book.id)" class="absolute all-pointer-events" size="32px" name="add_photo_alternate" color="white" style="top: 8px; left: 8px">
            <q-tooltip>
              imagens
            </q-tooltip>
          </q-icon>
          </div>
        </q-img>
      </div>
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
        <q-btn flat   :loading="loading2" rounded icon="create"  color="secondary"  @click="editbook(book.id)" />
        <q-btn flat   :loading="loading3" rounded  icon="remove_circle_outline" color="red"  @click="confirm = true"/>
      </q-card-actions>
    </q-card>
    <q-dialog v-model="single" >
      <single-book :bookInfo="info"/>
    </q-dialog>
    <q-dialog v-model="edit">
      <edit-form :book="bookEdit" @update="update()"/>
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
    <q-dialog v-model="addimage" >
      <form-image :id="book.id"/>
    </q-dialog>
  </div>
</template>

<script>
import firebase from 'firebase'
import EditForm from './EditForm.vue'
import SingleBook from './SingleBook.vue'
import { mapActions, mapState } from 'vuex'
import Vue from 'vue'
import FormImage from './FormImage.vue'
export default {
  components: { EditForm, SingleBook, FormImage },
  props: ['book'],
  data () {
    return {
      bookEdit: '',
      title: '',
      addimage: false,
      loading: false,
      loading2: false,
      loading3: false,
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
    addImage () {
      this.addimage = true
    },
    singleBook (id) {
      this.loading = true
      this.setBook(id).then((info) => {
        // console.log(info)
        this.info = info
        this.single = true
        this.loading = false
      })
      // console.log(this.setBook(id))
    },
    editbook (id) {
      this.loading2 = true
      this.setBook(id).then((info) => {
        this.bookEdit = info
        this.edit = true
        this.loading2 = false
      })
      // console.log(this.setBook(id))
    },
    update () {
      console.log('actualizar')
    },
    deleteBook (id) {
      this.loading3 = true

      Vue.prototype.$axios.delete(`${process.env.API}api/v1/book/${id}`)
        .then(response => {
          this.$emit('removeIndex')
          this.loading3 = false
          response.data.images.forEach(image => {
            var storageRef = firebase.storage().ref()
            var desertRef = storageRef.child(image.image_location)
            desertRef.delete().then(function () {
            }).catch(function (error) {
              console.log(error)
            })
          })
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
