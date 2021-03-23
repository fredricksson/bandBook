<template>
  <div>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      header-nav
      animated
    >
      <q-step
        :name="1"
        title="Dados do Livro"
        icon="settings"
        :error="error"
        :done="step > 1"
      >
        <div>
            <q-card class="my-card ">
                <q-card-section>
                    <div class="row q-gutter-md justify-center">
                        <div class="col-12">
                            <q-input outlined v-model="book.title" label="Titulo do livro"
                            ref="title"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Campo vazio']"
                            >
                                <template v-slot:prepend>
                                <q-icon name="book" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12">
                            <q-input outlined v-model="book.author" label="Nome do Autor"
                            ref="author"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Campo vazio']"
                            >
                                <template v-slot:prepend>
                                <q-icon name="attribution" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12">
                            <q-select outlined v-model="book.status" :options="options" label="estado do livro"
                            ref="status"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Campo vazio']"
                             />
                        </div>
                    </div>
                </q-card-section>
           </q-card>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="outros dados"
        caption="Optional"
        icon="insert_photo"
        :error="error2"
        :done="step > 2"
      >
        <template >
       <q-card class="my-card ">
                <q-card-section>
                    <div class="row q-gutter-md justify-center">
                      <div class="col-12">
                            <q-input outlined  v-model="book.isnb" suffix="Opcional" label="Identificacao do livro"
                            mask="###-###-###-###-#"
                            ref="isnb"
                            lazy-rules
                            :rules="[ val => val && val.length === 17 || val.length === 0 || val === 0 || `indetificação de livro inválida `]"
                            >
                                <template v-slot:prepend>
                                <q-icon name="vpn_key" />
                                </template>
                            </q-input>
                        </div>
                      <div class="col-12">
                    </div>
                    </div>
                          <div class="col-12">
                            <q-input outlined v-model="book.edition" label="Edição"
                            ref="edition"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Campo vazio']"
                            >
                                <template v-slot:prepend>
                                <q-icon name="attribution" />
                                </template>
                            </q-input>
                            </div>
                </q-card-section>
       </q-card>
    </template>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="stepper()" color="primary" :label="step === 2 ? 'Actualizar' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script>
export default {
  name: 'EditForm',
  props: ['book'],
  created () {
    if (this.book.isnb == null) this.book.isnb = ''
    if (this.book.status === 'Wished') this.book.status = 'Propetaria (Detém o livro)'
    else this.book.status = 'Desejado'
  },
  data () {
    return {
      error: false,
      error2: false,
      image: '',
      step: 1,
      options: [
        'Proprietário (Detém o livro)', 'Desejado'
      ],
      file: null,
      imgPlaceolder: 'http://via.placeholder.com/300'
    }
  },
  methods: {
    updatePreview (event) {
      const file = event.target.files[0]
      this.image = URL.createObjectURL(file)
    },
    stepper () {
      if (this.step <= 2) {
        if (this.step === 1) {
          // cname = companyName
          this.$refs.title.validate()
          this.$refs.author.validate()
          this.$refs.status.validate()

          if (this.$refs.title.hasError || this.$refs.author.hasError || this.$refs.status.hasError) {
            this.formHasError = true
            this.error = true
          } else {
            this.step += 1
            this.error = false
          }
        } else if (this.step === 2) {
          this.$refs.isnb.validate()
          this.$refs.edition.validate()

          if (this.$refs.isnb.hasError || this.$refs.edition.hasError) {
            this.formHasError = true
            this.error2 = true
          } else {
            this.error2 = false
            this.$emit('updateBook', this.book)
          }
        }
      }
    }
  },
  computed: {
    imgPreview () {
      let img = ''
      this.book.images.forEach(image => {
        if (image.isCover) img = image.image_url
      })
      return img
    }
  }
}
</script>
