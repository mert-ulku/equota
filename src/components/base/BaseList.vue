<template>
  <div class="list-wrapper">

    <div 
      v-for="listItem in list"
      :key="listItem.id"
      class="list-item"
    >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BaseList',
    props: {
      list: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style lang="scss" scoped>

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15;
    border: 1px solid #e8e8e8;
  }

</style>