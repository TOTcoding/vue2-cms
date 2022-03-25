<template>
  <div id="app">
    <router-view include="main"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {

    }
  },
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
html,body,#app {
  width: 100%;
  height: 100%
}
</style>