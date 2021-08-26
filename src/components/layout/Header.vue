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
      <div class="header-route_search">
        <svg-icon type="search" class="icon"></svg-icon>
        <input type="text" />
      </div>
    </div>
    <div class="header-user" v-if="isLogin">
      <div
        class="header-user-avatar"
        :style="{ backgroundImage: `url(${userInfo.avatarUrl})` }"
      ></div>
      <div class="header-user-name">{{ userInfo.nickname }}</div>
    </div>
    <el-button @click="openLoginBar" class="header-login" v-if="!isLogin"
      >login</el-button
    >
    <el-button @click="logout" class="header-login" v-else>logout</el-button>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import SvgIcon from '@components/svg/SvgIcon.vue';

import { mapState } from 'vuex';

@Component({
  name: 'Header',
  components: {
    SvgIcon,
  },
  computed: {
    ...mapState(['isLogin', 'userInfo']),
  },
})
export default class Default extends Vue {
  isLogin!: boolean;

  userInfo!: any;

  logout() {
    this.$store.commit('logout');
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  // created() {
  //   console.log('created');
  // }

  // mounted() {
  //   console.log('mounted');
  // }

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
    &_search {
      position: relative;
      margin-left: 10px;
      .icon {
        position: absolute;
        top: 7.5px;
        left: 10px;
        width: 15px;
        height: 15px;
        color: #fff;
      }
      input {
        width: 170px;
        height: 30px;
        padding: 5px 30px;
        box-sizing: border-box;
        background-color: rgba(41, 41, 41, 0.1);
        font-size: 13px;
        color: #fff;
        border-radius: 15px;
        border: 1px;
        outline: 0;
      }
    }
  }
  &-login {
    position: absolute;
    right: 30px;
  }
  &-user {
    position: absolute;
    right: 150px;
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
      margin-left: 5px;
      font-size: 13px;
      color: #fff;
    }
  }
}
</style>
