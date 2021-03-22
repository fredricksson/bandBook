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
                        <div class="col-12">
                            <q-input outlined  v-model="book.isbn" suffix="Opcional" label="Identificacao do livro"
                            mask="###-###-###-###-#"
                            ref="isbn"
                            lazy-rules
                            :rules="[ val => val && val.length === 17 || val.length === 0  || `indetificação de livro inválida `]"
                            >
                                <template v-slot:prepend>
                                <q-icon name="vpn_key" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                </q-card-section>
           </q-card>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Capa do livro"
        caption="Optional"
        icon="insert_photo"
        :error="error2"
        :done="step > 2"
      >
        <template class="justify-center q-pa-md q-gutter-y-sm ">
       <div class="row">
           <div class="col-12">
               <p class="text-overline"> Capa do livro</p>
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
         <div class="col-12">
           <q-img
          :src="imgPreview"
          spinner-color="white"
          style="height: 300px; full-width "
          />
         </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input
              @input="val => { file = val[0] }"
              filled
              v-model="file"
              @change="updatePreview($event)"
              ref="image"
              lazy-rules
             :rules="[ val =>  val && val.length !== 0  || 'Insira uma image ']"
              type="file"
              hint="Native file"
            />
          </div>
        </div>
    </template>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="stepper()" color="primary" :label="step === 2 ? 'Salvar' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script>
export default {
  name: 'FormBook',
  props: ['book'],
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
          this.$refs.isbn.validate()

          if (this.$refs.title.hasError || this.$refs.author.hasError || this.$refs.isbn.hasError || this.$refs.isbn.hasError) {
            this.formHasError = true
            this.error = true
          } else {
            this.step += 1
            this.error = false
          }
        } else if (this.step === 2) {
          this.$refs.image.validate()
          this.$refs.edition.validate()

          if (this.$refs.image.hasError || this.$refs.edition.hasError) {
            this.formHasError = true
            this.error2 = true
          } else {
            this.error2 = false
            // it will run method save in Mybooks.vue
            this.$emit('save', this.file)
          }
        }
      }
    }
  },
  computed: {
    imgPreview () {
      return this.image === '' ? this.imgPlaceolder : this.image
    }
  }
}
</script>
