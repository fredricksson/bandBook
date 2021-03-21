<template>
  <div>
      <q-card class="my-card" style="min-width: 400px">
        <q-card-section>
        <div class="text-h6">{{bookInfo.title}}</div>
      </q-card-section>
      <q-separator dark  />

      <q-card-section>
          <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="primary" name="attribution" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Autor</q-item-label>
            <q-item-label caption>{{bookInfo.author}}.</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="vpn_key" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Identificação do livro</q-item-label>
            <q-item-label caption>{{bookInfo.isbn | msg}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="spellcheck" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Edição</q-item-label>
            <q-item-label caption>{{bookInfo.edition}}</q-item-label>
          </q-item-section>
        </q-item>
          </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ['bookInfo'],
  filters: {
    msg: function (value) {
      if (!value) return 'sem identificação'
    }
  }

}
</script>

<style>

</style>
