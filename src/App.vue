<template>
  <div id="app">

    <BaseModal v-if="isModalOpen">
      <BaseList
        :list="userData"
      />
    </BaseModal>
    
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
  import BaseModal from '@/components/base/BaseModal.vue'

  export default {
    name: "App",
    components: {
      BaseButton,
      BaseList,
      BaseModal
    },
    computed: {
      userData() {
        return this.$store.getters['portfolio/getUserData']
      },
      portfolioData() {
        return this.$store.getters['portfolio/portfolioData']
      }
    },
    data() {
      return {
        isModalOpen: false,
        interval: null
      }
    },
    created() {

      this.interval = setInterval(() => { this.fetchPortfolioData() }, 120000000)

      this.fetchPortfolioData()
      this.checkUserData()

    },
    destroyed(){
      clearInterval(this.interval)
    },
    methods: {
      checkUserData() {
        const previouslySelectedItems = localStorage.getItem('previousData')

        if (previouslySelectedItems && JSON.parse(previouslySelectedItems).length) {
          this.$store.dispatch('portfolio/setUserData', JSON.parse(previouslySelectedItems))
        }
      },
      fetchPortfolioData() {
        getPortfolioData().then(({ data }) => {
          this.$store.dispatch('portfolio/setPortfolioData', data)
        })
      }
    }
  };
  
</script>

<style lang="scss">

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html, #app {
    font-family: Poppins, sans-serif;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-top: 40px;
    padding: 0 40px;

    .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid #e8e8e8;
  
    }
  }

</style>
