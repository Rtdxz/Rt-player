<template>
  <div class="discover-bar">
    <div class="contain">
      <!-- <div class="discover-bar_item">个性推荐</div>
    <div class="discover-bar_item">歌单</div>
    <div class="discover-bar_item">排行榜</div>
    <div class="discover-bar_item">歌手</div>
    <div class="discover-bar_item">最新音乐</div>
    <div class="discover-bar_item">主播电台</div> -->
      <div
        class="discover-bar_item"
        :class="{
          'discover-bar_item_active': $route.path.indexOf(item.path) != -1,
        }"
        v-for="(item, index) in tabList"
        :key="index"
        @click="clickTab(item, index)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import { Tab } from '@interface';

@Component({
  name: 'DiscoverMusicBar',
})
export default class Default extends Vue {
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

  tabList = [
    {
      title: '个性推荐',
      path: 'Individuation',
    },
    {
      title: '歌单',
      path: 'SongSheet',
    },
    {
      title: '排行榜',
      path: 'TopList',
    },
    {
      title: '歌手',
      path: 'Artist',
    },
    {
      title: '最新音乐',
      path: 'NewestMusic',
    },
  ];

  clickTab(item: Tab, index: number) {
    this.$router.push(item.path);
  }
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/index.scss';
.discover-bar {
  width: 100%;
  margin-bottom: 10px;
  // height: 40px;
  // padding: 0 150px;
  // box-sizing: border-box;

  .contain {
    width: 800px;
    display: flex;
    // height: 40px;
    // padding: 0 150px;
    // box-sizing: border-box;
    // justify-content: space-around;
    // margin: 0 auto;
  }
  &_item {
    height: 60px;
    margin: 0 20px;
    // flex: 1;
    text-align: center;
    line-height: 80px;
    cursor: pointer;

    &_active {
      border-bottom: 4px solid $theme-red;
      font-weight: 1000;
    }
  }
}
</style>
