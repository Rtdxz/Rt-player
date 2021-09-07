<template>
  <div class="searchPageContainer">
    <div class="searchPage-title">
      找到<span style="margin:0 10px">{{ contentCount }}</span
      >{{ CurrentType() }}
    </div>
    <div class="tabContainer">
      <tab-bar
        :tabBarList="tabBarList"
        @changeTab="changeTab"
        :currentIndex="currentIndex"
      ></tab-bar>
    </div>

    <router-view @changeContentCount="changeContentCount"></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TabBar from '@components/TabBar.vue';

@Component({
  name: 'SearchPage',
  components: {
    TabBar,
  },
})
export default class Default extends Vue {
  contentCount = 0;

  tabBarList = [
    {
      title: '单曲',
      classifier: '首',
      router: 'SearchBySong',
      index: 0,
    },
    {
      title: '歌手',
      classifier: '位',
      router: 'SearchByArtist',
      index: 1,
    },
    {
      title: '专辑',
      classifier: '张',
      router: 'SearchByAlbum',
      index: 2,
    },
    {
      title: '视频',
      classifier: '个',
      router: 'SearchByMV',
      index: 3,
    },
    {
      title: '歌单',
      classifier: '个',
      router: 'SearchByPlayList',
      index: 4,
    },
    {
      title: '用户',
      classifier: '个',
      router: 'SearchByUser',
      index: 5,
    },
  ];

  currentIndex = 0;

  CurrentType() {
    return (
      this.tabBarList[this.currentIndex].classifier
      + this.tabBarList[this.currentIndex].title
    );
  }

  created() {
    this.tabBarList.forEach((ele) => {
      if (this.$route.path.indexOf(ele.router) !== -1) {
        this.currentIndex = ele.index;
      }
    });
  }

  changeTab(index: any) {
    this.currentIndex = index;

    this.$router.push(this.tabBarList[this.currentIndex].router);
    console.log(this.currentIndex);
  }

  changeContentCount(count: number) {
    console.log(count);
    this.contentCount = count;
  }

  // @Watch('name')
  // getWatchValue(newVal: string, oldVal: string) {
  //   console.log(newVal, oldVal);
  // }

  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.searchPageContainer {
  height: calc(100vh - 135px);
  padding-bottom: 30px;
  box-sizing: border-box;
  overflow-y: auto;
  .tabContainer {
    padding: 0 30px;
  }
}
.searchPage {
  &-title {
    font-weight: 600;
    font-size: 17px;
    margin: 30px 30px 0;
  }
}
</style>
