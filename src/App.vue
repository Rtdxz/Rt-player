<template>
  <div id="app">
    <!-- <router-view /> -->
    <Header @showLoginBar="showLoginBar"></Header>
    <div class="middle"><side-bar></side-bar> <Main></Main></div>

    <Footer></Footer>
    <login-bar ref="LoginBar"></login-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from '@components/layout/Header.vue';
import Footer from '@components/layout/Footer.vue';
import SideBar from '@components/layout/SideBar.vue';
import Main from '@components/layout/Main.vue';

import LoginBar from '@components/LoginBar.vue';

@Component({
  components: {
    Header,
    Footer,
    SideBar,
    Main,
    LoginBar,
  },
})
export default class Home extends Vue {
  showLoginBar() {
    console.log('b');
    const loginBar: any = this.$refs.LoginBar;
    console.log(loginBar);
    loginBar.open();
  }

  closeLoginBar() {
    const loginBar: any = this.$refs.LoginBar;
    loginBar.close();
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/index.scss';
#app {
  position: relative;
}
div {
  font-size: 20px;
}
.middle {
  height: calc(100vh - 135px);
  width: 100%;
  overflow: hidden;
  display: flex;
}
html {
  overflow-x: hidden;
}
</style>
