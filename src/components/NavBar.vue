<template>
  <div class="navbar">
    <div class="navbar__item">
      <svg-icon type="cloud" class="navbar__item-icon"></svg-icon>
      <div class="navbar__item-text">发现</div>
    </div>
    <div class="navbar__item">
      <div class="navbar__item-icon"></div>
      <div class="navbar__item-text">博客</div>
    </div>
    <div class="navbar__item">
      <div class="navbar__item-icon"></div>
      <div class="navbar__item-text">发现</div>
    </div>
    <div class="navbar__item">
      <div class="navbar__item-icon"></div>
      <div class="navbar__item-text">k歌</div>
    </div>
    <div class="navbar__item">
      <div class="navbar__item-icon"></div>
      <div class="navbar__item-text">云村</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import SvgIcon from '@components/svg/SvgIcon.vue';

@Component({
  components: {
    SvgIcon,
  },
})
export default class Default extends Vue {
  @Prop({ default: 'default value' })
  propB!: string;

  created() {
    console.log('created');
  }

  mounted() {
    console.log('mounted');
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.navbar {
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-around;
  align-content: center;
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    &-icon {
      width: 20px;
      height: 20px;
      color: red;
    }
    &-text {
      font-size: 20px;
    }
  }
}
</style>
