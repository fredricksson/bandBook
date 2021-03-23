<template>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      style="max-height: 300px"
    >
      <q-carousel-slide :name="1" :img-src="image.image_url" :ratio="4/3" v-for="(image, index) in images" :key="index">
         <div class="absolute-top custom-caption  text-subtitle1 flex flex-center">
           {{title}}
        </div>
      </q-carousel-slide>
    </q-carousel>
</template>

<script>
export default {
  mounted () {
    console.log(this.images)
  },
  props: ['title', 'images'],
  data () {
    return {
      slide: 1
    }
  },
  computed: {
    listImages () {
      return ''
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
