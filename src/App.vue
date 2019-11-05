<template>
  <app-login v-if="getLogin()"></app-login>
  <div id="app" v-else>
    <v-app id="inspire">
      <v-navigation-drawer
        fixed
        clipped
        class="grey lighten-4"
        app
        v-model="drawer"
      >
        <v-list
          dense
          class="grey lighten-4"
        >
          <template v-for="(item, i) in items">
            <v-layout
              row
              v-if="item.heading"
              align-center
              :key="i"
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn small flat>edit</v-btn>
              </v-flex>
            </v-layout>
            <v-divider
              dark
              v-else-if="item.divider"
              class="my-3"
              :key="i"
            ></v-divider>
            <v-list-tile
              :key="i"
              v-else
              @click="$router.push({name: item.route})"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="grey--text">
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="deep-purple darken-4" app absolute clipped-left style="color: white">
        <v-toolbar-side-icon @click.native="drawer = !drawer" color="white"></v-toolbar-side-icon>
        <!-- <img src="https://ocgdd.s3-us-west-2.amazonaws.com/Carlos-Granados-Logotipo.jpg" alt=""> -->
        <span class="title ml-3 mr-5">Organización Carlos Granados Dental Design</span></span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height class="grey lighten-4">
          <v-layout justify-center>
            <v-flex sm12 shrink style="padding: 50px 10%; height: calc(100vh - 120px); overflow-x: hidden; overflow-y: auto ">
              <router-view/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
    <app-loader></app-loader>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      drawer: null,
      items: [
        { icon: 'view_quilt', text: 'Sección', route: 'sections' },
        { divider: true },
        { icon: 'note', text: 'Artículos', route: 'articles' },
        { divider: true },
        // { icon: 'view_carousel', text: 'Slides', route: 'clients' },
        // { divider: true },
        // { icon: 'remove_from_queue', text: 'Sub menus', route: 'pits' },
        // { divider: true }
      ]
    }
  },
  props: {
    source: String
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
