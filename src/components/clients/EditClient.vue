<template>
  <article class="">
    <section v-if="charged">
      <v-text-field
        v-model="client.attributes.name"
        label="Nombre"
      ></v-text-field>
      <v-btn
        @click="editClient()">Guardar</v-btn>
      <v-btn @click="$router.push({name: 'clients'})">Cancelar</v-btn>
    </section>
  </article>
</template>

<script>
export default {
  data(){
    return{
      client: {},
      charged:  false,
      valid: true
    }
  },
  mounted(){
    try {
      this.$http.get('clients/' + this.$route.params.id,
      ).then(function(response){
        this.client = response.body.data
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
    editClient(){
      try {
        this.$http.put('clients/' + this.client.id, {
          name: this.client.attributes.name
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
    }
  }
}
</script>

<style lang="css">
</style>
