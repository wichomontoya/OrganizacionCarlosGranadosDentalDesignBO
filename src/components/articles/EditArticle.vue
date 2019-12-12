<template>
  <article class="">
    <!-- <v-btn style="left:-2px;top:-15px" @click="$router.push({name: 'articles'})">◄-</v-btn> -->
    <h3>Editar Articulo</h3>
    <v-flex xs12>
      <v-select
          :items="sections"
          v-model="section_selected"
          label="Selecciona la sección"
          item-text="my_title"
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
          :style="!url_change?'color:transparent':'color:black'"
          @change="onFileChange"
          name="logo">
        <p v-if="!url_change" >{{ photo_name }}</p>
      </div>
      <v-flex xs12 style="margin: 25px 0; text-align: center;">
        <img :src="url" alt="" width="400px"/>
      </v-flex>
      
      <v-flex xs12 style="margin: 25px 0; margin-top:50px !important; text-align: center;">
        <v-switch
              v-model="article.is_slider"
              label="El artículo tiene slides"
              color="indigo"
              hide-details
        ></v-switch>
        <slide-controller v-if="isLoaded" v-show="article.is_slider"  @save="addSlide" :slides="article.slides" ></slide-controller>
        
      </v-flex>



      <v-btn
        @click="updateArticle()">Editar</v-btn>
      <v-btn @click="$router.push({name: 'articles'})">Cancelar</v-btn>
    </section>
  </article>
</template>

<script>
import SlideController from './slides/SlideController.vue'
export default {
  data(){
    return {
      isLoaded:false,
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
        this.$http.get('select_section/',
        ).then(function(response){
          this.sections = response.body
          console.log("Congrats");
          console.log(response);
          var self=this;
          this.section_selected = this.sections.find(function(item, i){

              if(item.id == self.article.section_id){
                return item;
              }
            });
          
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
    updateArticle(){
      if(this.validateArticle()){
        try {
          this.$http.put('article/'+this.article.id, {
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
      this.url_change=true;
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
    // url(){
    //   this.url_change = true;
    // },
  },
  mounted(){
    var self=this;
     try {
      this.$http.get('article/' + this.$route.params.id,
      ).then(function(response){
        let temp_article = response.body
        this.article = {
          es:{
            title: temp_article.title.es,
            text: temp_article.text.es
          },
          en:{
            title: temp_article.title.en,
            text: temp_article.text.en
          },
            position: temp_article.position,
            is_slider: temp_article.is_slider,
            article_id: temp_article.article_id,
            section_id: temp_article.section_id,
            id: temp_article.id,
            image:temp_article.image,
            slides: []
        },
        temp_article.slides.forEach(function(element, i) {
           let tempSlide={
            id:element.id,
            image: element.image,
            video_type: "youtube",
            video: element.video,
            type: element.my_type,
            languages: [
                {
                    language: "es",
                    title: element.title.es,
                    text: element.text.es
                },
                {
                    language: "en",
                    title: element.title.en,
                    text: element.text.en
                }
            ]
            }
            self.article.slides.push(tempSlide)
          });
        this.url=temp_article.image;
        this.photo_name="Imagen ..."+temp_article.image.substring(temp_article.image.length-9,temp_article.image.length)
        console.log("Congrats");
        console.log(response);
        this.charged = true;
        this.findSections();
        this.isLoaded=true;
      },function(response){
        console.log("Error");
        console.log(response);
      })
    } catch (e) {
      console.log("Error");
      console.log(e);
    }
  },
  
}
</script>
<style media="css">
  .data_card__image{
    width: 400px
  }
</style>
