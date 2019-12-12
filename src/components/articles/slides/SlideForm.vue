<template>
  <v-fade-transition>
    <article class="loader" @click="$emit('close')">
      <section class="my_body_container"  @click.stop=" () => null">
         <h3 >FORMULARIO DE SLIDER</h3>
          <v-flex xs12 style="margin-top:30px">
            <v-select
                :items="typesOfSlide"
                v-model="slide.type"
                label="Selecciona el tipo de slide"
              ></v-select>
          </v-flex>
          <section >
            <label for=""><b>Título</b></label>
            <div style="display:flex;flex-wrap:wrap;justify-content:space-around">
              <v-flex xs5>
                 <label for="">Español:</label>
                <v-text-field
                  v-model="slide.languages[0].title"
                  label="Título español"
                ></v-text-field>
              </v-flex>
              <v-flex xs5>
                <label for="">Inglés:</label>
                <v-text-field
                  v-model="slide.languages[1].title"
                  label="Título inglés"
                ></v-text-field>
              </v-flex>
            </div>
         
            <label for=""><b>Texto</b></label>
            <div style="display:flex;flex-wrap:wrap;justify-content:space-evenly">
              <v-flex xs5>
               
                <v-text-field
                  v-model="slide.languages[0].text"
                  label="Texto español"
                  multi-line
                  :rows="1"
                ></v-text-field>
                  </v-flex>
                <v-flex xs5>
                <v-text-field
                  v-model="slide.languages[1].text"
                  label="Texto inglés"
                  multi-line
                  :rows="1"
                ></v-text-field>
              </v-flex>
            </div>
            <v-flex xs12 style="flex-wrap:wrap;display:flex;justify-content:space-evenly  ">
            <v-flex xs6>
            <label for=""><b>Imagen</b></label>
            <div  style="margin-top:20px" class="trainers__form--photo_container">
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
              <img :src="url" alt="" width="150px"/>
            </v-flex> 
           </v-flex>
           <v-flex xs5>
              <label for=""><b>Video</b></label>
              <v-radio-group v-model="slide.video_type">
                <v-radio
                  key="youtube"
                  :label="`Youtube`"
                  value="youtube"
                ></v-radio>
                <v-radio
                  key="link"
                  :label="`Link`"
                  value="link"
                ></v-radio>
              </v-radio-group>
              <v-text-field
                v-model="slide.video"
                :label="slide.video_type == 'youtube' ? 'Id video de youtube' : 'Link del video'"
              ></v-text-field>
           </v-flex>
          </v-flex>
            <v-btn
              @click="createSlide()">Guardar</v-btn>
            <v-btn @click="$emit('close')">Cancelar</v-btn>
          </section>
      </section>
    </article>
  </v-fade-transition>
</template>

<script>

export default {
  data(){
    return {
      typesOfSlide:["Integrado en página","Modal Individual"],
      photo_name: 'No se han seleccionado archivos',
      url_change: false,
      url:'https://s3-us-west-2.amazonaws.com/karrottsportlife/default_image.svg',
      slide:{
            image: "",
            video_type: 'youtube',
            video: '',
            type: 'Integrado en página',
            languages: [
                {
                    language: "es",
                    title: "",
                    text: ""
                },
                {
                    language: "en",
                    title: "",
                    text: ""
                }
            ],
            
        },
    }
  },
  props: ['myActualSlide'],
  methods:{
    createSlide(){
      console.log(this.slide)
      this.$emit('save',this.slide);
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
        vm.slide.image = reader.result
      }
    },
  },

  mounted(){
    console.log("initializing");
    console.log(this.myActualSlide);
    if(Object.keys(this.myActualSlide).length>0){
      this.slide=this.myActualSlide;
      if(this.myActualSlide.image.url==undefined){
        if(this.myActualSlide.image.length>0){
          this.url=this.myActualSlide.image;
          console.log(this.myActualSlide)
          this.photo_name="slider_img."+this.myActualSlide.image.substring(11,14)
          this.url_change=true;
        }
      }else{
         if(this.myActualSlide.image.url.length>0){
          this.url=this.myActualSlide.image.url;
          this.photo_name="slider_img."+this.myActualSlide.image.url.substring(11,14)
          this.url_change=true;
         }
      }
    }
  },
  
}
</script>
<style media="css">
  .data_card__image{
    width: 400px
  }
  .loader{
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.7);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    display: -webkit-box;   /* OLD - iOS 6-, Safari 3.1-6, BB7 */
    display: -ms-flexbox;  /* TWEENER - IE 10 */
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  .my_body_container{
    background-color: #fff!important;
    position: relative;
    padding: 1vh 30px !important;
    max-height: fit-content !important;
    height: 86vh;
    width: 86%;
    overflow-y:scroll;
  }

</style>
