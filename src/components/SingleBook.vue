<template>
  <q-card class="my-card col-12" >
    <caroussel :title="bookInfo.title" :images="bookInfo.images"/>
        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="book"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row  items-center">
            <div class="text-caption text-grey  col-9">
            Autor:
          </div>
            <div class="col text-h6 ellipsis col-12">
              {{bookInfo.author}}
            </div>
            <div class="text-caption text-grey col-9">
                   Edição:
              </div>
            <div class="col-12 text-h6 ">
              {{bookInfo.edition}}
            </div>
          <div class="text-caption text-grey col-12">
            Identificação:
          </div>
          <div class="text-subtitle1 col-12">
            {{bookInfo.isbn | msg}}
          </div>
          </div>
        </q-card-section>
  </q-card>
</template>

<script>
import Caroussel from './Caroussel.vue'
export default {
  components: { Caroussel },
  props: ['bookInfo'],
  filters: {
    msg: function (value) {
      if (!value) return 'sem identificação'
      else return value
    }
  }

}
</script>

<style>

</style>
