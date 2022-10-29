<template>
  <div id="app">

    <template v-if="loading">
      <div class="loading flex-center">
        Loading...
      </div>
    </template>

    <template v-else>
      <BaseModal 
        v-show="isModalOpen"
        @close="isModalOpen = false"
      >
        <input 
          type="text" 
          class="search-input" 
          placeholder="Please type to search."
          @input="handleSearchInput($event.target.value)"
        />
        <BaseList
          :list="portfolioData"
          allowFilter
        />
      </BaseModal>
    
      <header>
        <BaseButton @click="isModalOpen = true"> {{ userData.length ? 'Add / Update' : 'Add Stock' }} </BaseButton>
        <BaseButton @click="refresh"> Refresh </BaseButton>
      </header>
  
      <main>
        <div class="listing-wrapper">
          <div class="listing">
            <BaseList
              v-if="userData.length"
              :list="userData"
              additionalInfo
              @quantityChange="handleQuantityChange"
            />
          </div>
        </div>
        <div class="chart flex-center">
          <PieChart
            v-if="userData.length" 
            :chartData="chartData"
          />
        </div>
        
      </main>
    </template>

  </div>
  
</template>

<script>

  import { getPortfolioData } from './api-helper/portfolio'
  import BaseButton from '@/components/base/BaseButton.vue'
  import BaseList from '@/components/base/BaseList.vue'
  import BaseModal from '@/components/base/BaseModal.vue'
  import PieChart from '@/components/charts/PieChart.vue'

  export default {
    name: "App",
    components: {
      BaseButton,
      BaseList,
      BaseModal,
      PieChart
    },
    computed: {
      userData() {
        return this.$store.getters['portfolio/getUserData']
      },
      portfolioData() {
        return this.$store.getters['portfolio/getPortfolioData']
      },
      chartData() {
        return this.userData.reduce((acc, item) => {
          acc.labels[acc.labels.length] = item.symbol
          acc.datasets[0].data[acc.datasets[0].data.length] = item.quantity
          acc.datasets[0].backgroundColor[acc.datasets[0].backgroundColor.length] = item.backgroundColor
          return acc
        }, {
          labels: [],
          datasets: [{
            backgroundColor: [],
            data: []
          }]
        })
      }
    },
    data() {
      return {
        isModalOpen: false,
        interval: null,
        loading: false
      }
    },
    created() {

      this.loading = true

      const this_ = this
      document.addEventListener('keyup', function (evt) {
        if (evt.key === 'Escape') {
          this_.isModalOpen = false
        }
      });

      this.interval = setInterval(() => { this.fetchPortfolioData() }, 120000000)

      this.fetchPortfolioData().then(() => {
        this.checkUserData()
      }).finally(() => this.loading = false)

    },
    beforeDestroy(){
      clearInterval(this.interval)
    },
    methods: {
      refresh() {
        window.location.reload()
      },
      checkUserData() {
        const previouslySelectedItems = localStorage.getItem('previousData')

        if (previouslySelectedItems && JSON.parse(previouslySelectedItems).length) {
          this.$store.dispatch('portfolio/setUserData', JSON.parse(previouslySelectedItems))
        }
      },
      randomColorGenerator() {
        return '#' + (Math.random().toString(16) + "000000").substring(2,8)
      },  
      fetchPortfolioData() {
        return new Promise((resolve, reject) => {
          getPortfolioData().then(({ data }) => {
            this.$store.dispatch('portfolio/setPortfolioData', data.map(item => {
              return {
                ...item,
                quantity: this.quantityChecker(item.symbol),
                backgroundColor: this.randomColorGenerator()
              }
            }))
            .then(() => {
              resolve(true)
            })
            .catch(error => reject(error))
          })

        })
      },
      quantityChecker(symbol) {
        const previouslySelectedItems = localStorage.getItem('previousData')

        if (previouslySelectedItems && JSON.parse(previouslySelectedItems).length) { 
          const previouslySelectedItemsParsed = JSON.parse(previouslySelectedItems)
          const previouslySelectedItemsFiltered = previouslySelectedItemsParsed.filter(item => item.symbol === symbol)
          return previouslySelectedItemsFiltered.length ? previouslySelectedItemsFiltered[0].quantity : 0
        } else {
          return 0
        }
      },  
      handleSearchInput(input) {
        this.$store.commit('portfolio/setSearchKeyword', input)
      },
      handleQuantityChange(quantity, symbol) {
        this.$store.dispatch('portfolio/updateUserDataItemQuantity', { quantity, symbol })
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
    overflow: hidden;
  }

  body {
    height: 100vh;
    overflow: hidden;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    // display: grid;
    // grid-template-columns: repeat(12, 1fr);
    // grid-template-rows: 90px 1fr;
    height: 100%;
    padding: 40px;
    padding-bottom: 0;

    .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loading {
      height: 100%;
    }

    .search-input {
      padding: 10px;
      outline: none;
      width: 100%;
    }

    header {
      border-bottom: 1px solid #e8e8e8;
      padding: 10px;
      // grid-column: 1 / 13;

      button:not(:last-child) {
        margin-right: 15px;
      }
    }

    main {
      // grid-column: 1 / 13;
      // display: grid;
      // grid-template-columns: 1fr 1fr;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      .listing-wrapper {
        border-right: 1px solid #dedede;
        padding: 10px;
        height: 100%;
        flex-basis: 50%;

        .listing {
          overflow: auto;
          height: calc(100% - 110px)
        }
      }

      .chart {
        align-self: center;
        justify-content: center;
        flex-basis: 50%;

      }

      
    }
    

      

     
  }

</style>
