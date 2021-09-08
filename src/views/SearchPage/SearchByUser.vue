<template>
  <div class="searchUser">
    <div
      class="searchUser-container"
      v-loading="isLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-custom-class="loading_color"
    >
      <div
        class="searchUser-item"
        v-for="item in content.userprofiles"
        :key="item.id"
      >
        <div
          class="searchUser-item-pic"
          :style="{ backgroundImage: `url(${item.avatarUrl})` }"
        ></div>
        <div class="searchUser-item-name">
          <span v-if="item.nickname.indexOf(searchKeywords) === -1">{{
            item.nickname
          }}</span>
          <span v-else
            >{{
              item.nickname.substring(0, item.nickname.indexOf(searchKeywords))
            }}<span style="color:#507daf">{{ searchKeywords }}</span
            >{{
              item.nickname.substring(
                item.nickname.indexOf(searchKeywords) + searchKeywords.length,
              )
            }}</span
          >
        </div>
        <div class="searchUser-item-signature">{{ item.signature }}</div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="20"
      :total="Math.ceil(content.userprofileCount / 20) * 20"
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
  name: 'SearchByUser',
})
export default class Default extends Mixins(PublicSearchPage) {
  type = 1002;

  limit = 20;

  async mounted() {
    await this.getData(1);
    this.$emit('changeContentCount', this.content.userprofileCount);
    console.log(this.content);
  }
}
</script>

<style scoped lang="scss">
.searchUser {
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
      border-radius: 50%;
      cursor: pointer;
    }
    &-name {
      font-size: 14px;
      margin-left: 20px;
      cursor: pointer;
    }
    &-signature {
      position: absolute;
      right: 30px;
      color: #cecece;
    }
  }
}
</style>
