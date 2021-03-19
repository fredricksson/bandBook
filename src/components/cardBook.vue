<template>
  <div>
      <q-card class="my-card">
      <caroussel/>
      <q-card-section>
          <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="primary" name="attribution" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Autor</q-item-label>
            <q-item-label caption>Mia Couto.</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="vpn_key" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Identificação do livro</q-item-label>
            <q-item-label caption>111-222-333-444-1.</q-item-label>
          </q-item-section>
        </q-item>
          </q-list>
      </q-card-section>
      <q-card-actions>
        <q-btn flat color="primary" label="Modificar" />
        <q-btn flat color="red" label="Remover" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import Caroussel from './Caroussel.vue'
export default {
  components: { Caroussel }

}
</script>

<style>

</style>
