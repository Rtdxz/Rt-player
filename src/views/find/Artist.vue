<template>
  <div class="">
    <div class="artistList-select">
      <div class="artistList-select-area line">
        <div class="category">语种:</div>
        <div class="tags">
          <div
            class="tag"
            v-for="tag in areaTags"
            :key="tag.name"
            @click="changeType('area', tag.name)"
          >
            <div
              class="name"
              :class="{ 'name-active': currentArea == tag.name }"
            >
              {{ tag.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="artistList-select-category line">
        <div class="category">分类:</div>
        <div class="tags">
          <div
            class="tag"
            v-for="tag in genderTags"
            :key="tag.name"
            @click="changeType('gender', tag.name)"
          >
            <div
              class="name"
              :class="{ 'name-active': currentGender == tag.name }"
            >
              {{ tag.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="artistList-select-letter line">
        <div class="category">筛选:</div>
        <div class="tags">
          <div
            class="tag"
            v-for="tag in letterTags"
            :key="tag.name"
            @click="changeType('letter', tag.name)"
          >
            <div
              class="name"
              :class="{ 'name-active': currentLetter == tag.name }"
            >
              {{ tag.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="artistList-content" v-loading="isLoding">
      <artist-item
        v-for="item in artistList"
        :key="item.id"
        :item="item"
        :width="6"
      ></artist-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { getArtistList } from '@services/Artist';
import SvgIcon from '@components/svg/SvgIcon.vue';

import ArtistItem from '@components/ArtistItem.vue';
import { throttle } from '@utils';

@Component({
  name: 'Artist',
  components: {
    SvgIcon,
    ArtistItem,
  },
})
export default class Default extends Vue {
  artistList: any = [];

  areaTags: any[] = [
    { name: '全部', param: -1 },
    { name: '华语', param: 7 },
    { name: '欧美', param: 96 },
    { name: '日本', param: 8 },
    { name: '韩国', param: 16 },
    { name: '其他', param: 0 },
  ];

  // 类别标签
  genderTags: any[] = [
    { name: '全部', param: -1 },
    { name: '男歌手', param: 1 },
    { name: '女歌手', param: 2 },
    { name: '乐队', param: 3 },
  ];

  // 字母标签
  letterTags: any[] = [
    { name: '热门', param: -1 },
    { name: 'A', param: 'a' },
    { name: 'B', param: 'b' },
    { name: 'C', param: 'c' },
    { name: 'D', param: 'd' },
    { name: 'E', param: 'e' },
    { name: 'F', param: 'f' },
    { name: 'G', param: 'g' },
    { name: 'H', param: 'h' },
    { name: 'I', param: 'i' },
    { name: 'J', param: 'j' },
    { name: 'K', param: 'k' },
    { name: 'L', param: 'l' },
    { name: 'M', param: 'm' },
    { name: 'N', param: 'n' },
    { name: 'O', param: 'o' },
    { name: 'P', param: 'p' },
    { name: 'Q', param: 'q' },
    { name: 'R', param: 'r' },
    { name: 'S', param: 's' },
    { name: 'T', param: 't' },
    { name: 'U', param: 'u' },
    { name: 'V', param: 'v' },
    { name: 'W', param: 'w' },
    { name: 'X', param: 'x' },
    { name: 'Y', param: 'y' },
    { name: 'Z', param: 'z' },
    { name: '#', param: 0 },
  ];

  isLoding = true;

  currentArea = '全部';

  currentGender = '全部';

  currentLetter = '热门';

  currentPage = 1;

  loadMore() {
    console.log('load');
  }

  async created() {
    this.isLoding = true;
    this.artistList = [];
    const params = {
      area: -1,
      type: -1,
      initial: -1,
      limit: 24,
    };
    const artistList = await getArtistList(params);
    this.artistList = artistList.data.artists;
    console.log(artistList);
    this.isLoding = false;
  }

  async changeType(type: string, name: string) {
    this.artistList = [];
    if (type === 'area') {
      this.currentArea = name;
    } else if (type === 'gender') {
      this.currentGender = name;
    } else if (type === 'letter') {
      this.currentLetter = name;
    }
    const area = this.areaTags.find((item) => item.name === this.currentArea)
      .param;
    const gender = this.genderTags.find(
      (item) => item.name === this.currentGender,
    ).param;
    const initial = this.letterTags.find(
      (item) => item.name === this.currentLetter,
    ).param;
    console.log(area);
    const params = {
      area,
      type: gender,
      initial,
      limit: 24,
    };
    const artistList = await getArtistList(params);
    this.artistList = artistList.data.artists;
    console.log(artistList);
  }

  mounted() {
    const container: any = document.getElementById('container');
    console.log(container);

    container.addEventListener(
      'scroll',
      throttle(() => {
        console.log(
          container.scrollTop,
          container.scrollHeight,
          container.offsetHeight,
        );
        if (
          container.scrollHeight - container.scrollTop
          <= container.offsetHeight
        ) {
          const area = this.areaTags.find(
            (item) => item.name === this.currentArea,
          ).param;
          const gender = this.genderTags.find(
            (item) => item.name === this.currentGender,
          ).param;
          const initial = this.letterTags.find(
            (item) => item.name === this.currentLetter,
          ).param;
          this.currentPage += 1;

          const params = {
            area,
            type: gender,
            initial,
            limit: 24,
            offset: (this.currentPage - 1) * 24,
          };
          getArtistList(params).then((res) => {
            this.artistList = this.artistList.concat(res.data.artists);
            console.log(this.artistList);
          });
        }
      }, 1000),
    );
  }

  beforeDestroy() {
    const container: any = document.getElementById('container');
    console.log(container);
    container.removeEventListener('scroll', () => {
      console.log('destroy');
    });
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';

.artistList {
  &-select {
    .line {
      display: flex;
      // margin: 10px 0;
    }
    &-area {
      .category {
        margin-top: 0 !important;
      }
      .tag {
        margin-top: 0 !important;
      }
    }
    .category {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #373737;
      width: 40px;
      margin: 10px 0;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;

      .tag {
        position: relative;
        display: flex;
        margin: 10px 0;
        width: 60px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #676767;
        &:hover {
          color: #373737;
        }
        &::after {
          content: '';
          position: absolute;
          right: 0;
          height: 10px;
          width: 1px;
          background-color: #f2f2f2;
        }
        .name {
          padding: 5px 10px;
          // width: 30px;
          border-radius: 10px;

          cursor: pointer;
          &-active {
            color: #ec4141;
            background-color: #fef6f6;
            &:hover {
              color: #ec4141;
              background-color: #fdeded;
            }
          }
        }
      }
    }
  }
  &-content {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
