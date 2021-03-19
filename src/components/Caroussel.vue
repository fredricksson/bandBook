<template>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" >
         <div class="absolute-top custom-caption">
          <div class="text-subtitle1" >Famous City</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" >
    <div class="absolute-top custom-caption">
          <div class="text-subtitle1" >Famous City</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" >
        <div class="absolute-top custom-caption">
          <div class="text-subtitle1" >Famous City</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
</template>

<script>
export default {
  data () {
    return {
      slide: 1
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
