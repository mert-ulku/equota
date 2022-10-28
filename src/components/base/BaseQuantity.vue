<template>
  <number-input 
    size="small"  
    controls
    :value="value"
    center
    inline
    v-on="$listeners"
    style="z-index: -1"
  >
  </number-input>
</template>

<script>
  export default {
    name: 'BaseQuantity',
    props: {
      value: {
        type: Number,
        default: 0
      }
    }
  }
</script>