<template>
  <div id="app">

    <BaseModal v-if="isModalOpen">
      <input 
        type="text" 
        class="search-input" 
        placeholder="Please type to search."
        @input="handleSearchInput($event.target.value)"
      />
      <BaseList
        :list="searchResults"
      />
    </BaseModal>
    
    <header>
      <BaseButton @click="isModalOpen = true"> {{ userData.length ? 'Add / Update' : 'Add Stock' }} </BaseButton>
      <BaseButton> Refresh </BaseButton>
    </header>

    <main>
      <div class="listing">
        <BaseList
          :list="userData"
        />
      </div>
      <div class="chart">
        asd
      </div>
      
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
        return this.$store.getters['portfolio/getPortfolioData']
      },
      searchResults() {
        return this.$store.getters['portfolio/getSearchResults']
      }
    },
    data() {
      return {
        isModalOpen: false,
        interval: null
      }
    },
    created() {

    //   document.addEventListener('keyup', function (evt) {
    //     console.log(evt)
    //     if (evt.key === 'Escape') {
    //       this.isModalOpen = false
    //     }
    // });

      this.interval = setInterval(() => { this.fetchPortfolioData() }, 120000000)

      this.fetchPortfolioData()
      this.checkUserData()

    },
    beforeDestroy(){
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
      },
      handleSearchInput(input) {
        if(input.length >= 3) {

          // just mocking the search results by putting a 3 letter condition. 
          // This can also be a debounced function for better performance.

          this.$store.dispatch('portfolio/setSearchResults', this.portfolioData.filter(item => item.symbol.toLowerCase().includes(input.toLowerCase())))
        } 
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
    height: 100vh;


  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 40px;

    .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #e8e8e8;
      padding: 10px 0;

      button:not(:last-child) {
        margin-right: 15px;
      }
    }

    .search-input {
      padding: 10px;
      outline: none;
      width: 100%;
    }

    main {
      height: calc(100% - 40px);
      display: flex;
      justify-content: space-around;

      .listing {
        border-right: 1px solid #dedede;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-basis: 50%;
      }

      .chart {
        flex-basis: 50%;
      }
      

     
    }
  }

</style>
