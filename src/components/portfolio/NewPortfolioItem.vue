<template>
  <BaseButton 
    type="add"
    :disabled="disabled"
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
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }

</script>