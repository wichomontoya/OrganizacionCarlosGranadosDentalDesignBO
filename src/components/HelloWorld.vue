<template>
  <article style="position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content:center">
    <section style="width: 50%">
      <img src="https://ocgdd.s3-us-west-2.amazonaws.com/Carlos+Granados+Logotipo-02.svg" alt="" style="width: 100%">
    </section>
  </article>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
