<template>
  <div class="loginBar" v-if="isShowLoginBar">
    <div class="loginBar-header">
      <i class="el-icon-close" @click="close"></i>
    </div>
    <div class="loginBar-icon">
      <svg-icon type="phone" class="phone"></svg-icon>
    </div>
    <div class="loginBar-body">
      <input
        type="text"
        v-model="phoneNumber"
        class="loginBar-body_phoneNumber"
        placeholder="请输入手机号"
      />
      <input
        type="password"
        v-model="password"
        class="loginBar-body_password"
        placeholder="请输入密码"
      />
      <div @click="login" class="loginBar-body_button">登录</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import SvgIcon from '@components/svg/SvgIcon.vue';

import { login } from '@services';

@Component({
  name: 'LoginBar',
  components: {
    SvgIcon,
  },
})
export default class Default extends Vue {
  isShowLoginBar = false;

  phoneNumber = '';

  password = '';

  checkPhone() {
    const reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;

    if (reg.test(this.phoneNumber)) {
      return true;
    }
    return false;
  }

  login() {
    if (this.checkPhone()) {
      login({ phone: this.phoneNumber, password: this.password }).then(
        (res) => {
          if (res.data.code === 200) {
            this.$message({ message: '登录成功', type: 'success' });
            this.close();
            console.log(res.data);
            this.$store.commit('login', res.data);
          } else {
            this.$message({ message: res.data.msg, type: 'error' });
          }
        },
      );
    } else {
      this.$message({ message: '请输入正确的手机号码', type: 'error' });
    }
  }

  open() {
    this.isShowLoginBar = true;
  }

  close() {
    this.isShowLoginBar = false;
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;
  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.loginBar {
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  width: 349px;
  height: 60vh;
  background-color: #fff;
  z-index: 100000;
  // border-radius: 10px;
  box-shadow: 0px 0px 20px 10px rgba(9, 9, 9, 0.1);
  .el-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  &-icon {
    height: 250px;
    .phone {
      position: relative;
      left: 50%;
      top: 60px;
      height: 150px;
      transform: translateX(-50%);
      color: #f29c9f;
    }
  }
  &-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      margin-top: 10px;
      outline: none;
      padding: 8px;
      border: 1px solid #d8d8d8;
      font-size: 14px;
    }
    &_button {
      margin: 30px auto;
      width: 100px;
      height: 30px;
      background-color: #ec4141;
      color: #fff;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      border-radius: 10px;
      font-size: 14px;
    }
  }
}
</style>
