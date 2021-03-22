<template>
<div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-card-section>
         <q-uploader
      extensions=".jpg, .png, .jpeg"
      multiple
      :factory="uploadFile"
      ref="uploader"
      auto-expand
      url=""
      stack-label="upload image"
    />
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
        console.log(data)
        const fd = new FormData()
        fd.append('image_url', data.url)
        fd.append('image_location', data.location)
        fd.append('isCover', false)
        Vue.prototype.$axios.post(`${process.env.API}api/v1/books/${this.id}`, fd)
          .then(response => {
            console.log(response.data)
          })
      }).catch((erro) => {
        console.log(erro)
      })
      return promise
    }
  }
}
</script>

<style>

</style>
