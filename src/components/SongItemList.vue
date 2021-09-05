<template>
  <div class="songItemList">
    <div class="songItemList_title">
      <div class="songItemList_title_item title">音乐标题</div>
      <div class="songItemList_title_item artists">歌手</div>
      <div class="songItemList_title_item album">专辑</div>
      <div class="songItemList_title_item time">时长</div>
    </div>
    <div
      class="songItemList_itemContainer"
      v-loading="isLoading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-custom-class="loading_color"
    >
      <div
        class="songItemList_item"
        v-for="(item, index) in playListContent.songs"
        :key="item.id"
        @dblclick="playMusicDetail(item, Number(index))"
      >
        <span class="songItemList_item_rank">{{
          Rank(Number(index) + 1)
        }}</span>
        <div class="songItemList_item_operation item">
          <svg-icon type="heart" class="icon"></svg-icon>
          <svg-icon type="download2" class="icon"></svg-icon>
        </div>
        <div
          class="songItemList_item_name item title"
          :class="{
            songItemList_item_disabled_name: item.privilege
              ? item.privilege.st === -200
              : playListContent.privileges[index].st === -200,
          }"
        >
          <!-- songItemList_item_disabled_name: item.privileges
              ? item.privileges.st === -200
              : playListContent.privileges[index].st === -200, -->
          {{ item.name }}
          <span class="alias" v-if="item.alia.length">
            {{ `(${item.alia[0]})` }}
          </span>
          <!-- <svg-icon type="SQ" class="sqicon"></svg-icon> -->
          <svg-icon type="MV" class="mvicon" v-if="item.mv != 0"></svg-icon>
        </div>
        <div class="songItemList_item_artists item artists">
          <div
            class="artist"
            v-for="(artist, index) in item.ar"
            :key="artist.id"
          >
            <span class="slash" v-if="item.ar.length > 1 && index != 0">
              /
            </span>
            <span class="text">
              {{ artist.name }}
            </span>
          </div>
          {{ item.artist }}
        </div>
        <div class="songItemList_item_album item album">
          {{ item.al.name }}
        </div>
        <div class="songItemList_item_time item time">
          {{ timeFormat(Math.floor(item.dt / 1000)) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import { Rank, timeFormat } from '@utils';
import { PublicPlay } from '@mixins';
import SvgIcon from '@components/svg/SvgIcon.vue';

@Component({
  name: 'SongItemList',
  components: {
    SvgIcon,
  },
})
export default class Default extends PublicPlay {
  Rank = Rank;

  timeFormat = timeFormat;

  playMusicDetail(item: any, index: number) {
    if (
      (this.playListContent.privileges
        && this.playListContent.privileges[index].st === -200)
      || (item.privilege && item.privilege.st === -200)
    ) {
      this.$message({ message: '因版权问题暂时下架', type: 'error' });
      return;
    }

    this.playMusic(item);
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop()
  playListContent!: any;

  @Prop()
  isLoading!: boolean;

  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';

.songItemList {
  &_itemContainer {
    height: 100px;
  }
  .title {
    flex: 1 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .artists {
    width: 290px;
  }
  .album {
    width: 330px;
  }
  .time {
    width: 135px;
  }
  .item {
    padding-left: 5px;
    margin-left: 8px;
  }
  div {
    font-size: 13px;
  }
  &_title {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 110px;
    height: 30px;
    &_item {
      height: 30px;
      padding-left: 6px !important;
      margin-left: 8px;
      color: #888888;
      line-height: 30px;
      font-size: 13px;
      &:hover {
        background-color: #f0f1f2;
      }
    }
  }
  &_item {
    white-space: nowrap;
    overflow: hidden;

    &:nth-child(even) {
      background-color: #f9f9f9;
    }
    &:hover {
      background-color: #f0f1f2;
    }
    &_disabled {
      &_name {
        color: #c3c3c4 !important;
      }
    }
    width: 100%;
    height: 40px;
    padding-left: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-radius: 1px;
    &_name {
      // display: flex;
      font-size: 14px;
      // width: 400px;

      height: 40px;
      line-height: 40px;
      // align-items: center;
      .sqicon,
      .mvicon {
        flex-shrink: 0;
        width: 30px;
        height: 13px;

        margin-left: 5px;
        vertical-align: middle; /////添加这个就可以了
      }
      .sqicon {
        margin-left: 10px;
      }
      .mvicon {
        width: 38px;

        cursor: pointer;
        &:hover {
          color: #f16f6f;
        }
      }

      .alias {
        flex-shrink: 1;
        color: #9b9b9b;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 10px;
      }
    }
    &_operation {
      position: relative;
      margin: 0 15px;
      width: 30px;
      .icon {
        &:first-child {
          position: relative;
          top: 3px;
          height: 17px;
          width: 17px;
        }
        margin-right: 6px;
        height: 14px;
        width: 14px;
        color: #afafaf;
        cursor: pointer;
      }
    }
    &_artists {
      height: 40px;
      width: 200px;
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow-x: hidden;
      overflow-y: visible;
      // margin-right: 30px;
      text-overflow: ellipsis;
      .artist {
        font-size: 13px;
        color: #656565;
        cursor: pointer;
        .text {
          &:hover {
            color: #343434;
          }
        }
      }
    }
    &_rank {
      font-size: 13px;
      color: #c3c3c4;
      // margin-right: 30px;
    }

    &_album {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13px;
      color: #6e6e6e;
      width: 150px;
      // margin-right: 50px;
      cursor: pointer;
      &:hover {
        color: #343434;
      }
    }
    &_time {
      font-size: 13px;

      color: #969697;
    }
  }
}
</style>
