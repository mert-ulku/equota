<template>
  <div id="app">
    
  </div>
</template>

<script>

  import { getPortfolioData } from './api-helper/portfolio'

  export default {
    name: "App",
    data() {
      return {
        portfolioData: []
      }
    },
    created() {
      getPortfolioData().then(({ data }) => {
        this.portfolioData = data
      })
    }
  };
  
</script>

<style lang="scss">

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>
