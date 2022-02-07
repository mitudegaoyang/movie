<template>
  <!-- <div id="nav">
    <router-link to="/">首页</router-link>
  </div> -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Detail",
  components: {},
  setup() {
    const router = useRouter();
    const path = router.currentRoute.value.path;
    console.log(path);
    return { path };
  },
});
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #eef1f4;
  min-height: 100vh;
}

#nav {
  background-color: #eef1f4;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
