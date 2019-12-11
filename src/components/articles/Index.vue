<template>
  <article class="">
    <h3>Articulos</h3>
    <div
      style="margin: 20px 0;"
      v-if="articles.length > 0">

      <v-container>
        <v-data-table :headers="myHeaders" :items="mySections" hide-actions item-key="name" style="overflow-x:hidden !important;border:1.5px solid #d4cfed;border-radius:6px;" >

          <template slot="items" slot-scope="props">
            <tr @click="props.item.active=!props.item.active" style="background-color:lavender;border: 1px solid darkgray;cursor:pointer">
              <td><div style="display:flex;justify-content:space-between;font-size: 15px;">
                <b>•   {{ props.item.name }}</b>
                <b>{{props.item.active?'▼':'▲'}}</b>
                </div></td>
            </tr>
            <tr v-if="props.item.active"   style="padding:0px !important;cursor:zoom-in" v-for="(article,myId) in myArticles[props.item.name]" :key="myId">
              <td @click="$router.push({name: 'edit_article', params:{id: article.id}})" style="text-align:center;width:100%;">{{ article.title }}</td>
            </tr>
            
          </template>

        </v-data-table>
      </v-container>
  
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
      myHeaders: [
        {
          text: 'Listado de secciones',
          align: 'left',
          value: 'name',
          sortable:false,
        }
      ],
      mySections:[],
      myArticles:{},
      
    }
  },
  mounted(){
    this.findArticles()
  },
  methods:{
    findArticles(){

      try {
        this.$http.get('article/',{"language":'es'},
        ).then(function(response){
          this.articles = response.body
          console.log("Congrats article");
          console.log(response);
          var tempArticles=response.body;
          var self=this;
          this.myArticles={};
          this.mySections=[];
          tempArticles.forEach(function(element, i) {
                                          if(self.myArticles[element.section.title.es]==undefined){
                                            self.myArticles[element.section.title.es]=[]
                                            self.mySections.push({name:element.section.title.es,active:false})
                                          }
                                          self.myArticles[element.section.title.es].push({id:element.id,title: element.title.es })
                                        });
          console.log(this.mySections);
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
<style>
  .table__overflow{
    overflow-x: hidden !important;
  }
</style>
