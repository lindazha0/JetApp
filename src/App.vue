<template>

  <div id="nav">
    <router-link to="/">Home👉</router-link> |
    <router-link to="/face_reco">SignIn😎</router-link> |
    <router-link to="/snacks">Snacks🎂</router-link> |
    <router-link to="/slider">ShowImage✨</router-link> |
    <router-link to="/birth">Birthday🎉</router-link>
  </div>
  
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
