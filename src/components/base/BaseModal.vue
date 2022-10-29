<template>
  <div class="modal-container" @click.self="$emit('close')">
    <div class="modal">
     <slot name="default"/>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'BaseModal',
  }
</script>

<style lang="scss" scoped>

  .modal-container {
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0, .5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    
    .modal {
      background-color: #fff;
      height: 700px;
      min-width: 700px;
      border-radius: 4px;
      padding: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      flex-direction: column;
      text-align: center;
      overflow: auto;
    }
  }

</style>