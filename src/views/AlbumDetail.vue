<template>
  <div class="albumDetail">
    <div class="albumDetail-info">
      <div
        class="albumDetail-info_pic"
        :style="{ backgroundImage: `url(${albumInfo.picUrl})` }"
      ></div>
      <div class="albumDetail-info_content">
        <div class="albumDetail-info_title">
          <span class="icon">专辑</span>
          <div class="text">{{ albumInfo.name }}</div>
        </div>

        <div class="albumDetail-info_operation">
          <div
            class="albumDetail-info_operation_play button"
            @click="playListAllMusic"
          >
            <svg-icon type="play4" class="icon"></svg-icon>播放全部
          </div>
          <div class="albumDetail-info_operation_collect button">
            <svg-icon type="collect" class="icon"></svg-icon>收藏
          </div>
          <div class="albumDetail-info_operation_share button">
            <svg-icon type="share" class="icon"></svg-icon>分享
          </div>
          <div class="albumDetail-info_operation_download button">
            <svg-icon type="download" class="icon"></svg-icon>
            下载全部
          </div>
        </div>
        <div class="albumDetail-info_artist">
          <span>歌手: </span
          ><span
            class="albumDetail-info_artist-content"
            @click="$router.push(`/ArtistDetail/${albumInfo.artist.id}`)"
            >{{ albumInfo.artist.name }}</span
          >
        </div>
        <div class="albumDetail-info_time">
          <span>时间: </span>
          <span class="albumDetail-info_time-content">{{
            dateFormat(albumInfo.publishTime)
          }}</span>
        </div>
      </div>
    </div>
    <div class="albumDetail-tabBar">
      <tab-bar
        :tabBarList="tabBarList"
        @changeTab="changeContent"
        :currentIndex="currentContent"
      ></tab-bar>
    </div>

    <div class="albumDetail-content">
      <song-item-list
        v-if="currentContent == 0"
        :playListContent="albumContent"
        :isLoading="isLoading"
      ></song-item-list>
      <Comment
        @changeCommentPage="changeCommentPage"
        v-else-if="currentContent == 1"
        :comment="comment"
      >
      </Comment>
      <div class="albumDetail-description" v-else>
        <div class="albumDetail-description-title">专辑介绍</div>
        <div
          class="albumDetail-description-content"
          v-if="albumInfo.description"
        >
          <p v-for="(i, index) in albumDescription" :key="index">{{ i }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';

import TabBar from '@components/TabBar.vue';
import SvgIcon from '@components/svg/SvgIcon.vue';
import Comment from '@components/Comment.vue';
import SongItemList from '@components/SongItemList.vue';

import { PublicPlay } from '@mixins/PublicPlay';

import {
  getAlbumDetailInfo,
  getAlbumContent,
  getComment,
} from '@services/AlbumDetail';

import { dateFormat, timeFormat, Rank } from '@utils';

@Component({
  name: 'AlbumDetail',
  components: {
    TabBar,
    SvgIcon,
    Comment,
    SongItemList,
  },
})
export default class Default extends PublicPlay {
  commentInfo = '';

  commentPage = 0;

  comment: any = {};

  currentContent = 0;

  ids = '';

  isLoading = true;

  albumInfo: any = {};

  albumContent: any = {};

  albumDescription: any = [];

  dateFormat = dateFormat;

  timeFormat = timeFormat;

  Rank = Rank;

  playMusicDetail(item: any, index: number) {
    if (this.albumContent.privileges[index].st === -200) {
      this.$message({ message: '因版权问题暂时下架', type: 'error' });
      return;
    }
    this.playMusic(item);
    console.log(item);
  }

  playListAllMusic() {
    const songList = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const song of this.albumContent.privileges) {
      if (song.st !== -200) {
        const index = this.albumContent.privileges.indexOf(song);
        songList.push(this.albumContent.songs[index]);
      }
    }
    this.$store.commit('addAllMusicToList', songList);
    this.playMusic(songList[0]);
  }

  changeContent(index: any) {
    console.log(index);
    this.currentContent = index;
  }

  changeCommentPage(page: number) {
    console.log(page);
    const params = {
      id: this.$route.params.id,
      limit: 20,
      offset: page * 20,
    };
    // eslint-disable-next-line no-return-assign
    getComment(params).then((res) => {
      this.comment.comments = [...res.data.comments];
      console.log(res.data);
    });
  }

  tabBarList: any[] = [];

  @Watch('$route')
  async getWatchValue() {
    this.currentContent = 0;
    this.comment = {};
    this.ids = '';
    this.albumContent = {};
    this.isLoading = true;

    const res = await getAlbumDetailInfo(this.$route.params.id);
    this.albumInfo = res.data.playlist;
    this.albumInfo.trackIds.forEach((ele: any) => {
      this.ids += `${ele.id},`;
    });
    // console.log(this.ids);
    const list = await getAlbumContent(this.ids.substr(0, this.ids.length - 1));

    this.albumContent = list.data;
    this.isLoading = false;

    const params = {
      id: this.$route.params.id,
      limit: 20,
      offset: 0,
    };
    const comment = await getComment(params);
    this.comment = comment.data;
    const { total } = this.comment;
    this.tabBarList = [
      {
        title: '歌单列表',
        index: 0,
      },
      {
        title: `评论(${total})`,
        index: 1,
      },
      {
        title: '专辑详情',
        index: 2,
      },
    ];
  }

  async created() {
    this.currentContent = 0;
    this.comment = {};
    this.ids = '';
    this.albumContent = {};
    this.isLoading = true;
    // console.log(this.$route.params.id);
    const res = await getAlbumDetailInfo(this.$route.params.id);
    this.albumInfo = res.data.album;
    console.log(res);
    res.data.songs.forEach((ele: any) => {
      // console.log(ele.id);
      this.ids += `${ele.id},`;
    });
    // console.log(this.ids);
    const list = await getAlbumContent(this.ids.substr(0, this.ids.length - 1));
    console.log(list);
    this.albumContent = list.data;
    this.isLoading = false;
    const params = {
      id: this.$route.params.id,
      limit: 20,
      offset: 0,
    };
    const comment = await getComment(params);
    this.comment = comment.data;
    const { total } = this.comment;
    this.tabBarList = [
      {
        title: '歌单列表',
        index: 0,
      },
      {
        title: `评论(${total})`,
        index: 1,
      },
      {
        title: '专辑详情',
        index: 2,
      },
    ];
    this.albumDescription = this.albumInfo.description.split('\n');
  }
}
</script>

<style lang="scss">
// @import './index.scss';
@import '~@/assets/css/index.scss';
@import '~@/assets/css/scroll.scss';
.albumDetail {
  overflow: hidden;
  overflow-y: scroll;
  height: calc(100vh - 135px);
  &-info {
    display: flex;
    padding: 30px 30px 0;
    &_content {
      flex: 1;
      position: relative;
    }
    &_title {
      display: flex;
      align-items: center;
      .icon {
        height: 20px;
        width: 34px;
        line-height: 19px;
        text-align: center;
        // margin-top: -20px;
        margin-right: 10px;
        font-size: 13px;
        font-weight: 400;
        color: #ec4141;
        box-sizing: border-box;
        border: 1px solid #ec4141;
        border-radius: 1px;
      }
      .text {
        font-size: 24px;
        font-weight: 600;
      }
    }

    &_pic {
      width: 185px;

      height: 185px;
      flex-shrink: 0;
      margin-right: 25px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      border-radius: 7px;
    }
    &_operation {
      margin-top: 20px;
      display: flex;
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
      &_play {
        color: #fff;
        .icon {
          color: #fff;
        }
        background-color: #ec4141;
        &:hover {
          background-color: #cc3232 !important;
        }
      }
    }
    &_artist {
      margin-top: 15px;
      font-size: 13px;
      &-content {
        margin-left: 7px;
        cursor: pointer;
        color: #507daf;
        &:hover {
          color: #0b58b0;
        }
      }
    }
    &_time {
      margin-top: 15px;
      font-size: 13px;
      &-content {
        margin-left: 7px;
        color: #676767;
      }
    }
  }
  &-tabBar {
    padding: 0 30px 0;
  }
  &-description {
    padding: 15px 30px 0;
    // white-space: breaks-spaces;
    &-title {
      font-size: 14px;
      font-weight: 600;
      color: #373737;
      cursor: text;
      -webkit-user-select: text;
    }
    &-content {
      font-size: 13px;
      margin-top: 10px;
      color: #676767;
      cursor: text;
      -webkit-user-select: text;
      text-indent: 30px;

      p {
        text-indent: 30px;
        letter-spacing: 1px;
        line-height: 28px;
        margin: 0;
      }
    }
  }
}
.button {
  height: 30px;

  border: 1px solid #dfdfdf;
  padding: 0 15px 0;
  margin-right: 10px;
  box-sizing: border-box;
  line-height: 28px;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
}
.loading_color .el-loading-spinner i {
  color: #676767;
}
.loading_color .el-loading-spinner .el-loading-text {
  color: #676767;
}

.el-loading-mask {
  z-index: 2;
}

.el-textarea__inner:focus {
  border-color: #e5e5e5;
}
.el-textarea__inner {
  height: 80px;
  border-radius: 2px;
  border-color: #e5e5e5;
}
</style>
