<template>
  <article class="">
    <h3>Editar Sección</h3>
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
      ></v-text-field>
      <v-text-field
        v-model="section.en.text"
        label="Texto ingles"
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
        :label="section.type == 'youtube' ? 'Id video de youtube' : 'Link del video'"
      ></v-text-field>
      <v-btn
        @click="editSection()">Guardar</v-btn>
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
        type: 'youtube',
        video: ''
      },
      charged:  false,
      valid: true
    }
  },
  mounted(){
    try {
      this.$http.get('section/' + this.$route.params.id,
      ).then(function(response){
        let temp_section = response.body.section
        this.section = {
          es:{
            title: temp_section.title.es,
            text: ''
          },
          en:{
            title: temp_section.title.en,
            text: ''
          },
          type: 'youtube',
          video: temp_section.video,
          id: temp_section.id
        },
        console.log("Congrats");
        console.log(response);
        this.charged = true
      },function(response){
        console.log("Error");
        console.log(response);
      })
    } catch (e) {
      console.log("Error");
      console.log(e);
    }
  },
  methods: {
    editSection(){
      try {
        this.$http.put('section/' + this.section.id, {
          id: this.section.id,
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
          "type": this.section.type
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
    }
  }
}
</script>

<style lang="css">
</style>
