<template>
  <article class="">
    <h3>Articulos</h3>
    <div
      style="margin: 20px 0;"
      v-if="articles.length > 0">
      <v-data-table
        :headers="headers"
        :items="articles"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td
            class="text-xs-center"
            @click="$router.push({name: 'edit_article', params:{id: props.item.id}})">
            {{ props.item.title.es}}
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="" style="text-align: right; margin-top: 50px;">
      <v-btn
        @click="$router.push({name: 'new_article'})"
        color="deep-purple darken-4"
        style="color: #fff">Crear Articulo</v-btn>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return{
      articles: [],
      headers: [
        {text: 'Titulo', value: 'title'}
      ]
    }
  },
  mounted(){
    this.findArticles()
  },
  methods:{
    findArticles(){
      try {
        this.$http.get('article/',
        ).then(function(response){
          this.articles = response.body.articles
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
