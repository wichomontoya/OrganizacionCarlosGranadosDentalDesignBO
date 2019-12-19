import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options.root = 'https://carlosgranadosdentaldesign.com/api/v1/'
// Vue.http.options.root = 'http://ec2-54-202-222-69.us-west-2.compute.amazonaws.com/'
// Vue.http.options.root = 'http://localhost:3000/api/v1/'
Vue.http.interceptor.before = (request, next) => {
  console.log(request)
  next((response) => {
    console.log(response)
  })
}
