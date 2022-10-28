<template>
 <button 
    class="base-button"
    :style="{ 
      backgroundColor: buttonColor,
      border: `1px solid ${buttonColor}`,
    }"
    v-on="$listeners"
  >
  <slot name="default"/> 
 </button>
</template>

<script>

  export default {
    name: 'BaseButton',
    props: {
      type: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'add', 'update', 'remove'].includes(value)
      }
    },
    computed: {
      buttonColor() {
        const typeColorMap = {
          primary: '#1890ff',
          add: '#52c41a',
          update: '#faad14',
          remove: '#f5222d'
        }
  
        return typeColorMap[this.type]
      }
    }
  }

</script>

<style lang="scss" scoped>

  .base-button {
    color: #fff;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 4px;
    font-weight: bold;
    outline: none;

    &:hover {
      opacity: 0.8;
    }
  }

</style>