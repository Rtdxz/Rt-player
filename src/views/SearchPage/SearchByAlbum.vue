<template>
  <div class="searchAlbum">
    <div
      class="searchAlbum-container"
      v-loading="isLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-custom-class="loading_color"
    >
      <div
        class="searchAlbum-item"
        v-for="item in content.albums"
        :key="item.id"
      >
        <div
          class="searchAlbum-item-pic"
          :style="{ backgroundImage: `url(${item.picUrl})` }"
        ></div>
        <div class="searchAlbum-item-name">{{ item.name }}</div>

        <div class="searchAlbum-item-alias" v-if="item.alias.length > 0">
          ({{ item.alias[0] }})
        </div>
        <div class="searchAlbum-item-artist">
          <div class="searchAlbum-item-artist-name">
            ({{ item.artist.name }})
          </div>
          <div
            class="searchAlbum-item-artist-alias"
            v-if="item.artist.alias.length > 0"
          >
            ({{ item.artist.alias[0] }})
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="20"
      :total="Math.ceil(content.albumCount / 20) * 20"
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
  name: 'SearchByAlbum',
})
export default class Default extends Mixins(PublicSearchPage) {
  // created() { }
  // mounted() { }
  type = 10;

  limit = 20;

  async mounted() {
    await this.getData(1);
    this.$emit('changeContentCount', this.content.albumCount);
    console.log(this.content);
  }
}
</script>

<style scoped lang="scss">
.searchAlbum {
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
      margin-left: 20px;
      cursor: pointer;
    }
    &-alias {
      font-size: 14px;
      margin-left: 5px;
      color: #9b9b9b;
    }
    &-artist {
      display: flex;
      width: 40%;
      position: absolute;
      right: 200px;
      // text-align: left;
      &-name {
        margin-left: 20px;
        color: #616162;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
      &-alias {
        margin-left: 5px;
        color: #9b9b9b;
      }
    }
  }
}
</style>
