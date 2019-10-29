<template>
  <article class="">
    <h3>Clientes</h3>
    <div
      style="margin: 20px 0;"
      v-if="clients.length > 0">
      <v-data-table
        :headers="headers"
        :items="clients"
        hide-actions
        class="elevation-1">
        <template slot="items" slot-scope="props">
          <td
            class="text-xs-center"
            @click="$router.push({name: 'edit_client', params:{id: props.item.id}})">
            {{ props.item.attributes.name }}
          </td>
        </template>
      </v-data-table>
      <div class="" style="text-align: right; margin-top: 50px;">
        <v-btn
          @click="$router.push({name: 'new_client'})"
          color="teal darken-1">Crear Cliente</v-btn>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data(){
    return{
      clients: [],
      headers: [
        {text: 'Nombre', value: 'name'}
      ]
    }
  },
  mounted(){
    this.findClients()
  },
  methods:{
    findClients(){
      try {
        this.$http.get('clients/',
        ).then(function(response){
          this.clients = response.body.data
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

<style lang="css">
</style>
