<template>
  <div class="artistDetail">
    <div class="artistDetail-top" v-if="artistInfo.artist">
      <div
        class="artistDetail-pic"
        :style="{
          backgroundImage: `url(${artistInfo.artist.cover})`,
        }"
      ></div>
      <div class="artistDetail-info">
        <div class="artistDetail-info-name">
          {{ artistInfo.artist.name }}
        </div>
        <div
          class="artistDetail-info-alias"
          v-if="artistAlbum.artist && artistAlbum.artist.alias"
        >
          <div
            class="artistDetail-info-alias-item"
            v-for="item in artistAlbum.artist.alias"
            :key="item"
          >
            {{ item }}
          </div>
        </div>
        <div class="artistDetail-info-operation">
          <div class="button">
            <svg-icon type="collect" class="icon"></svg-icon> 收藏
          </div>
          <div
            class="button"
            v-if="artistInfo.user"
            @click="$router.push(`/UserDetail/${artistInfo.user.userId}`)"
          >
            <svg-icon type="user" class="icon"></svg-icon>个人主页
          </div>
        </div>
        <div class="artistDetail-info-list">
          <div class="artistDetail-info-songCount listitem">
            单曲数: {{ artistInfo.artist.musicSize }}
          </div>
          <div class="artistDetail-info-alibumCount listitem">
            专辑数: {{ artistInfo.artist.albumSize }}
          </div>
          <div class="artistDetail-info-MVCount listitem">
            MV数: {{ artistInfo.artist.mvSize }}
          </div>
        </div>
      </div>
    </div>
    <div class="artistDetail-body">
      <tab-bar
        :tabBarList="tabBarList"
        @changeTab="changeContent"
        :currentIndex="currentContent"
      ></tab-bar>
      <div
        class="artistDetail-body-album"
        v-if="artistAlbum.length && currentContent == 0"
      >
        <div class="artistDetail-body-album-container">
          <div class="container" v-if="artistAlbum.length !== 0">
            <song-sheet-item
              class="artistDetail-body-album-item"
              v-for="(item, index) in artistAlbum"
              :key="item.id"
              :item="item"
              :type="'Detail'"
              :category="'album'"
              :left="Number(index) % 6 === 0"
            >
            </song-sheet-item>
          </div>
          <div class="default" v-else>没有相关专辑</div>
        </div>
      </div>
      <div class="artistDetail-body-MV" v-else-if="currentContent == 1">
        <div class="container" v-if="artistMV.length !== 0">
          <MVItem
            v-for="item in artistMV"
            :key="item.id"
            :item="item"
            :width="5"
          ></MVItem>
        </div>
        <div class="default" v-else>没有相关mv</div>
      </div>

      <div
        class="artistDetail-body-description"
        v-else-if="artistDescription && currentContent == 2"
      >
        <div
          class="artistDetail-body-description-basic"
          v-if="!artistDescription.introduction.length"
        >
          <div class="artistDetail-body-description-basic-title">
            {{ artistInfo.artist.name }}简介
          </div>
          <div class="artistDetail-body-description-basic-content">
            {{ artistDescription.briefDesc }}
          </div>
        </div>
        <div class="container" v-else>
          <div
            class="artistDetail-body-description-item"
            v-for="item in artistDescription.introduction"
            :key="item.ti"
          >
            <div class="artistDetail-body-description-item-title">
              {{ item.ti }}
            </div>
            <div class="artistDetail-body-description-item-content">
              <p v-for="(txt, index) in textFormat(item.txt)" :key="index">
                {{ txt }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="artistDetail-body-simi"
        v-else-if="similarArtist.length && currentContent == 3"
      >
        <artist-item
          v-for="item in similarArtist"
          :key="item.id"
          :item="item"
          :width="5"
          :picHeight="'1.645833rem'"
        ></artist-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import {
  getArtistDetail,
  getArtistAlbum,
  getArtistMV,
  getArtistDescription,
  getSimilarArtist,
} from '@services/ArtistDetail';

import TabBar from '@components/TabBar.vue';

import SvgIcon from '@components/svg/SvgIcon.vue';
import SongSheetItem from '@components/SongSheetItem.vue';

import MVItem from '@components/MVItem.vue';
import ArtistItem from '@components/ArtistItem.vue';

@Component({
  name: 'ArtistDetail',
  components: {
    SvgIcon,
    SongSheetItem,
    MVItem,
    ArtistItem,
    TabBar,
  },
})
export default class Default extends Vue {
  artistInfo: any = {};

  artistId!: string;

  isHideSignature = true;

  artistAlbum: any = [];

  artistMV: any = [];

  artistDescription: any = [];

  similarArtist: any[] = [];

  currentContent = 0;

  tabBarList = [
    {
      title: '专辑',
      index: 0,
    },
    {
      title: 'MV',
      index: 1,
    },
    {
      title: '歌手详情',
      index: 2,
    },
    {
      title: '相似歌手',
      index: 3,
    },
  ];

  textFormat(text: string) {
    const newText = text.split('\n');
    return newText;
  }

  changeContent(index: any) {
    console.log(index);
    this.currentContent = index;
  }

  async mounted() {
    await this.getData();
  }

  @Watch('$route')
  async getData() {
    this.currentContent = 0;
    this.artistDescription = [];
    this.similarArtist = [];
    this.artistMV = [];
    this.artistAlbum = [];
    this.artistInfo = {};

    const { id } = this.$route.params;
    const detail = await getArtistDetail(id);
    this.artistInfo = detail.data.data;
    const album = await getArtistAlbum(id);
    this.artistAlbum = album.data.hotAlbums;
    const MV = await getArtistMV(id);
    this.artistMV = MV.data.mvs;
    const description = await getArtistDescription(id);
    this.artistDescription = description.data;
    const simi = await getSimilarArtist(id);
    this.similarArtist = simi.data.artists;

    console.log(this.similarArtist);
  }

  // created() { }
}
</script>

<style scoped lang="scss">
.artistDetail {
  padding: 30px;
  overflow-y: auto;
  height: calc(100vh - 135px);
  box-sizing: border-box;
  &-top {
    display: flex;
  }
  &-pic {
    width: 185px;
    height: 185px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 10px;
  }
  &-info {
    flex: 1;
    margin-left: 20px;
    &-name {
      font-size: 21px;
      font-weight: 600;
    }
    &-alias {
      display: flex;
      margin-top: 15px;
      &-item {
        font-size: 14px;
        margin-right: 5px;
      }
    }
    &-operation {
      margin-top: 15px;
      display: flex;
      .button {
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
    &-list {
      display: flex;
      margin-top: 20px;
      .listitem {
        margin-right: 20px;
        font-size: 14px;
      }
    }
  }

  &-body {
    margin-top: 40px;

    .title {
      font-size: 16px;
      font-weight: 600;
      margin-top: 20px;
      span {
        margin-left: 6px;
        font-size: 12px;
        color: #9f9f9f;
      }
    }
    &-album {
      &-container {
        .container {
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
    &-MV {
      .container {
        display: flex;
        flex-wrap: wrap;
      }
    }
    &-description {
      &-basic {
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
        }
      }
      &-item {
        margin-top: 20px;

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

          p {
            text-indent: 30px;
            letter-spacing: 1px;
            line-height: 28px;
            margin: 0;
          }
        }
      }
    }
    &-simi {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
