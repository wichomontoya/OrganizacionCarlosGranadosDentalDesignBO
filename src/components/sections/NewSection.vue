<template>
  <article class="">
    <h3>Nueva Sección</h3>
    <section>
      <label for=""><b>Titulo</b></label>
      <v-text-field
        v-model="section.es.title"
        label="Título español"
      ></v-text-field>
      <v-text-field
        v-model="section.en.title"
        label="Título ingles"
      ></v-text-field>
      <label for=""><b>Texto</b></label>
      <v-text-field
        v-model="section.es.text"
        label="Texto español"
        multi-line
      ></v-text-field>
      <v-text-field
        v-model="section.en.text"
        label="Texto ingles"
        multi-line
      ></v-text-field>
      <label for=""><b>Tipo de video</b></label>
      <v-radio-group v-model="section.type">
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
        v-model="section.video"
        :label="section.video_type == 'youtube' ? 'Id video de youtube' : 'Link del video'"
      ></v-text-field>
      <v-btn
        @click="createSection()">Guardar</v-btn>
      <v-btn @click="$router.push({name: 'sections'})">Cancelar</v-btn>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      section:{
        es:{
          title: '',
          text: ''
        },
        en:{
          title: '',
          text: ''
        },
        video_type: 'youtube',
        video: ''
      },
      client:{
        attributes: {
          name: ''
        }
      }
    }
  },
  methods:{
    validateSection(){
      if(this.section.es.title != '' &&
         this.section.en.title != '' &&
         this.section.video != ''){
        return true
      } else {
        return false
      }
    },
    createSection(){
      if(this.validateSection()){
        try {
          this.$http.post('section/', {
              "languages": [
                 {
                   "language": "es",
                   "title": this.section.es.title,
                   "text": this.section.es.text,
                 },
                 {
                   "language": "en",
                   "title": this.section.en.title,
                   "text": this.section.en.text,
                 }
              ],
              "video": this.section.video,
              "video_type": this.section.video_type

          }
          ).then(function(response){
            console.log("Update");
            console.log(response);
            this.$router.push({name: 'sections'})
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

    }
  }
}
</script>

<style lang="css">
</style>
