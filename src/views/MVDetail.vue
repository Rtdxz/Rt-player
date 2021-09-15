<template>
  <div class="MVDetail">
    <div class="MVDetail-main">
      <div class="MVDetail-main-title" @click="$router.go(-1)">
        <i class="el-icon-arrow-left" style="margin-right:10px"></i> 视频详情
      </div>
      <video
        width="622px"
        height="352px"
        controls
        :src="MVUrl"
        autoplay
      ></video>
      <div class="MVDetail-main-artist" v-if="isMV(id)">
        <div
          class="MVDetail-main-artist-pic"
          :style="{
            backgroundImage: `url(${
              artist.artist ? artist.artist.cover : urlIcon
            })`,
          }"
          @click="$router.push(`/ArtistDetail/${MVInfo.artists[0].id}`)"
        ></div>
        <div
          class="MVDetail-main-artist-name"
          @click="$router.push(`/ArtistDetail/${MVInfo.artists[0].id}`)"
        >
          {{ MVInfo.artistName || creator.nickname }}
        </div>
      </div>
      <div class="MVDetail-main-artist" v-else>
        <div
          class="MVDetail-main-artist-pic"
          :style="{
            backgroundImage: `url(${
              creator.avatarUrl != undefined ? creator.avatarUrl : urlIcon
            })`,
          }"
          @click="$router.push(`/UserDetail/${creator.userId}`)"
        ></div>
        <div
          class="MVDetail-main-artist-name"
          @click="$router.push(`/UserDetail/${creator.userId}`)"
        >
          {{ MVInfo.artistName || creator.nickname }}
        </div>
      </div>
      <div class="MVDetail-main-info">
        <div class="MVDetail-main-info-name">{{ MVInfo.name }}</div>
        <div class="MVDetail-main-info-base">
          <div class="MVDetail-main-info-base-time">
            <span>发布: </span>{{ MVInfo.publishTime }}
          </div>
          <div class="MVDetail-main-info-base-playCount">
            <span>播放: </span>{{ PlayCount(MVInfo.playCount) }}
          </div>
        </div>
        <div class="MVDetail-main-info-tags" v-if="MVInfo.videoGroup">
          <div class="item" v-for="item in MVInfo.videoGroup" :key="item.id">
            {{ item.name }}
          </div>
        </div>
        <div class="MVDetail-main-info-operation">
          <div class="playListDetail-info_operation_like button">
            <svg-icon type="like" class="icon"></svg-icon>赞
          </div>
          <div class="playListDetail-info_operation_collect button">
            <svg-icon type="collect" class="icon"></svg-icon>收藏
          </div>
          <div class="playListDetail-info_operation_share button">
            <svg-icon type="share" class="icon"></svg-icon>分享
          </div>
          <div class="playListDetail-info_operation_download button">
            <svg-icon type="download" class="icon"></svg-icon>
            下载全部
          </div>
        </div>
      </div>
      <div class="MVDetail-main-comment">
        <div class="MVDetail-main-comment-title">评论</div>
        <Comment
          @changeCommentPage="changeCommentPage"
          :comment="comment"
          :hasPadding="false"
          :type="1"
          :id="$route.params.id"
        >
        </Comment>
      </div>
    </div>
    <div class="MVDetail-relate">
      <div class="MVDetail-relate-title">相关推荐</div>
      <div class="MVDetail-relate-content">
        <div
          class="MVDetail-relate-content-item"
          v-for="item in relateMV"
          :key="item.vid"
        >
          <div
            class="MVDetail-relate-content-item-pic"
            @click="$router.push(`/MVDetail/${item.vid}`)"
            :style="{ backgroundImage: `url(${item.coverUrl})` }"
          >
            <div class="playCount">
              <svg-icon type="play3" class="icon"></svg-icon
              >{{
                item.playTime > 10000
                  ? `${Math.floor(item.playTime / 10000)}万`
                  : item.playTime
              }}
            </div>
            <div class="duration" v-if="item.durationms">
              {{ timeHandle(item.durationms) }}
            </div>
          </div>
          <div class="MVDetail-relate-content-item-info">
            <div
              class="MVDetail-relate-content-item-info-title"
              @click="$router.push(`/MVDetail/${item.vid}`)"
            >
              {{ item.title }}
            </div>
            <div class="MVDetail-relate-content-item-info-creator">
              <div class="mvType" v-if="isMV(item.vid)">
                <span
                  @click="
                    $router.push(`/ArtistDetail/${item.creator[0].userId}`)
                  "
                  >{{ item.creator[0].userName }}</span
                >
              </div>
              <div class="videoType" v-else>
                by
                <span
                  @click="$router.push(`/UserDetail/${item.creator[0].userId}`)"
                  >{{ item.creator[0].userName }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {
  getMVDetail,
  getMVUrl,
  getArtistDetail,
  getMVComment,
  getVideoDetail,
  getVideoUrl,
  getVideoComment,
  getRelatedMV,
} from '@services/MVDetail';

import Comment from '@components/Comment.vue';

import SvgIcon from '@components/svg/SvgIcon.vue';
import { timeHandle } from '@utils';

@Component({
  name: 'MVDetail',
  components: {
    Comment,
    SvgIcon,
  },
})
export default class Default extends Vue {
  MVUrl = '';

  MVInfo: any = {};

  artist: any = {};

  creator: any = {};

  comment: any = {};

  relateMV: any = [];

  urlIcon: any = {};

  id = '';

  timeHandle = timeHandle;

  PlayCount(count: number) {
    if (count > 10000) {
      return `${Math.floor(count / 10000)}万次`;
    }

    return count;
  }

  isMV(id: string) {
    if (!Number.isNaN(Number(id))) {
      return true;
    }
    return false;
  }

  changeCommentPage(page: number) {
    console.log(page);
    const params = {
      id: this.$route.params.id,
      limit: 20,
      offset: page * 20,
    };
    // eslint-disable-next-line no-return-assign
    getMVComment(params).then((res) => {
      this.comment.comments = [...res.data.comments];
      console.log(res.data);
    });
  }

  @Watch('$route')
  async getData() {
    // eslint-disable-next-line global-require
    this.urlIcon = require('@/assets/img/white.jpeg');
    this.MVUrl = '';
    this.MVInfo = {};
    this.artist = {};
    this.creator = {};

    this.comment = {};
    this.relateMV = [];
    const { id } = this.$route.params;
    this.id = id;
    // 如果是mv界面
    if (this.isMV(id)) {
      const res = await getMVDetail(id);
      const urlres = await getMVUrl(id);

      this.MVUrl = urlres.data.data.url;
      this.MVInfo = res.data.data;
      const artist = await getArtistDetail(this.MVInfo.artists[0].id);

      this.artist = artist.data.data;

      const params = {
        id,
        limit: 20,
        offset: 0,
      };
      const comment = await getMVComment(params);

      this.comment = comment.data;
      const relate = await getRelatedMV(id);
      this.relateMV = relate.data.data;
    } else {
      // 除了MV之外就只有video界面了
      const res = await getVideoDetail(id);
      const urlres = await getVideoUrl(id);
      console.log(urlres.data.urls[0].url);
      this.MVUrl = urlres.data.urls[0].url;
      this.MVInfo = res.data.data;
      console.log(this.MVInfo);
      this.creator = this.MVInfo.creator;
      const params = {
        id,
        limit: 20,
        offset: 0,
      };
      const comment = await getVideoComment(params);

      this.comment = comment.data;
      const relate = await getRelatedMV(id);
      this.relateMV = relate.data.data;
      console.log(this.relateMV);
    }
  }

  async created() {
    await this.getData();
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.MVDetail {
  display: flex;
  // width: 950px;
  height: 100%;
  overflow-y: auto;
  justify-content: center;

  &-main {
    width: 650px;
    padding-right: 28px;

    box-sizing: border-box;
    &-title {
      display: flex;

      margin: 20px 0;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
    }
    &-artist {
      display: flex;
      margin-top: 10px;
      align-items: center;
      &-pic {
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        border-radius: 50%;
        cursor: pointer;
      }
      &-name {
        margin-left: 10px;
        font-size: 15px;
        color: #676767;
        cursor: pointer;
        &:hover {
          color: #373737;
        }
      }
    }
    &-info {
      margin-top: 20px;
      &-name {
        font-size: 23px;
        font-weight: 700;
        word-break: break-all;
      }
      &-base {
        display: flex;
        margin-top: 15px;
        &-time {
          color: #cfcfcf;
        }
        &-playCount {
          margin-left: 20px;
          color: #cfcfcf;
        }
      }
      &-tags {
        display: flex;
        margin-top: 15px;
        .item {
          display: flex;
          justify-content: center;
          margin-right: 5px;
          // width: 20px;
          font-size: 12px;
          height: 14px;
          padding: 2px 7px;
          background-color: #f0f0f0;
          border-radius: 20px;
          cursor: pointer;
        }
      }
      &-operation {
        display: flex;
        margin-top: 30px;
        div {
          display: flex;
          align-items: center;
        }
        .icon {
          width: 17px;
          height: 17px;
          color: #666;
          margin-right: 5px;
        }
      }
    }
    &-comment {
      margin-top: 40px;
      padding-bottom: 60px;
      &-title {
        font-size: 23px;
        font-weight: 700;
        margin-bottom: 20px;
      }
    }
  }
  &-relate {
    width: 300px;
    &-title {
      margin: 20px 0;

      font-size: 16px;
      font-weight: 600;
    }
    &-content {
      &-item {
        display: flex;
        margin-bottom: 10px;
        &-pic {
          flex-shrink: 0;
          position: relative;
          width: 140px;
          height: 80px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          border-radius: 4px;
          box-shadow: 0px 10px 40px #8a8a8a inset;
          cursor: pointer;
          .playCount {
            position: absolute;
            top: 4px;
            right: 5px;
            font-size: 12px;

            color: #fff;
            .icon {
              vertical-align: bottom;

              width: 13px;
              height: 13px;
              margin-right: 6px;
            }
          }
          .duration {
            position: absolute;
            bottom: 4px;
            right: 5px;
            font-size: 12px;

            color: #fff;
          }
        }
        &-info {
          padding: 10px 0;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          &-title {
            cursor: pointer;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          &-creator {
            color: #9f9f9f;
            span {
              cursor: pointer;
              &:hover {
                color: #676767;
              }
            }
          }
        }
      }
    }
  }
}
</style>
