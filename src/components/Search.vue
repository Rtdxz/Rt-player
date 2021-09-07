<template>
  <div class="search">
    <svg-icon type="search" class="icon"></svg-icon>
    <input
      type="text"
      @focus="isShowSearchBoard = true"
      @keydown.enter="GotoSearchPage"
      @input="debounceSearch"
      @blur="isShowSearchBoard = false"
      v-model="keywords"
    />

    <div class="searchBoard" v-show="isShowSearchBoard">
      <div
        class="default"
        v-if="JSON.stringify(searchSuggest) == '{}' && !keywords"
      >
        <div class="searchBoard-history"></div>
        <div class="searchBoard-hot">
          <div class="searchBoard-hot_title">热搜榜</div>
          <div
            class="searchBoard-hot_item"
            v-for="(item, index) in hotSearchList"
            :key="item.id"
          >
            <div
              class="searchBoard-hot_item-rank"
              :style="{ color: Number(index) < 3 ? '#ff3a3a' : '#c4c4c4' }"
            >
              {{ Number(index) + 1 }}
            </div>
            <div class="searchBoard-hot_item-right">
              <div class="searchBoard-hot_item-title">
                <div
                  class="searchBoard-hot_item-title-searchWord"
                  :style="{
                    color: Number(index) < 3 ? '#343434' : '#373737',
                    fontWeight: Number(index) < 3 ? '700' : '400',
                  }"
                >
                  {{ item.searchWord }}
                </div>
                <div
                  class="searchBoard-hot_item-title-icon"
                  v-if="item.iconUrl"
                  :style="{
                    backgroundImage: `url(${item.iconUrl})`,
                    width: item.iconType === 5 ? '10px' : '26px',
                  }"
                ></div>

                <div class="searchBoard-hot_item-title-score">
                  {{ item.score }}
                </div>
              </div>
              <div class="searchBoard-hot_item-content">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="searchBoard-suggest" v-else>
        <div class="searchBoard-suggest-title" @mousedown="GotoSearchPage">
          搜"<span>{{ keywords }}</span
          >"相关的结果>>
        </div>

        <div class="searchBoard-suggest-songs" v-if="searchSuggest.songs">
          <div class="searchBoard-suggest-songs_title title">
            单曲
          </div>
          <div
            class="searchBoard-suggest-songs_item item"
            v-for="item in searchSuggest.songs"
            :key="item.id"
            @mousedown="playMusicDetail(item)"
          >
            {{ item.name }}-{{ item.artists[0].name }}
          </div>
        </div>
        <div class="searchBoard-suggest-artists " v-if="searchSuggest.artists">
          <div class="searchBoard-suggest-artists_title title">
            歌手
          </div>
          <div
            class="searchBoard-suggest-artists_item item"
            v-for="item in searchSuggest.artists"
            :key="item.id"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="searchBoard-suggest-albums" v-if="searchSuggest.albums">
          <div class="searchBoard-suggest-albums_title title">
            专辑
          </div>
          <div
            class="searchBoard-suggest-albums_item item"
            v-for="item in searchSuggest.albums"
            :key="item.id"
          >
            {{ item.name }}
          </div>
        </div>
        <div
          class="searchBoard-suggest-playlists"
          v-if="searchSuggest.playlists"
        >
          <div class="searchBoard-suggest-playlist_title title">
            歌单
          </div>
          <div
            class="searchBoard-suggest-playlist_item item"
            v-for="item in searchSuggest.playlists"
            :key="item.id"
            @mousedown="$router.push('/PlayListDetail/' + item.id)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';

import SvgIcon from '@components/svg/SvgIcon.vue';
import { PublicPlay } from '@mixins/PublicPlay';
import {
  getHotSearch,
  getSearchSuggest,
  getSongDetail,
} from '@services/Search';
import { debounce } from '@utils';
import router from '../router';

@Component({
  name: 'Search',
  components: {
    SvgIcon,
  },
})
export default class Default extends PublicPlay {
  hotSearchList: any = {};

  searchSuggest: any = {};

  isShowSearchBoard = false;

  keywords: any = '';

  debounceSearch = debounce(this.getSearchSuggest, 500);

  async getSearchSuggest() {
    console.log('a');
    if (this.keywords) {
      const res = await getSearchSuggest(this.keywords);
      this.searchSuggest = res.data.result;
      console.log(this.searchSuggest);
    } else this.searchSuggest = {};
  }

  async playMusicDetail(item: any) {
    const res = await getSongDetail(item.id);
    const musicDetail = res.data.songs[0];
    this.playMusic(musicDetail);
  }

  GotoSearchPage() {
    if (!this.keywords) return;
    if (this.$route.path.indexOf('/SearchPage') === -1) {
      this.$router.push('/SearchPage');
    }

    this.$store.commit('saveSearchKeywords', this.keywords);
    this.isShowSearchBoard = false;
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  async created() {
    const hotSearchList = await getHotSearch();
    this.hotSearchList = hotSearchList.data.data;

    console.log(hotSearchList.data);
  }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.searchBoard {
  position: absolute;
  top: 30px;
  left: -40px;
  z-index: 5;
  width: 350px;
  height: 450px;
  overflow-y: auto;
  border-radius: 7px;
  box-shadow: 1px 1px 5px 1px rgba(100, 100, 100, 0.1);
  background-color: #fff;
  &-hot {
    &_title {
      height: 50px;
      // width: 100%;
      line-height: 50px;
      padding-left: 20px;
      color: #676767;
    }
    &_item {
      display: flex;
      height: 40px;
      cursor: pointer;
      font-size: 12px;
      padding: 5px 0 7px;
      // box-sizing: border-box;
      &:hover {
        background-color: #f2f2f2;
      }
      &-right {
        width: 280px;
        // flex: 1;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      &-rank {
        width: 60px;
        height: 40px;
        text-align: center;
        font-size: 16px;
        line-height: 40px;
      }
      &-title {
        display: flex;

        &-icon {
          margin-left: 10px;
          height: 13px;
          width: 26px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          // background-position: center center;
        }
        &-score {
          color: #cfcfcf;
          margin-left: 10px;
        }
      }

      &-content {
        margin-top: 5px;
        color: #9f9f9f;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  &-suggest {
    &-title {
      height: 25px;
      cursor: pointer;
      line-height: 25px;
      color: #676767;
      padding-left: 10px;
      &:hover {
        color: #373737;
      }
      span {
        color: #507daf;
      }
    }
    .title {
      height: 25px;
      background-color: #f5f5f7;
      line-height: 25px;
      padding-left: 20px;
    }
    .item {
      height: 30px;
      background-color: #fff;
      cursor: pointer;
      line-height: 30px;
      padding-left: 20px;
      padding-right: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        background-color: #f5f5f7;
      }
    }
  }
}
.search {
  position: relative;
  margin-left: 10px;
  .icon {
    position: absolute;
    top: 7.5px;
    left: 10px;
    width: 15px;
    height: 15px;
    color: #fff;
  }
  input {
    width: 170px;
    height: 30px;
    padding: 5px 30px;
    box-sizing: border-box;
    background-color: rgba(41, 41, 41, 0.1);
    font-size: 13px;
    color: #fff;
    border-radius: 15px;
    border: 1px;
    outline: 0;
  }
}
</style>
