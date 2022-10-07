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

    const isMobile = () => {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    };

    return { path, isMobile };
  },
  created() {
    if (this.isMobile() && location.pathname === "/") {
      this.$router.replace("/mobile");
    } else if (!this.isMobile() && location.pathname === "/mobile") {
      this.$router.replace("/");
    }
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
