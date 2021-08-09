<template>
  <div class="sidebar">
    <div
      class="sidebar-item"
      v-for="item in tabList"
      :key="item.title"
      :class="{ 'sidebar-item_active': $route.path.indexOf(item.path) != -1 }"
      @click="clickTab(item)"
    >
      {{ item.title }}
    </div>
    <div class="sidebar-user" v-if="isLogin">
      <div class="sidebar-title">我的音乐</div>
      <div class="sidebar-item" v-for="item in myMusicList" :key="item.title">
        <svg-icon :type="item.type" class="sidebar-icon"></svg-icon>
        {{ item.title }}
      </div>

      <div
        class="sidebar-title"
        @click="isShowCreatedPlayList = !isShowCreatedPlayList"
      >
        创建的歌单
        <i class="el-icon-caret-right" v-if="!isShowCreatedPlayList"></i>
        <i class="el-icon-caret-bottom" v-else></i>
      </div>
      <div class="sidebar-createdPlayList" v-show="isShowCreatedPlayList">
        <div
          class="sidebar-item min"
          v-for="(item, index) in createdPlayList"
          :key="item.id"
          @click="$router.push(`/PlayListDetail/${item.id}`)"
        >
          <svg-icon
            type="Heart"
            class="sidebar-icon"
            v-if="index == 0"
          ></svg-icon>
          <svg-icon type="PlayList" class="sidebar-icon" v-else></svg-icon>
          {{ item.name }}
        </div>
      </div>
      <div
        class="sidebar-title"
        @click="isShowCollectPlayList = !isShowCollectPlayList"
      >
        收藏的歌单
        <i class="el-icon-caret-right" v-if="!isShowCollectPlayList"></i>
        <i class="el-icon-caret-bottom" v-else></i>
      </div>
      <div class="sidebar-createdPlayList" v-show="isShowCollectPlayList">
        <div
          class="sidebar-item min"
          v-for="item in collectPlayList"
          :key="item.id"
          @click="$router.push(`/PlayListDetail/${item.id}`)"
        >
          <svg-icon type="PlayList" class="sidebar-icon"></svg-icon>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import { Tab } from '@interface';

import SvgIcon from '@components/svg/SvgIcon.vue';

import { getUserPlayList } from '@services/SideBar';

@Component({
  name: 'SideBar',
  components: {
    SvgIcon,
  },
})
export default class Default extends Vue {
  isLogin = true;

  isShowCreatedPlayList = true;

  isShowCollectPlayList = true;

  tabList: any[] = [
    {
      title: '发现音乐',
      path: '/find',
    },
    {
      title: '播客',
      path: '/podcast',
    },
    {
      title: '视频',
      path: '/video',
    },
    {
      title: '朋友',
      path: '/friends',
    },
    {
      title: '直播',
      path: '/live',
    },
    {
      title: '私人FM',
      path: '/FM',
    },
  ];

  userPlayLists: any[] = [];

  createdPlayList: any[] = [];

  collectPlayList: any[] = [];

  myMusicList: any[] = [
    {
      title: '我的音乐云盘',
      path: '/video',
      type: 'cloud2',
    },
    {
      title: '我的收藏',
      path: '/friends',
      type: 'MyCollect',
    },
  ];

  clickTab(item: Tab) {
    this.$router.push(item.path);
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  async created() {
    const playLists = await getUserPlayList(453905432);
    this.userPlayLists = playLists.data.playlist;
    this.createdPlayList = this.userPlayLists.filter(
      (item: any) => !item.subscribed,
    );
    this.collectPlayList = this.userPlayLists.filter(
      (item: any) => item.subscribed,
    );
    console.log(this.createdPlayList);
  }

  // mounted() {
  //   console.log('mounted');
  // }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
@import '~@/assets/css/index.scss';
@import '~@/assets/css/scroll.scss';
.sidebar {
  width: 200px;
  height: calc(100vh - 135px);
  flex: 0 0 200px;
  padding-top: 5px;
  // float: left;
  border-right: 1px solid $border-color;
  overflow-y: scroll;
  &-item {
    width: 80%;
    height: 35px;
    line-height: 35px;
    margin: 5px 15px;
    padding-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
    font-size: 16px;
    color: #373737;
    cursor: pointer;
    border-radius: 6px;
    &:hover {
      color: #000;
      background-color: #f5f5f6;
    }
    &_active {
      font-weight: 700;
      background-color: #f5f5f6;
    }
    &.min {
      font-size: 14px;
    }
  }
  &-title {
    &:nth-child(n + 2) {
      margin-top: 25px;
      cursor: pointer;
      &:hover {
        color: #999999;
      }
    }
    margin: 15px 15px;
    padding-left: 5px;
    font-size: 14px;
    color: #9f9f9f;
  }
  &-icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
}
</style>
