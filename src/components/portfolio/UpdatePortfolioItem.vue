<template>
  <div class="update-portfolio-item-wrapper">
    <BaseButton 
      type="update"
      @click="$emit('update')"
    >
      Update
    </BaseButton>
    <BaseButton 
      type="remove"
      @click="$emit('remove')"
    >
      Remove
    </BaseButton>
  </div>
</template>

<script>

  import BaseButton from '@/components/base/BaseButton.vue'

  export default {
    name: 'UpdatePortfolioItem',
    components: {
      BaseButton
    }
  }

</script>

<style lang="scss" scoped>

  .update-portfolio-item-wrapper {
    button:not(:last-child) {
      margin-right: 10px;
    }
  }

</style>