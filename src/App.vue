<template>
  <div id="app">
    <!-- <router-view /> -->
    <Header @showLoginBar="showLoginBar"></Header>
    <div class="middle"><side-bar></side-bar> <Main></Main></div>

    <Footer @showCurrentMusicBoard="showCurrentMusicBoard"></Footer>
    <login-bar ref="LoginBar"></login-bar>
    <current-music-board ref="CurrentMusicBoard"></current-music-board>

    <play-list-table></play-list-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Header from '@components/layout/Header.vue';
import Footer from '@components/layout/Footer.vue';
import SideBar from '@components/layout/SideBar.vue';
import Main from '@components/layout/Main.vue';

import CurrentMusicBoard from '@components/CurrentMusicBoard.vue';

import LoginBar from '@components/LoginBar.vue';

import PlayListTable from '@components/PlayListTable.vue';
import { mapState } from 'vuex';

@Component({
  components: {
    Header,
    Footer,
    SideBar,
    Main,
    LoginBar,
    CurrentMusicBoard,
    PlayListTable,
  },
  computed: {
    ...mapState(['userInfo', 'isLogin', 'userId', 'userPlayList']),
  },
})
export default class Home extends Vue {
  userInfo!: any;

  isLogin!: boolean;

  userId!: string;

  userPlayList!: any[];

  showCurrentMusicBoard() {
    const currentMusicBoard: any = this.$refs.CurrentMusicBoard;
    currentMusicBoard.open();
  }

  closeCurrentMusicBoard() {
    const currentMusicBoard: any = this.$refs.CurrentMusicBoard;
    currentMusicBoard.close();
  }

  showLoginBar() {
    const loginBar: any = this.$refs.LoginBar;
    console.log(loginBar);
    loginBar.open();
  }

  closeLoginBar() {
    const loginBar: any = this.$refs.LoginBar;
    loginBar.close();
  }

  saveState() {
    sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    sessionStorage.setItem('isLogin', JSON.stringify(this.isLogin));
    sessionStorage.setItem('userId', JSON.stringify(this.userId));
    sessionStorage.setItem('userPlayList', JSON.stringify(this.userPlayList));
  }

  mounted() {
    window.addEventListener('unload', this.saveState);
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/index.scss';
#app {
  position: relative;
}
div {
  cursor: default;
  -webkit-user-select: none;
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
.highlights-text {
  color: #ff5134;
}
</style>
