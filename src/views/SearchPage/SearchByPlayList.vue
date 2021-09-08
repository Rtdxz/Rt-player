<template>
  <div class="searchPlayList">
    <div
      class="searchPlayList-container"
      v-loading="isLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-custom-class="loading_color"
    >
      <div
        class="searchPlayList-item"
        v-for="item in content.playlists"
        :key="item.id"
        @click="
          $router.push({
            name: 'PlayListDetail',
            path: '/PlayListDetail/',
            params: { id: item.id },
          })
        "
      >
        <div
          class="searchPlayList-item-pic"
          :style="{ backgroundImage: `url(${item.coverImgUrl})` }"
        ></div>
        <div class="searchPlayList-item-name">{{ item.name }}</div>
        <div class="searchPlayList-item-count">{{ item.trackCount }}首</div>

        <div class="searchPlayList-item-creator">
          <span style="color:#cfcfcf;margin-right:10px">by</span>
          {{ item.creator.nickname }}
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="20"
      :total="Math.ceil(content.playlistCount / 20) * 20"
      :pager-count="9"
      class="msg-pagination-container"
      @current-change="getData"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { PublicSearchPage } from '@mixins/PublickSearchPage';

@Component({
  name: 'SearchByPlayList',
})
export default class Default extends Mixins(PublicSearchPage) {
  type = 1000;

  limit = 20;

  async mounted() {
    await this.getData(1);
    this.$emit('changeContentCount', this.content.playlistCount);
    console.log(this.content);
  }
}
</script>

<style scoped lang="scss">
.searchPlayList {
  &-container {
    min-height: 100px;
  }
  &-item {
    position: relative;
    width: 100%;
    height: 80px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
    &:hover {
      background-color: #f0f1f2;
    }
    &-pic {
      width: 60px;
      height: 60px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      border-radius: 7px;
      cursor: pointer;
    }
    &-name {
      font-size: 14px;
      margin-left: 10px;
      cursor: pointer;
    }
    &-count {
      position: absolute;
      right: 46%;
      width: 100px;
      color: #9f9f9f;
    }
    &-creator {
      position: absolute;
      display: flex;
      right: 25%;
      width: 200px;
      color: #656565;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>
