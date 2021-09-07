<template>
  <div class="searchArtist">
    <div
      class="searchArtist-container"
      v-loading="isLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-custom-class="loading_color"
    >
      <div
        class="searchArtist-item"
        v-for="item in content.artists"
        :key="item.id"
      >
        <div
          class="searchArtist-item-pic"
          :style="{ backgroundImage: `url(${item.picUrl})` }"
        ></div>
        <div class="searchArtist-item-name">{{ item.name }}</div>

        <div class="searchArtist-item-alias" v-if="item.alias.length > 0">
          ({{ item.alias[0] }})
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="20"
      :total="Math.ceil(content.artistCount / 20) * 20"
      :pager-count="9"
      class="msg-pagination-container"
      @current-change="getData"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { PublicSearchPage } from '@mixins/PublickSearchPage';
import { Component, Mixins } from 'vue-property-decorator';

@Component({
  name: 'SearchByArtist',
})
export default class Default extends Mixins(PublicSearchPage) {
  // created() { }
  type = 100;

  limit = 20;

  async mounted() {
    await this.getData(1);
    this.$emit('changeContentCount', this.content.artistCount);
    console.log(this.content);
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';

.searchArtist {
  &-container {
    min-height: 100px;
  }
  &-item {
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
    &-alias {
      font-size: 14px;
      margin-left: 5px;
      color: #9b9b9b;
    }
  }
}
</style>
