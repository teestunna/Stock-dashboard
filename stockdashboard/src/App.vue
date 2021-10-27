<template>
  <div id="app">
    <StockBoard />
  </div>
</template>

<script>
import StockBoard from './components/StockBoard.vue'

export default {
  name: 'App',
  components: {
    StockBoard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
