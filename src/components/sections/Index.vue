<template>
  <article class="">
    <h3>Secciones</h3>
    <div
      style="margin: 20px 0;"
      v-if="sections.length > 0">
      <v-data-table
        :headers="headers"
        :items="sections"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td
            class="text-xs-center"
            @click="$router.push({name: 'edit_section', params:{id: props.item.id}})">
            {{ props.item.title.es}}
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="" style="text-align: right; margin-top: 50px;">
      <v-btn
        @click="$router.push({name: 'new_section'})"
        color="deep-purple darken-4"
        style="color: #fff">Crear Sección</v-btn>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return{
      sections: [],
      headers: [
        {text: 'Titulo', value: 'title'}
      ]
    }
  },
  mounted(){
    this.findSections()
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
    }
  }
}
</script>
