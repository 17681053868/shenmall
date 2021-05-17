<template>
  <div class="toast" v-show="show">
    <div class="message">{{message}}</div>
  </div>
</template>
<script>
export default {
  name: 'Toast',
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show (message, duration) {
      duration = duration || 2000
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },duration)
    }
  }
}
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -200%);
  color: #fff;
  font-weight: 700px;
  font-size: 24px;
  z-index: 999999;
  background-color: rgba(0, 0, 0, .7);
}
.message {
  /* margin: 10px; */
}
</style>