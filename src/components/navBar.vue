<template>
 <div >
   <div class="q-gutter-md q-mb-md">
     <q-card class="my-card">
      <q-card-section class="row q-gutter-y-md ">
        <div class="col-12 col-md-2 q-mr-md">
       <q-btn color="teal" class="full-width " @click="showDialog()">
      <q-icon left size="3.4em" name="book" />
      <div>Adicionar Livro</div>
    </q-btn>
     </div>
     <div class="col-12 col-md-6">
        <q-input standout  bottom-slots v-model="text" label="pesquisar" counter maxlength="24" :dense="dense" @keydown="pesquisar($event)">
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>

        <template v-slot:hint>
          pesquisar por titulo
        </template>
      </q-input>
     </div>
      </q-card-section>
    </q-card>
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      dense: false
    }
  },
  methods: {
    pesquisar (e) {
      if (e.code === 'Enter') {
        this.$emit('pesquisar', this.text)
      }
    },
    showDialog () {
      this.$emit('showDialog')
    }
  }
}
</script>

<style>

</style>
