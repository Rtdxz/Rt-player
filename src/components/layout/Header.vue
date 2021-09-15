<template>
  <div class="header">
    <div class="header-logo">
      <svg-icon type="ICloud" class="icon"></svg-icon>
    </div>
    <div class="header-route">
      <div class="header-route_button" @click="$router.go(-1)">
        <svg-icon type="left-arrow" class="icon"></svg-icon>
      </div>
      <div class="header-route_button" @click="$router.go(1)">
        <svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
      <Search></Search>
    </div>
    <div class="header-user">
      <div
        class="header-user-avatar"
        :style="{
          backgroundImage: `url(${isLogin ? userInfo.avatarUrl : urlIcon})`,
        }"
        @click="clickUser"
      ></div>
      <div
        class="header-user-name"
        @click="isLogin ? (isShowUserBar = !isShowUserBar) : openLoginBar()"
      >
        {{ isLogin ? userInfo.nickname : '未登录' }}
      </div>
      <div class="header-user-bar" v-if="isShowUserBar" @click="logout">
        退出登录
      </div>
    </div>
    <!-- <el-button @click="openLoginBar" class="header-login" v-if="!isLogin"
      >login</el-button
    >

    <el-button @click="logout" class="header-login" v-else>logout</el-button> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import SvgIcon from '@components/svg/SvgIcon.vue';

import Search from '@components/Search.vue';

import { mapState } from 'vuex';

@Component({
  name: 'Header',
  components: {
    SvgIcon,
    Search,
  },
  computed: {
    ...mapState(['isLogin', 'userInfo', 'userId']),
  },
})
export default class Default extends Vue {
  isLogin!: boolean;

  userInfo!: any;

  userId!: SVGStringList;

  urlIcon: any = {};

  isShowUserBar = false;

  logout() {
    this.isShowUserBar = false;
    this.$store.commit('logout');
    this.$router.go(0);
  }

  created() {
    // eslint-disable-next-line global-require
    this.urlIcon = require('@/assets/img/user.jpg');
  }

  clickUser() {
    if (!this.isLogin) {
      this.openLoginBar();
    } else {
      this.$router.push(`/UserDetail/${this.userId}`);
    }
  }

  openLoginBar() {
    this.$emit('showLoginBar');
    // const res = await login();

    // const { cookie } = res.data;
    // this.$store.state.cookie = encodeURIComponent(cookie);
    // sessionStorage.setItem('cookie', this.$store.state.cookie);
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
@import '~@/assets/css/index.scss';
// $red: #ec4141;
.header {
  position: relative;
  width: 100%;
  height: 60px;
  background-color: $theme-red;
  display: flex;
  padding: 0 70px;
  align-items: center;
  box-sizing: border-box;
  &-logo {
    cursor: pointer;
    position: relative;
    width: 100px;
    height: 20px;
    margin-top: 3px;
    background: url('~@assets/img/logo.png') no-repeat;
    background-size: 100% 100%;
    .icon {
      position: absolute;
      top: -5px;
      left: -40px;
      width: 30px;
      height: 30px;
    }
  }
  &-route {
    z-index: 4;
    margin-left: 70px;
    display: flex;
    align-items: center;
    &_button {
      display: flex;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: rgba(41, 41, 41, 0.1);
      margin: 0 5px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .icon {
        width: 10px;
        height: 10px;
        color: #fff;
      }
    }
  }
  &-login {
    position: absolute;
    right: 30px;
  }
  &-user {
    position: absolute;
    right: 120px;
    display: flex;
    align-items: center;
    &-avatar {
      cursor: pointer;
      width: 25px;
      height: 25px;
      flex-shrink: 0;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      border-radius: 50%;
    }
    &-name {
      cursor: pointer;
      margin-left: 8px;
      font-size: 13px;
      color: #fff;
    }
    &-bar {
      position: absolute;
      top: 43px;
      width: 100px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      box-shadow: 0px 0px 3px 3px rgba(100, 100, 100, 0.1);
      border-radius: 5px;
      background-color: #fff;
      color: #303031;
      cursor: pointer;
      &:hover {
        background-color: #f0f1f2;
      }
    }
  }
}
</style>
