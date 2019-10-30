import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

Vue.mixin({
  methods:{
    ...mapActions([
      "updateLoader",
      "updateLogin",
      "updateUser",
      "updatePassword"
    ]),
    ...mapGetters([
      "getLoader",
      "getLogin",
      "getUser",
      "getPassword"
    ])
  }
})
