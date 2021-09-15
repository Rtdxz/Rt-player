<template>
  <div class="Individuation">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item
        v-for="item in banner.banners"
        :key="item.id"
        :style="{
          backgroundImage: `url(${item.imageUrl})`,
        }"
        @click.native="playMusicDetail(item.targetId)"
      >
        <h3 class="medium"></h3>
      </el-carousel-item>
    </el-carousel>
    <!-- 独家放送 -->
    <div class="privatecontent">
      <div class="privatecontent_title content_title">
        {{ privatecontent.name }}
        <svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
      <div class="privatecontent_content">
        <div
          class="privatecontent_content_item"
          v-for="item in privatecontent.result"
          :key="item.id"
        >
          <div
            class="privatecontent_content_item_pic"
            :style="{ backgroundImage: `url(${item.sPicUrl})` }"
            @click="gotoMVPage(item.id)"
          >
            <svg-icon
              type="play2"
              class="privatecontent_content_item_icon"
            ></svg-icon>
          </div>
          <div
            class="privatecontent_content_item_title item_title"
            @click="gotoMVPage(item.id)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommandSongSheet">
      <div class="recommandSongSheet_title content_title">
        推荐歌单<svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
      <div class="recommandSongSheet_content">
        <song-sheet-item
          v-for="(item, index) in recommandSongSheet.recommend.length !== 0
            ? recommandSongSheet.recommend.slice(0, 10)
            : recommandPlayList"
          :left="Number(index) % 5 === 0"
          :key="item.id"
          :item="item"
          :type="'Individuation'"
        >
          <!-- <div
            class="recommandSongSheet_content_item_pic"
            :style="{ backgroundImage: `url(${item.picUrl})` }"
          >
            <div class="recommandSongSheet_content_item_playcount">
              <svg-icon
                type="play3"
                class="recommandSongSheet_content_item_icon"
              ></svg-icon
              >{{
                item.playcount > 10000
                  ? Math.floor(item.playcount / 10000) + '万'
                  : item.playcount
              }}
            </div>
          </div>
          <div class="recommandSongSheet_content_item_title item_title">
            {{ item.name }}
          </div> -->
        </song-sheet-item>
      </div>
    </div>
    <!-- 最新歌曲 -->
    <div class="newestSong">
      <div class="newestSong_title content_title">
        最新音乐<svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
      <div class="newestSong_content">
        <div
          class="newestSong_content_item"
          v-for="item in newestSong.result"
          :key="item.id"
          @dblclick="playMusicDetail(item.id)"
        >
          <div
            class="newestSong_content_item_pic"
            v-lazy:background-image="{ src: item.picUrl }"
          >
            <svg-icon
              class="newestSong_content_item_icon"
              type="play"
            ></svg-icon>
          </div>
          <div class="newestSong_content_item_info">
            <div class="newestSong_content_item_name">{{ item.name }}</div>
            <div class="newestSong_content_item_artists">
              <svg-icon
                type="SQ"
                class="newestSong_content_item_sqicon"
              ></svg-icon>
              <svg-icon
                type="MV"
                class="newestSong_content_item_mvicon"
                v-if="item.song.mvid != 0"
                @click.native="gotoMVPage(item.song.mvid)"
              ></svg-icon>
              <div
                class="artist"
                v-for="(artist, index) in item.song.artists"
                :key="artist.id"
              >
                <span
                  class="slash"
                  v-if="item.song.artists.length > 1 && index != 0"
                >
                  /
                </span>
                <span class="text">
                  {{ artist.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="recommandMV">
      <div class="recommandMV_title content_title">
        推荐MV<svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
      <div class="recommandMV_content">
        <MVItem
          v-for="item in mv.result"
          :key="item.id"
          :item="item"
          :width="4"
          @click.native="gotoMVPage(item.id)"
        ></MVItem>
        <!-- <div
          class="recommandMV_content_item"
          v-for="item in mv.result"
          :key="item.id"
        >
          <div
            class="recommandMV_content_item_pic"
            :style="{ backgroundImage: `url(${item.picUrl})` }"
          >
            <div class="recommandMV_content_item_playcount">
              <svg-icon
                type="play3"
                class="recommandMV_content_item_icon"
              ></svg-icon
              >{{
                item.playCount > 10000
                  ? Math.floor(item.playCount / 10000) + '万'
                  : item.playCount
              }}
            </div>
          </div>
          <div class="recommandMV_content_item_title item_title">
            {{ item.name }}
          </div>
          <div class="recommandMV_content_item_artist ">
            {{ item.artists[0].name }}
          </div>
        </div> -->
      </div>
    </div>
    <!-- 播客 -->
    <!-- <div class="podcast">
      <div class="podcast_title content_title">
        播客<svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';

import {
  getPrivateContent,
  getRecommandSongSheet,
  getBanner,
  getNewestSong,
  getRecommandMV,
  getRecommandPlayLists,
  getSongDetail,
} from '@services/Individuation';
import { PrivateContent, RecommandSongSheet } from '@interface';

import SvgIcon from '@components/svg/SvgIcon.vue';

import SongSheetItem from '@components/SongSheetItem.vue';
import { mapState } from 'vuex';

import MVItem from '@components/MVItem.vue';
import { PublicPlay } from '@mixins/PublicPlay';

@Component({
  name: 'Individuation',
  components: {
    SvgIcon,
    SongSheetItem,
    MVItem,
  },
  computed: {
    ...mapState(['isLogin']),
  },
})
export default class Default extends PublicPlay {
  isLogin!: boolean;

  privatecontent: PrivateContent = {
    name: '',
    result: [],
    code: 0,
  };

  banner: any = {
    code: 0,
    banners: [],
  };

  recommandSongSheet: RecommandSongSheet = {
    code: 0,
    featureFirst: true,
    haveRcmdSongs: false,
    recommend: [],
  };

  recommandPlayList: any[] = [];

  newestSong: any = {
    category: 0,
    code: 0,
    result: [],
  };

  mv: any = {};

  async playMusicDetail(id: string) {
    console.log(id);
    const res = await getSongDetail(id);
    this.playMusic(res.data.songs[0]);
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  gotoMVPage(id: number | string) {
    console.log(id);
    this.$router.push(`/MVDetail/${id}`);
  }

  async created() {
    const banner = await getBanner();
    this.banner = banner.data;
    const privatecontent = await getPrivateContent();
    this.privatecontent = privatecontent.data;
    if (this.isLogin) {
      const recommandSongSheet = await getRecommandSongSheet();
      this.recommandSongSheet = recommandSongSheet.data;
    } else {
      const recommandPlayList = await getRecommandPlayLists();
      console.log(recommandPlayList.data);
      this.recommandPlayList = recommandPlayList.data.result;
    }

    const newestSong = await getNewestSong();
    this.newestSong = newestSong.data;

    const mv = await getRecommandMV();
    this.mv = mv.data;
    console.log(this.banner);
  }

  mounted() {
    console.log('mounted');
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.el-carousel__item {
  border-radius: 10px;
  background-size: 100% 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.content_title {
  width: fit-content;
  display: flex;
  align-items: center;
  font-weight: 1000;
  margin: 30px 0 10px;
  cursor: pointer;
  font-size: 20px;
  .icon {
    margin-left: 7px;
    width: 15px;
    height: 15px;
    color: rgb(76, 76, 76);
  }
}

.item_title {
  &:hover {
    font-size: 14px;
    font-weight: 500;
  }
  font-weight: 400;
  width: fit-content;
  margin-top: 10px;
  font-size: 14px;
  cursor: pointer;
}

.privatecontent {
  &_content {
    width: 100%;
    display: flex;
    &_item {
      &:first-child {
        padding-left: 0;
      }
      flex: 1;
      padding: 5px;
      &_pic {
        position: relative;
        height: 1.30719rem;
        // width: 2.30719rem;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center center;
        border-radius: 7px;
        cursor: pointer;
      }
      &_icon {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 25px;
        height: 25px;
      }
      // &_title {
      //   &:hover {
      //     font-size: 14px;
      //     font-weight: 430;
      //   }
      //   font-weight: 300;
      //   width: fit-content;
      //   margin-top: 10px;
      //   font-size: 14px;
      //   cursor: pointer;
      // }
    }
  }
}

.recommandSongSheet {
  &_content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // &_item {
    //   padding: 10px;
    //   &:first-child {
    //     padding-left: 0;
    //   }
    //   width: 20%;
    //   box-sizing: border-box;
    //   &_pic {
    //     position: relative;
    //     height: 1.30719rem;
    //     background-repeat: no-repeat;
    //     background-size: 100%;
    //     background-position: center center;
    //     border-radius: 7px;
    //     box-shadow: 0px 10px 40px #8a8a8a inset;
    //     cursor: pointer;
    //   }
    //   &_playcount {
    //     position: absolute;
    //     top: 7px;
    //     right: 7px;
    //     font-size: 13px;
    //     text-shadow: 1px 1px 1px #333333;
    //     color: #fff;
    //   }
    //   &_icon {
    //     vertical-align: bottom;
    //     text-shadow: 1px 1px 1px #333333;
    //     width: 13px;
    //     height: 13px;
    //     margin-right: 3px;
    //   }

    //   // &_title {
    //   //   width: fit-content;
    //   //   margin-top: 10px;
    //   //   font-size: 14px;
    //   //   cursor: pointer;
    //   // }
    // }
  }
}

.newestSong {
  &_content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &_item {
      width: 32%;
      &:nth-child(3n + 1) {
        padding-left: 0;
      }
      &:hover {
        background-color: rgb(234, 234, 234);
      }
      box-sizing: border-box;
      padding: 0 5px;
      padding-left: 0;
      padding-right: 5px;
      margin: 10px 0;
      margin-right: 10px;
      display: flex;
      align-items: center;
      border-radius: 7px;
      &_pic {
        position: relative;
        height: 50px;
        width: 50px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        border-radius: 7px;
        cursor: pointer;
      }
      &_icon {
        position: absolute;
        width: 25px;
        height: 25px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      &_sqicon,
      &_mvicon {
        flex-shrink: 0;
        width: 30px;
        height: 20px;
        margin-right: 5px;
        vertical-align: middle; /////添加这个就可以了
      }
      &_mvicon {
        width: 38px;

        cursor: pointer;
        &:hover {
          color: #f16f6f;
        }
      }
      &_info {
        width: 80%;
        height: 50px;
        padding-left: 10px;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      &_name {
        font-size: 12px;
      }
      &_artists {
        width: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .artist {
          font-size: 12px;
          color: #929292;
          cursor: pointer;

          .text {
            &:hover {
              color: #5f5f5f;
            }
          }
        }
      }
    }
  }
}

.recommandMV {
  &_content {
    width: 100%;
    display: flex;
  }
}

.Individuation {
  height: 1000px;
}

@media screen and (max-width: 1250px) {
  .privatecontent {
    &_content {
      &_item {
        &_pic {
          // width: 300px;
          height: 163px;
          border-radius: 7px;
        }
      }
    }
  }
}
</style>
