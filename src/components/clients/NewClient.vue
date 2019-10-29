<template>
  <article class="">
    <h3>Nuevo Cliente</h3>
    <section>
      <v-text-field
        v-model="client.attributes.name"
        label="Nombre"
      ></v-text-field>
      <v-btn
        @click="createClient()">Guardar</v-btn>
      <v-btn @click="$router.push({name: 'clients'})">Cancelar</v-btn>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      client:{
        attributes: {
          name: ''
        }
      }
    }
  },
  methods:{
    createClient(){
      if(this.client.attributes.name != ''){
        try {
          this.$http.post('clients/', {
            data: this.client
          }
          ).then(function(response){
            console.log("Update");
            console.log(response);
            this.$router.push({name: 'clients'})
          },function(response){
            console.log("Error");
            console.log(response);
          })
        } catch (e) {
          console.log("Error");
          console.log(e);
        }
      } else {
        alert("debe indicar el nombre del cliente")
      }

    }
  }
}
</script>

<style lang="css">
</style>
