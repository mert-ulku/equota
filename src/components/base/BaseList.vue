<template>
  <div class="list-wrapper">

    <div 
      v-for="listItem in list"
      :key="listItem.symbol"
      class="list-item-wrapper"
    >

    <div class="list-item">
      <div class="list-item-info">
        {{ listItem.symbol }} - {{ listItem.lastPrice }}
      </div>

      <div class="list-item-actions">
        <BaseQuantity 
          v-model="listItem.quantity"
          @change="handleQuantityChange($event, listItem.symbol)"
        />
        <template v-if="!checkExistingData(listItem)">
          <NewPortfolioItem
            @add="addNewItem(listItem)"
          />
        </template>
        <template v-else>
          <UpdatePortfolioItem/>
        </template>
        <!-- <BaseButton 
          type="update"
        > 
          Update 
        </BaseButton>
        <BaseButton 
          type="remove"
        > 
          Remove 
        </BaseButton> -->
      </div>
    
    </div>


    </div>
  </div>
</template>

<script>

  import BaseQuantity from '@/components/base/BaseQuantity.vue'
  import UpdatePortfolioItem from '@/components/portfolio/UpdatePortfolioItem.vue'
  import NewPortfolioItem from '@/components/portfolio/NewPortfolioItem.vue'

  export default {
    name: 'BaseList',
    components: {
      BaseQuantity,
      UpdatePortfolioItem,
      NewPortfolioItem
    },
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      userData() {
        return this.$store.getters['portfolio/getUserData']
      }
    },  
    methods: {
      handleQuantityChange(value, symbol) {
        this.$store.dispatch('portfolio/updateQuantity', { value, symbol })
      },
      checkExistingData(currentItem) {
        return this.userData.some(item => item.symbol === currentItem.symbol)
      },
      addNewItem(item) {
        this.$store.dispatch('portfolio/addNewUserData', item)
      }
    }
  }

</script>

<style lang="scss" scoped>

  .list-wrapper {

    margin-top: 10px;
    
    .list-item-wrapper {
      padding: 15px;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      margin-bottom: 10px;
      transition: all .2s ease-in-out;
      font-size: 14px;
      width: 100%;
  
      // &:hover {
      //   background-color: #f5f5f5;
      // }

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .list-item-actions {
        display: flex;
        align-items: center;
        justify-content: space-around;

        & > *:not(:last-child) {
          margin-right: 10px;
        }

      }
  
    }
    
  }


</style>