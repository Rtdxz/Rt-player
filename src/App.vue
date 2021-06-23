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

import Header from '@components/Header.vue';
import Footer from '@components/Footer.vue';
import SideBar from '@components/SideBar.vue';

import Main from '@views/Main.vue';

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
* {
  font-size: 20px;
}
.middle {
  overflow: hidden;
}
</style>
