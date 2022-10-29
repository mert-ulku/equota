<template>
  <div class="list-wrapper">
    
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div 
      v-for="(listItem, index) in filteredList"
      :key="index"
      class="list-item-wrapper"
    >

    <div class="list-item">
      <div class="list-item-info">
        {{ listItem.symbol }} - {{ listItem.lastPrice }} {{ additionalInfo ?  `- ${listItem.weightedAvgPrice}` : '' }}
      </div>

      <div class="list-item-actions">
        <input 
          class="number-input"
          type="number" 
          :value="listItem.quantity"
          @input="handleQuantityChange($event.target.value, listItem.symbol)"
        />
        <template v-if="!checkExistingData(listItem)">
          <NewPortfolioItem
            @add="addNewItem(listItem)"
          />
        </template>
        <template v-else>
          <UpdatePortfolioItem
            @update="updateItem(listItem)"
            @remove="removeItem(listItem)"
          />
        </template>
      </div>
    
    </div>


    </div>
  </div>
</template>

<script>

  import UpdatePortfolioItem from '@/components/portfolio/UpdatePortfolioItem.vue'
  import NewPortfolioItem from '@/components/portfolio/NewPortfolioItem.vue'

  export default {
    name: 'BaseList',
    components: {
      UpdatePortfolioItem,
      NewPortfolioItem
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      allowFilter: {
        type: Boolean,
        default: false
      },
      additionalInfo: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        error: ''
      }
    },
    computed: {
      userData() {
        return this.$store.getters['portfolio/getUserData']
      },
      searchKeyword() {
        return this.$store.getters['portfolio/getSearchKeyword']
      },
      filteredList() {

        // This can be a debounced function or a ~3 letter condition can be applied for better performance.

        if (this.searchKeyword && this.allowFilter) {
          return this.list.filter(item => item.symbol.toLowerCase().includes(this.searchKeyword.toLowerCase()))
        }

        return this.list
        
      }
    },
    beforeUnmount() {
      this.error = ''
    },  
    methods: {
      handleQuantityChange(value, symbol) {
        this.$emit('quantityChange', value, symbol)
        this.$store.dispatch('portfolio/updateQuantity', { value, symbol })
      },
      checkExistingData(currentItem) {
        return this.userData.some(item => item.symbol === currentItem.symbol)
      },
      addNewItem(item) {
        if(item.quantity <= 0) {
          this.error = 'Quantity should be greater than 0.'
          return
        }
        this.error = ''
        this.$store.dispatch('portfolio/addNewUserData', item)
      },
      updateItem(item) {
        this.$store.dispatch('portfolio/updatePortfolioItem', item)
      },
      removeItem(item) {
        this.$store.dispatch('portfolio/removeUserData', item)
      }
    }
  }

</script>

<style lang="scss" scoped>

  .list-wrapper {

    margin-top: 10px;

    .error {
      background-color: #faad14;
      padding: 10px;
      margin-bottom: 5px;
      color: #fff;
    }
    
    .list-item-wrapper {
      padding: 15px;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      margin-bottom: 10px;
      transition: all .2s ease-in-out;
      font-size: 14px;
      width: 100%;

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .list-item-actions {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .number-input {
          padding: 5px;
          width: 70px;
          outline: none;
          text-align: center;
        }

        & > *:not(:last-child) {
          margin-right: 10px;
        }

      }
  
    }
    
  }


</style>