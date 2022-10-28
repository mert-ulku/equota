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
      <div class="listing-wrapper">
        <div class="listing">
          <BaseList
            :list="userData"
          />
        </div>
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

      this.fetchPortfolioData().then(() => {
        this.checkUserData()
      })

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
        return new Promise((resolve, reject) => {
          getPortfolioData().then(({ data }) => {
            this.$store.dispatch('portfolio/setPortfolioData', data.map(item => {
              return {
                ...item,
                quantity: 0
              }
            }))
            .then(() => {
              resolve(true)
            })
            .catch(error => reject(error))
          })

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
  }

  body {
    height: 100vh;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 90px 1fr;
    height: 100%;
    padding: 40px;
    padding-bottom: 0;

    .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .search-input {
      padding: 10px;
      outline: none;
      width: 100%;
    }

    header {
      border-bottom: 1px solid #e8e8e8;
      padding: 10px;
      grid-column: 1 / 13;

      button:not(:last-child) {
        margin-right: 15px;
      }
    }

    main {
      grid-column: 1 / 13;
      display: grid;
      grid-template-columns: 1fr 1fr;

      .listing-wrapper {
        border-right: 1px solid #dedede;
        padding: 10px;

        .listing {
          height: calc(100vh - 8px);
          overflow: auto;
        }
      }

      .chart {
        align-self: center;
        justify-self: center;
      }

      
    }
    

      

     
  }

</style>
