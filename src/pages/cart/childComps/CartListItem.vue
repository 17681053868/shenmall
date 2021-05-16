<template>
  <div>
    {{product}}
  </div>
</template>
<script>
export default {
  naem: 'CartListItem',
  props: {
    product: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    console.log(this.product)
  }
}
</script>
<style scoped>

</style>