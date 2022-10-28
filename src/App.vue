<template>
  <div id="app">
    <header>
      <BaseButton> {{ userData.length ? 'Add / Update' : 'Add Stock' }} </BaseButton>
      <BaseButton> Refresh </BaseButton>
    </header>

    <main>
      <BaseList
        :list="userData"
      />
    </main>
  </div>
</template>

<script>

  import { getPortfolioData } from './api-helper/portfolio'
  import BaseButton from '@/components/base/BaseButton.vue'
  import BaseList from '@/components/base/BaseList.vue'

  export default {
    name: "App",
    components: {
      BaseButton,
      BaseList
    },
    data() {
      return {
        portfolioData: [],
        userData: []
      }
    },
    created() {

      const previouslySelectedItems = localStorage.getItem('previousData')

      if (previouslySelectedItems && previouslySelectedItems.length) {
        this.userData = JSON.parse(previouslySelectedItems)
      }


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
    margin-top: 40px;
    padding: 0 40px;

    header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid #e8e8e8;
  
    }
  }

</style>
