<template>

    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      style="max-height: 300px"
    >
        <q-carousel-slide :name="1" :img-src="image" :ratio="4/3" >
         <div class="absolute-top custom-caption">
           <q-icon class="absolute all-pointer-events" size="32px" name="add_photo_alternate" color="dark" style="top: 8px; left: 8px">
            <q-tooltip>
              imagens
            </q-tooltip>
          </q-icon>
          <div class="text-subtitle1" >{{ title}}</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
</template>

<script>
export default {
  props: ['title', 'image'],
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
