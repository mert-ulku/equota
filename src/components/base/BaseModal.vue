<template>
  <div class="modal-container">
    <div class="modal flex-center">
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
    
    .modal {
      background-color: #fff;
      height: 300px;
      width: 400px;
      border-radius: 4px;
      padding: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      flex-direction: column;
      text-align: center;
    }
  }

</style>