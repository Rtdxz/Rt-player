<template>
  <div class="playListTable">
    <div class="playListTable-title">
      <div class="playListTable-title_top">当前播放</div>
      <div class="playListTable-title_bottom">
        <div class="playListTable-title_bottom_count">
          共{{ playList.length }}首
        </div>
        <div class="playListTable-title_bottom_clear" @click="clearPlayList">
          清空列表
        </div>
      </div>
    </div>
    <div class="playListTable-content">
      <div
        class="playListTable-content_item"
        v-for="item in playList"
        :key="item.id"
        @dblclick="playMusic(item)"
      >
        <div class="playListTable-content_item_name item title">
          {{ item.name }}
          <span class="alias" v-if="item.alia.length">
            {{ `(${item.alia[0]})` }}
          </span>
          <!-- <svg-icon type="SQ" class="sqicon"></svg-icon> -->
          <svg-icon type="MV" class="mvicon" v-if="item.mv != 0"></svg-icon>
        </div>
        <div class="playListTable-content_item_artists item artists">
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
        <!-- <div class="playListTable-content_item_album item album">
          {{ item.al.name }}
        </div> -->
        <div class="playListTable-content_item_time item time">
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
import SvgIcon from '@components/svg/SvgIcon.vue';
import { mapState } from 'vuex';
import { PublicPlay } from '@mixins';

@Component({
  name: 'PlayListTable',
  components: {
    SvgIcon,
  },
  computed: {
    ...mapState(['playList']),
  },
})
export default class Default extends PublicPlay {
  playList!: any[];

  clearPlayList() {
    this.$store.commit('clearPlayList');
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;
  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.playListTable {
  position: fixed;
  right: 0;
  top: 60px;
  width: 420px;
  height: calc(100vh - 135px);
  background-color: #fff;
  box-shadow: 0px -2px 5px 1px rgba(51, 51, 51, 0.1);
  z-index: 1;
  &-title {
    padding: 20px;
    &_top {
      font-size: 21px;
      font-weight: 600;
    }
    &_bottom {
      display: flex;
      margin-top: 15px;
      justify-content: space-between;
      &_count {
        font-size: 13px;
        color: #cfcfcf;
      }
      &_clear {
        font-size: 14px;
        color: #507daf;
        cursor: pointer;
        &:hover {
          color: #0b58b0;
        }
      }
    }
  }

  &-content {
    position: relative;

    height: calc(100vh - 230px);
    overflow-y: auto;
    // padding: 0 13px;
    &::before {
      content: '';
      width: 90%;
      height: 1px;
      position: absolute;
      top: 0;
      left: 20px;
      background-color: #f2f2f2;
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

      width: 100%;
      height: 40px;
      padding-left: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      border-radius: 1px;
      &_name {
        // display: flex;
        font-size: 12px;
        width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
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
          // margin-left: 10px;
        }
      }

      &_artists {
        height: 40px;
        width: 120px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow-x: hidden;
        overflow-y: visible;
        margin-left: 10px;
        text-overflow: ellipsis;
        .artist {
          font-size: 12px;
          color: #656565;
          cursor: pointer;
          .text {
            &:hover {
              color: #343434;
            }
          }
        }
      }
      // &_rank {
      //   font-size: 12px;
      //   color: #c3c3c4;
      //   // margin-right: 30px;
      // }

      // &_album {
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      //   font-size: 13px;
      //   color: #6e6e6e;
      //   width: 150px;
      //   // margin-right: 50px;
      //   cursor: pointer;
      //   &:hover {
      //     color: #343434;
      //   }
      // }
      &_time {
        width: 85px;
        margin-left: 30px;
        font-size: 12px;

        color: #cfcfcf;
      }
    }
  }
}
</style>
