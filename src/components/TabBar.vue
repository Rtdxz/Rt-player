<template>
  <div class="tabBar">
    <div class="contain">
      <div
        class="tabBar-item"
        v-for="(item, index) in tabBarList"
        :key="item.index"
        :class="{ 'tabBar-item_active': currentIndex === index }"
        @click="changeTab(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'TabBar',
})
export default class Default extends Vue {
  changeTab(index: any) {
    this.$emit('changeTab', index);
  }

  @Prop({ default: [] })
  tabBarList!: any[];

  @Prop({ default: 0 })
  currentIndex!: number;
}
</script>

<style scoped lang="scss">
// @import './index.scss';
@import '~@/assets/css/index.scss';
.tabBar {
  margin-bottom: 10px;
  // height: 40px;
  // padding: 0 150px;
  // box-sizing: border-box;

  .contain {
    // width: 800px;
    display: flex;
    // height: 40px;
    // padding: 0 150px;
    // box-sizing: border-box;
    // justify-content: space-around;
    // margin: 0 auto;
  }
  &-item {
    &:first-child {
      margin-left: 0;
    }
    height: 60px;
    margin: 0 10px;
    // flex: 1;
    text-align: center;
    line-height: 80px;
    cursor: pointer;
    font-size: 15px;
    &_active {
      border-bottom: 4px solid $theme-red;
      font-weight: 1000;
    }
  }
}
</style>
