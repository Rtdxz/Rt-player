<template>
  <div class="SongSheet" ref="SongSheet">
    <div class="SongSheet_container" v-loading="isLoading">
      <song-sheet-item
        v-for="(item,index) in playList.playlists"
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

import { getAllPlayList } from '@services/SongSheet';
import SongSheetItem from '@components/SongSheetItem.vue';

@Component({
  name: 'SongSheet',
  components: {
    SongSheetItem,
  },
})
export default class Default extends Vue {
  isLoading = true;

  async changePage(currentPage: number) {
    this.isLoading = true;
    console.log(currentPage);
    this.playList.playlists = [];
    const el: any = this.$refs.SongSheet;
    el.parentNode.scrollTop = 0;
    const playList = await getAllPlayList(currentPage - 1);
    this.isLoading = false;
    console.log(playList);
    this.playList = playList.data;
  }

  playList: any = {
    playlists: [],
  };

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  async created() {
    const playList = await getAllPlayList(0);
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
}
</style>
