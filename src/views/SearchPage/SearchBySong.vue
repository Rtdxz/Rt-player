<template>
  <div class="searchSong">
    <song-item-list
      :playListContent="content"
      :isLoading="isLoading"
    ></song-item-list>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="100"
      :total="Math.ceil(content.songCount / 100) * 100"
      :pager-count="9"
      class="msg-pagination-container"
      @current-change="getData"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import SongItemList from '@components/SongItemList.vue';

import { PublicSearchPage } from '@mixins/PublickSearchPage';

@Component({
  name: 'SearchBySong',
  components: {
    SongItemList,
  },
})
export default class Default extends Mixins(PublicSearchPage) {
  isLoading = true;

  type = 1;

  limit = 100;
  // async getData(page: number) {
  //   const params: any = {
  //     keywords: this.searchKeywords,
  //     offset: (page - 1) * 100,
  //     limit: 100,
  //     type: this.type,
  //   };
  //   this.playListContent = {};
  //   const container: any = document.querySelector('.searchPageContainer');
  //   container.scrollTop = 0;
  //   this.isLoading = true;
  //   const res = await Search(params);
  //   console.log(res.data.result);
  //   this.playListContent = res.data.result;
  //   this.isLoading = false;
  // }

  async mounted() {
    await this.getData(1);
    this.$emit('changeContentCount', this.content.songCount);
  }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.searchSong {
  margin: 0 30px 0;
}
</style>
