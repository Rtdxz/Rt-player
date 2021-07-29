<template>
  <div class="header">
    <el-button @click="login">login</el-button>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import { login } from '@services';

@Component({
  name: 'Header',
})
export default class Default extends Vue {
  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  created() {
    console.log('created');
  }

  mounted() {
    console.log('mounted');
  }

  async login() {
    const res = await login();

    const { cookie } = res.data;
    this.$store.state.cookie = encodeURIComponent(cookie);
    sessionStorage.setItem('cookie', this.$store.state.cookie);
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
@import '~@/assets/css/index.scss';
// $red: #ec4141;
.header {
  width: 100%;
  height: 70px;
  background-color: $theme-red;
}
</style>
