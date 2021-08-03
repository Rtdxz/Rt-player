<template>
  <div class="">
    <div class="newestMusic">
      <div class="newestMusic-tab"></div>
      <div class="newestMusic-select"></div>
      <div class="newestMusic-content">
        <div
          class="newestMusic-content_item"
          v-for="(item, index) in newestMusic.data"
          :key="item.id"
        >
          <span class="newestMusic-content_item_rank">{{
            Rank(Number(index) + 1)
          }}</span>
          <div
            class="newestMusic-content_item_pic"
            :style="{ backgroundImage: `url(${item.album.picUrl})` }"
          >
            <svg-icon class="icon" type="play"></svg-icon>
          </div>
          <div class="newestMusic-content_item_name">
            {{ item.name }}
            <span class="alias" v-if="item.alias.length">
              {{ `(${item.alias[0]})` }}
            </span>
            <svg-icon type="SQ" class="sqicon"></svg-icon>
            <svg-icon type="MV" class="mvicon" v-if="item.mvid != 0"></svg-icon>
          </div>
          <div class="newestMusic-content_item_artists">
            <div
              class="artist"
              v-for="(artist, index) in item.artists"
              :key="artist.id"
            >
              <span class="slash" v-if="item.artists.length > 1 && index != 0">
                /
              </span>
              <span class="text">
                {{ artist.name }}
              </span>
            </div>
            {{ item.artist }}
          </div>
          <div class="newestMusic-content_item_album">
            {{ item.album.name }}
          </div>
          <div class="newestMusic-content_item_time">
            {{ TimeHandle(item.duration) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import { getNewestMusic } from '@services/NewestMusic';

import SvgIcon from '@components/svg/SvgIcon.vue';

@Component({
  name: 'Default',
  components: {
    SvgIcon,
  },
})
export default class Default extends Vue {
  newestMusic: any = {};

  Rank(index: number) {
    return index < 10 ? `0${index}` : index;
  }

  TimeHandle(duration: number) {
    return `${new Date(duration).getMinutes()}:${
      new Date(duration).getSeconds() < 10
        ? `0${new Date(duration).getSeconds()}`
        : new Date(duration).getSeconds()
    }`;
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  async created() {
    const newestMusic = await getNewestMusic();
    this.newestMusic = newestMusic.data;
    console.log(this.newestMusic);
  }

  // mounted() {
  //   console.log('mounted');
  // }
}
</script>

<style scoped lang="scss">
.newestMusic {
  &-content {
    &_item {
      white-space: nowrap;
      overflow: hidden;
      &:nth-child(odd) {
        background-color: #f9f9f9;
      }
      &:hover {
        background-color: #f0f1f2;
      }
      width: 100%;
      height: 80px;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      border-radius: 4px;

      &_artists {
        width: 200px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        margin-right: 30px;
        text-overflow: ellipsis;
        .artist {
          font-size: 13px;
          color: #636363;
          cursor: pointer;
          .text {
            &:hover {
              color: #5f5f5f;
            }
          }
        }
      }
      &_rank {
        font-size: 13px;
        color: #c3c3c4;
      }
      &_pic {
        position: relative;
        margin-left: 15px;
        margin-right: 10px;
        width: 60px;
        height: 60px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        border-radius: 7px;
        cursor: pointer;
        .icon {
          position: absolute;
          width: 25px;
          height: 25px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
      &_name {
        display: flex;
        cursor: pointer;
        font-size: 14px;
        width: 400px;
        flex: 1;
        .sqicon,
        .mvicon {
          flex-shrink: 0;
          width: 30px;
          height: 20px;

          margin-right: 5px;
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

      &_album {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        color: #6e6e6e;
        width: 150px;
        margin-right: 50px;
        cursor: pointer;
        &:hover {
          color: #5f5f5f;
        }
      }
      &_time {
        font-size: 13px;

        color: #969697;
      }
    }
  }
}
// @import './index.scss';
</style>
