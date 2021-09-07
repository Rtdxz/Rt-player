<template>
  <div class="searchMV">
    <div
      class="searchMV-container"
      v-loading="isLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-custom-class="loading_color"
    >
      <MVItem
        class="searchMV-item"
        v-for="item in content.videos"
        :key="item.id"
        :item="item"
        :picHeight="'1.157516rem'"
      >
      </MVItem>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="24"
      :total="Math.ceil(content.videoCount / 24) * 24"
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
import MVItem from '@components/MVItem.vue';

@Component({
  name: 'SearchByMV',
  components: {
    MVItem,
  },
})
export default class Default extends Mixins(PublicSearchPage) {
  type = 1014;

  limit = 24;

  async mounted() {
    await this.getData(1);
    this.$emit('changeContentCount', this.content.videoCount);
    console.log(this.content);
  }
}
</script>

<style scoped lang="scss">
.searchMV {
  &-container {
    display: flex;
    min-height: 100px;

    width: 100%;
    padding: 0 30px 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
}
</style>
