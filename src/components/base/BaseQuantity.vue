<template>
  <number-input 
    size="small"  
    controls
    :value="value"
    center
    inline
    @change="$emit('change', $event)"
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