<template>
  <div>
      <h5 class="text-center m-3">{{msg}}</h5>
  </div>
</template>

<script>

export default {
  name: "restricted",
  data() {
      return {
          msg: 'You can\'t access this resource.'
      }
  }
};
</script>

<style>

</style>