<template>
  <BaseButton 
    type="add"
    @click="$emit('add')"
  >
    Add
  </BaseButton>
</template>

<script>

  import BaseButton from '@/components/base/BaseButton.vue'

  export default {
    name: 'NewPortfolioItem',
    components: {
      BaseButton
    }
  }

</script>