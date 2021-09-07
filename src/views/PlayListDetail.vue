<template>
  <div class="playListDetail">
    <div class="playListDetail-info">
      <div
        class="playListDetail-info_pic"
        :style="{ backgroundImage: `url(${playListInfo.coverImgUrl})` }"
      ></div>
      <div class="playListDetail-info_content">
        <div class="playListDetail-info_title">
          <span class="icon">歌单</span>
          <div class="text">{{ playListInfo.name }}</div>
        </div>
        <div class="playListDetail-info_user">
          <div
            class="playListDetail-info_user_avatar"
            :style="{
              backgroundImage: `url(${
                playListInfo.creator ? playListInfo.creator.avatarUrl : ''
              })`,
            }"
          ></div>
          <div class="playListDetail-info_user_name">
            {{ playListInfo.creator ? playListInfo.creator.nickname : '' }}
          </div>
          <div class="playListDetail-info_user_createTime">
            {{ dateFormat(playListInfo.createTime) }}创建
          </div>
        </div>
        <div class="playListDetail-info_operation">
          <div
            class="playListDetail-info_operation_play button"
            @click="playListAllMusic"
          >
            <svg-icon type="play4" class="icon"></svg-icon>播放全部
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
        <div class="playListDetail-info_base">
          <div class="playListDetail-info_base_tag">
            标签:
            <span v-for="(tag, index) in playListInfo.tags" :key="tag.index">
              <span class="text"> {{ tag }}</span>
              <span v-if="index !== playListInfo.tags.length - 1"> /</span>
            </span>
          </div>
          <div class="playListDetail-info_base_data">
            <span style="margin-right:17px">
              歌曲: {{ playListInfo.trackCount }}
            </span>
            <span>
              播放:
              {{
                playListInfo.playCount > 10000
                  ? Math.floor(playListInfo.playCount / 10000) + '万'
                  : playListInfo.playcount
              }}
            </span>
          </div>
          <div
            class="playListDetail-info_base_description"
            v-if="playListInfo.description"
            :class="{ hide: isHideDescription }"
          >
            <span>简介 :</span> {{ playListInfo.description }}
          </div>
          <i
            class="el-icon-caret-top icon"
            v-if="!isHideDescription && playListInfo.description"
            @click="isHideDescription = !isHideDescription"
          ></i>
          <i
            class="el-icon-caret-bottom icon"
            v-else-if="isHideDescription && playListInfo.description"
            @click="isHideDescription = !isHideDescription"
          ></i>
        </div>
      </div>
    </div>
    <div class="playListDetail-tabBar">
      <tab-bar
        :tabBarList="tabBarList"
        @changeTab="changeContent"
        :currentIndex="currentContent"
      ></tab-bar>
    </div>

    <div class="playListDetail-content">
      <!-- <div class="playListDetail-content_list" v-if="currentContent == 0">
        <div class="playListDetail-content_title">
          <div class="playListDetail-content_title_item title">音乐标题</div>
          <div class="playListDetail-content_title_item artists">歌手</div>
          <div class="playListDetail-content_title_item album">专辑</div>
          <div class="playListDetail-content_title_item time">时长</div>
        </div>
        <div
          class="playListDetail-content_itemContainer"
          v-loading="isLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-custom-class="loading_color"
        >
          <div
            class="playListDetail-content_item"
            v-for="(item, index) in playListContent.songs"
            :key="item.id"
            @dblclick="playMusicDetail(item, Number(index))"
          >
            <span class="playListDetail-content_item_rank">{{
              Rank(Number(index) + 1)
            }}</span>
            <div class="playListDetail-content_item_operation item">
              <svg-icon type="heart" class="icon"></svg-icon>
              <svg-icon type="download2" class="icon"></svg-icon>
            </div>
            <div
              class="playListDetail-content_item_name item title"
              :class="{
                'playListDetail-content_item_disabled_name':
                  playListContent.privileges[index].st === -200,
              }"
            >
              {{ item.name }}
              <span class="alias" v-if="item.alia.length">
                {{ `(${item.alia[0]})` }}
              </span>

              <svg-icon type="MV" class="mvicon" v-if="item.mv != 0"></svg-icon>
            </div>
            <div class="playListDetail-content_item_artists item artists">
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
            <div class="playListDetail-content_item_album item album">
              {{ item.al.name }}
            </div>
            <div class="playListDetail-content_item_time item time">
              {{ timeFormat(Math.floor(item.dt / 1000)) }}
            </div>
          </div>
        </div>
      </div> -->

      <song-item-list
        v-if="currentContent == 0"
        :playListContent="playListContent"
        :isLoading="isLoading"
      ></song-item-list>
      <Comment
        @changeCommentPage="changeCommentPage"
        v-else-if="currentContent == 1"
        :comment="comment"
      >
      </Comment>
      <div class="playListDetail-content_collector" v-else></div>
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
  getPlayListDetailInfo,
  getPlayListContent,
  getComment,
} from '@services/PlayListDetail';

import { dateFormat, timeFormat, Rank } from '@utils';

@Component({
  name: 'PlayListDetail',
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

  isHideDescription = true;

  currentContent = 0;

  ids = '';

  isLoading = true;

  playListInfo: any = {};

  playListContent: any = {};

  dateFormat = dateFormat;

  timeFormat = timeFormat;

  Rank = Rank;

  playMusicDetail(item: any, index: number) {
    if (this.playListContent.privileges[index].st === -200) {
      this.$message({ message: '因版权问题暂时下架', type: 'error' });
      return;
    }
    this.playMusic(item);
    console.log(item);
  }

  playListAllMusic() {
    const songList = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const song of this.playListContent.privileges) {
      if (song.st !== -200) {
        const index = this.playListContent.privileges.indexOf(song);
        songList.push(this.playListContent.songs[index]);
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

  // playMusic(musicDetail: any) {
  //   if (this.$store.state.currentMusicId === musicDetail.id) return;
  //   getMusicUrl(musicDetail.id).then((res) => {
  //     const musicInfo = res.data.data[0];

  //     this.$store.commit('changeCurrentMusicId', musicDetail.id);
  //     this.$store.commit('changeCurrentMusic', musicDetail);
  //     this.$store.commit('changeCurrentMusicInfo', musicInfo);

  //     this.$store.commit('changePlayStatus', true);
  //     this.$store.commit('addMusicToList', musicDetail);
  //   });
  // }

  tabBarList: any[] = [];

  @Watch('$route')
  async getWatchValue() {
    this.currentContent = 0;
    this.comment = {};
    this.ids = '';
    this.playListContent = {};
    this.isLoading = true;
    // console.log(newVal, oldVal);

    const res = await getPlayListDetailInfo(this.$route.params.id);
    this.playListInfo = res.data.playlist;
    this.playListInfo.trackIds.forEach((ele: any) => {
      this.ids += `${ele.id},`;
    });
    // console.log(this.ids);
    const list = await getPlayListContent(
      this.ids.substr(0, this.ids.length - 1),
    );

    this.playListContent = list.data;
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
        title: '收藏者',
        index: 2,
      },
    ];
  }

  async created() {
    this.currentContent = 0;
    this.comment = {};
    this.ids = '';
    this.playListContent = {};
    this.isLoading = true;
    // console.log(this.$route.params.id);
    const res = await getPlayListDetailInfo(this.$route.params.id);
    this.playListInfo = res.data.playlist;
    this.playListInfo.trackIds.forEach((ele: any) => {
      // console.log(ele.id);
      this.ids += `${ele.id},`;
    });
    // console.log(this.ids);
    const list = await getPlayListContent(
      this.ids.substr(0, this.ids.length - 1),
    );

    this.playListContent = list.data;
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
        title: '收藏者',
        index: 2,
      },
    ];
    // console.log(this.playListContent.songs);
  }
  // mounted() { }
}
</script>

<style lang="scss">
// @import './index.scss';
@import '~@/assets/css/index.scss';
@import '~@/assets/css/scroll.scss';
.playListDetail {
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
    &_user {
      margin: 13px 0;

      display: flex;
      align-items: center;
      &_avatar {
        cursor: pointer;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center center;
      }
      &_name {
        margin: 0 5px;
        font-size: 13px;
        color: #507daf;
        cursor: pointer;
        &:hover {
          color: #0b58b0;
        }
      }
      &_createTime {
        font-size: 13px;
        color: #676767;
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
    &_base {
      margin-top: 18px;
      div {
        margin-bottom: 10px;
        font-size: 13px;
        color: #676767;
      }
      &_tag {
        .text {
          color: #507daf;
          cursor: pointer;
          &:hover {
            color: #0b58b0;
          }
        }
      }
      &_data {
        display: flex;
      }
      &_description {
        width: 95%;
        position: relative;
        white-space: break-spaces;
        line-height: 28px;

        &.hide {
          position: relative;
          width: 95%;
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 20px;
          white-space: break-spaces;

          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      }
      .icon {
        position: absolute;
        right: 0px;
        top: 170px;
        font-size: 20px;
        color: #999999;
        cursor: pointer;
      }
    }
  }
  &-tabBar {
    padding: 0 30px 0;
  }
  &-content {
    &_itemContainer {
      height: 100px;
    }
    & .title {
      flex: 1 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & .artists {
      width: 290px;
    }
    & .album {
      width: 330px;
    }
    & .time {
      width: 135px;
    }
    & .item {
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
