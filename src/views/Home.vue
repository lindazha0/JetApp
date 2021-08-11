<template>
  <div class="home">
    <img alt="Linda logo" src="../assets/dollar.png">
    <HelloWorld msg="Welcome to Linda's Jetson Nano App! 😊"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted(){

  }
}
</script>
