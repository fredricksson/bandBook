<template>
 <div class=" q-gutter-md q-mr-md ">
   <div class="row">
     <div class="col-12 col-md-2">
       <q-btn color="teal" class="full-width" @click="showDialog()">
      <q-icon left size="3em" name="book" />
      <div>Adicionar Livro</div>
    </q-btn>
     </div>
   </div>
    <hr>
  </div>
</template>

<script>
export default {
  methods: {
    showDialog () {
      this.$emit('showDialog')
    }
  }
}
</script>

<style>

</style>
