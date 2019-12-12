<template>
  <article class="">
    <h3>Crear Articulo</h3>
    <v-flex xs12>
      <v-select
          :items="sections"
          v-model="section_selected"
          label="Selecciona la sección"
          item-text="title.es"
        ></v-select>
    </v-flex>
    <section >
      <label for=""><b>Titulo</b></label>
      <v-text-field
        v-model="article.es.title"
        label="Título español"
      ></v-text-field>
      <v-text-field
        v-model="article.en.title"
        label="Título ingles"
      ></v-text-field>
      <label for=""><b>Texto</b></label>
      <v-text-field
        v-model="article.es.text"
        label="Texto español"
        multi-line
      ></v-text-field>
      <v-text-field
        v-model="article.en.text"
        label="Texto ingles"
        multi-line
      ></v-text-field>
      <v-text-field
        v-model="article.position"
        label="Posición"
      ></v-text-field>
    
      <label for=""><b>Imagen</b></label>
      <div class="trainers__form--photo_container">
        <label
          for="articlePhoto"
          style="
          width: 160px;
          height: 34px;"
          class="trainers__form--photo_button">Examinar</label>
        <input
          id="articlePhoto"
          type="file"
          @change="onFileChange"
          name="logo">
        <p v-if="!url_change">{{ photo_name }}</p>
      </div>
      <v-flex xs12 style="margin: 25px 0; text-align: center;">
        <img :src="url" alt="" width="400px"/>
      </v-flex>

      <!-- <div
        class="data_card__image"
        :class = "{'without_url' : !url_change}"
        :style="{backgroundImage: 'url('+ url +')'}"></div> -->
      <v-flex xs12 style="margin: 25px 0; margin-top:50px !important; text-align: center;">
        <v-switch
              v-model="article.is_slider"
              label="El artículo tiene slides"
              color="indigo"
              hide-details
        ></v-switch>
        <slide-controller v-show="article.is_slider"  @save="addSlide" :slides="article.slides" ></slide-controller>
      </v-flex>
      <v-btn
        @click="createArticle()">Crear</v-btn>
      <v-btn @click="$router.push({name: 'articles'})">Cancelar</v-btn>
    </section>
  </article>
</template>

<script>
import SlideController from './slides/SlideController.vue'
export default {
  data(){
    return {
      photo_name: 'No se han seleccionado archivos',
      url_change: false,
      url:'https://s3-us-west-2.amazonaws.com/karrottsportlife/default_image.svg',
      sections:[],
      section_selected: null,
      article:{
        es:{
          title: '',
          text: ''
        },
        en:{
          title: '',
          text: ''
        },
        image: null,
        position: null,
        is_slider: false,
        section_id: null,
        slides:[]
      }
    }
  },
  components:{
    SlideController,
  },
  methods:{
    findSections(){
      try {
        this.$http.get('section/',
        ).then(function(response){
          this.sections = response.body.sections
          console.log("Congrats");
          console.log(response);
        },function(response){
          console.log("Error");
          console.log(response);
        })
      } catch (e) {
        console.log("Error");
        console.log(e);
      }
    },
    addSlide(value,pos){
      
      if(pos!=null){
         this.article.slides.splice(pos,1);
        this.article.slides.splice(pos,0,value)
      }else{
        this.article.slides.push(value);
      }
    },
    validateArticle(){
      if(this.article.es.title != '' &&
         this.article.en.title != '' &&
         this.article.image != null){
        return true
      } else {
        return false
      }
    },
    createArticle(){
      if(this.validateArticle()){
        try {
          this.$http.post('article/', {
              "languages": [
                 {
                   "language": "es",
                   "title": this.article.es.title,
                   "text": this.article.es.text,
                 },
                 {
                   "language": "en",
                   "title": this.article.en.title,
                   "text": this.article.en.text,
                 }
              ],
              "image": this.article.image,
              "position": this.article.position,
              "section_id": this.section_selected.id,
              "is_slider":this.article.is_slider,
              "slides":this.article.slides
          }
          ).then(function(response){
            console.log("Update");
            console.log(response);
            this.$router.push({name: 'articles'})
          },function(response){
            console.log("Error");
            console.log(response);
          })
        } catch (e) {
          console.log("Error");
          console.log(e);
        }
      } else {
        alert('Por favor, verifique los valores indexados')
      }
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.url = URL.createObjectURL(files[0]);
      this.createImage(files[0])
    },
    createImage (file, name_field) {
      var reader = new FileReader()
      var vm = this
      reader.readAsDataURL(file);
      reader.onload = function () {
        vm.article.image = reader.result
      }
    },
  },
  watch:{
    url(){
      this.url_change = true;
    },
  },
  mounted(){
    this.findSections()
  }
}
</script>
<style media="css">
  .data_card__image{
    width: 400px;
  }
</style>
