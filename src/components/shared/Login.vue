<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="deep-purple darken-4">
                  <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      prepend-icon="person"
                      name="email"
                      label="Correo electrónico"
                      type="text"
                      v-model="email"></v-text-field>
                    <v-text-field
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      v-model="password"></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="deep-purple darken-4"
                    style="color: #fff"
                    @click="login()">Ingresar</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    email: '',
    password:''
  }),
  props: {
    source: String
  },
  methods:{
    login(){
      if(this.email === this.getUser() && this.password === this.getPassword()){
        this.updateLogin(false)
        this.$router.push({name: 'root'})
      }else{
        this.updateLogin(true)
        alert("El correo o la contraseña son incorrectos")
      }
    }
  }
}
</script>

<style lang="css">
</style>
