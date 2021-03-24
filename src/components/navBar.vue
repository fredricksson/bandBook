<template>
 <div >
   <div class="q-gutter-md q-mb-md ">
     <q-card class="my-card">
      <q-card-section class="row q-gutter-md justify-center">
        <div class="col-12 col-md-2">
       <q-btn color="teal" class="full-width " @click="showDialog()">
      <q-icon left size="3.4em" name="book" />
      <div>Adicionar Livro</div>
    </q-btn>
     </div>
     <div class="col-12 col-md-6">
        <q-input standout  bottom-slots v-model="text" label="pesquisar" counter maxlength="24" :dense="dense" @keyup.enter="pesquisar">
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>

        <template v-slot:hint>
          pesquisar por titulo
        </template>
      </q-input>
     </div>
     <div class="col-12 col-md-3">
       <q-select color="secondary" @input="seachByStatus"  filled v-model="status" :options="options" label="Status">
         <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
              <q-item-label caption>{{ scope.opt.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
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
      status: 'Todos',
      text: '',
      dense: false,
      options: [
        {
          label: 'Todos',
          value: 'All',
          description: 'Todos Livros',
          icon: 'view_list'
        },
        {
          label: 'Proprietario',
          value: 'Owned',
          description: 'Seus livros',
          icon: 'bookmark_added'
        },
        {
          label: 'Desejado',
          value: 'Wished',
          description: 'Livros  que pretende ter',
          icon: 'bookmark_border'
        }
      ]
    }
  },
  methods: {
    pesquisar () {
      this.$emit('pesquisar', this.text)
    },
    seachByStatus () {
      this.$emit('seachByStatus', this.status)
    },
    showDialog () {
      this.$emit('showDialog')
    }
  }
}
</script>

<style>

</style>
