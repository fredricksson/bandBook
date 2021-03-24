<template>
<div class="q-pa-md  items-start q-gutter-md ">
  <q-card class="my-card row " flat bordered>
        <q-card-section class="row items-center q-pb-none">
          <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="../assets/logo.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>bandbook</q-item-label>
          <q-item-label caption>
            Adicionar imagens ou imagem
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section  class="col-12">
          <div >
               <q-uploader class="full-width"
                  extensions=".jpg, .png, .jpeg"
                  multiple
                  :factory="uploadFile"
                  ref="uploader"
                  auto-expand
                  url=""
                  stack-label="upload image"
                />
         </div>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Fechar" v-close-popup />
        </q-card-actions>
        </q-card-section>
  </q-card>
</div>
</template>

<script>
import firebase from 'firebase'
import Vue from 'vue'
export default {
  props: ['id'],
  methods: {
    uploadFile (files) {
      const promise = new Promise((resolve) => {
        // simulating a delay of 2 seconds
        const location = `bookImgs/${files[0].name}`
        const storageRef = firebase.storage().ref().child(location).put(files[0])
        storageRef.on('state_changed', snapshot => {
        // let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // percentage = Math.min(100, percentage + Math.floor(Math.random() * 22))
        }, error => { console.log(error.message) },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            const data = { url: url, location: location }
            resolve(data)
          })
        })
      })
      promise.then((data) => {
        const image = {
          image_url: data.url,
          image_location: data.location,
          isCover: false
        }
        Vue.prototype.$axios.post(`${process.env.API}api/v1/image/${this.id}`, image)
          .then(response => {
            console.log(response.data)
            this.$q.notify({
              type: 'positive',
              message: 'imagens adicionadas com sucesso'
            })
          })
      }).catch((erro) => {
        this.$q.notify({
          type: 'negative',
          message: 'erro na adição de imagens'
        })
      })
      return promise
    }
  }
}
</script>

<style>

</style>
