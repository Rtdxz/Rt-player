<template>
  <div class="SongSheet" ref="SongSheet">
    <div class="SongSheet-tab">
      <div
        class="SongSheet-tab-allTags button"
        @click="isShowTagsTable = !isShowTagsTable"
      >
        {{ currentTag }} <i class="el-icon-arrow-right"></i>
      </div>
      <all-tags-table
        :isShowTagsTable="isShowTagsTable"
        :currentTag="currentTag"
        @changeCurrentTag="changeCurrentTag"
      ></all-tags-table>
      <div class="SongSheet-tab-hotTags">
        <div
          class="item"
          v-for="item in hotTags"
          :key="item.id"
          :class="{ activeTag: currentTag === item.name }"
          @click="currentTag = item.name"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="SongSheet_container" v-loading="isLoading">
      <song-sheet-item
        v-for="(item, index) in playList.playlists"
        :key="item.id"
        :item="item"
        :type="'SongSheet'"
        :left="Number(index) % 5 === 0"
      >
      </song-sheet-item>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100"
      class="msg-pagination-container"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import { getAllPlayList, getHotTags } from '@services/SongSheet';
import SongSheetItem from '@components/SongSheetItem.vue';

import AllTagsTable from '@components/AllTagsTable.vue';

@Component({
  name: 'SongSheet',
  components: {
    SongSheetItem,
    AllTagsTable,
  },
})
export default class Default extends Vue {
  isLoading = true;

  hotTags: any[] = [];

  allTags: any[] = [];

  currentTag = '全部歌单';

  currentPage = 0;

  isShowTagsTable = false;

  async changeCurrentTag(tag: string) {
    this.currentTag = tag;
    this.playList = {};
    this.isLoading = true;
    const playList = await getAllPlayList(this.currentPage, tag);
    this.playList = playList.data;
    this.isLoading = false;
    this.isShowTagsTable = false;
  }

  async changePage(currentPage: number) {
    this.isLoading = true;
    console.log(currentPage);
    this.currentPage = currentPage;
    this.playList.playlists = [];
    const el: any = this.$refs.SongSheet;
    el.parentNode.scrollTop = 0;
    const playList = await getAllPlayList(currentPage - 1, this.currentTag);

    this.isLoading = false;
    console.log(playList);
    this.playList = playList.data;
  }

  playList: any = {
    playlists: [],
  };

  @Watch('currentTag')
  async getData(newVal: string) {
    if (newVal === '全部歌单') newVal = '全部';
    await this.changeCurrentTag(newVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  async created() {
    const playList = await getAllPlayList(0);
    const tags = await getHotTags();
    console.log(tags);
    this.hotTags = tags.data.tags;
    this.isLoading = false;
    console.log(playList);
    this.playList = playList.data;
  }

  // mounted() {
  //   console.log('mounted');
  // }
}
</script>

<style lang="scss">
// @import './index.scss';
@import '~@/assets/css/index.scss';
.msg-pagination-container {
  margin-top: 20px;
  text-align: center;
}
.msg-pagination-container.is-background .el-pager li {
  /*对页数的样式进行修改*/
  // background-color: #10263c;
  width: 28px;
  height: 28px;
  line-height: 28px;
  font-weight: 400;
  font-size: 12px;
  // min-width: 10px;
  margin: 0 2px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background-color: #fff;
  color: #353535;
}
.msg-pagination-container.is-background .btn-next {
  /*对下一页的按钮样式进行修改*/
  // background-color: #10263c;
  width: 28px;
  height: 28px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background-color: #fff;
  color: #353535;
}
.msg-pagination-container.is-background .btn-prev {
  /*对上一页的按钮样式进行修改*/
  // background-color: #10263c;
  width: 28px;
  height: 28px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background-color: #fff;
  color: #353535;
}
.msg-pagination-container.is-background .el-pager li:not(.disabled).active {
  /*当前选中页数的样式进行修改*/
  // background-color: #446cff;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background-color: $theme-red;
  color: #fff;
}
.SongSheet {
  height: 1000px;
  &_container {
    width: 100%;
    min-height: 200px;
    display: flex;
    flex-wrap: wrap;
  }
  &-tab {
    position: relative;
    display: flex;
    justify-content: space-between;
    &-allTags {
      position: relative;
    }
    &-hotTags {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20px;

      .item {
        margin-right: 10px;
        color: #676767;
        padding: 5px;
        &:hover {
          color: #373737;
        }
      }
      .activeTag {
        color: #ec4141;
        &:hover {
          color: #ec4141;
        }
        background-color: #fdf5f5;
        border-radius: 10px;
      }
    }
  }
}
</style>
