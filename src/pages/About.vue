<template>
  <div class="q-pa-md">
    <q-carousel
      arrows
      animated
      v-model="slide"
      height="400px"
      infinite
      :autoplay="true"
    >
      <q-carousel-slide name="first" img-src="../assets/img/book.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">BandBook</div>
          <div class="text-subtitle1">Bem-vindo</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="../assets/img/book2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Seus livros</div>
          <div class="text-subtitle1">publique livros que você tem</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="../assets/img/book3.webp">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Desejados</div>
          <div class="text-subtitle1">Publique os livros que gostaria de ter</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
export default {
  data () {
    return {
      slide: 'first'
    }
  }
}
</script>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
