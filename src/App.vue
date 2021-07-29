<template>
  <div id="app">
    <!-- <router-view /> -->
    <Header></Header>
    <div class="middle"><side-bar></side-bar> <Main></Main></div>

    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from '@components/layout/Header.vue';
import Footer from '@components/layout/Footer.vue';
import SideBar from '@components/layout/SideBar.vue';
import Main from '@components/layout/Main.vue';

@Component({
  components: {
    Header,
    Footer,
    SideBar,
    Main,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
@import '~@/assets/css/index.scss';
div {
  font-size: 20px;
}
.middle {
  height: calc(100vh - 145px);
  width: 100%;
  overflow: hidden;
  display: flex;
}
</style>
