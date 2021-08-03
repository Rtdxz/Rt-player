<template>
  <div class="">
    <div class="artistList-select">选择</div>
    <div class="artistList-content">
      <div
        class="artistList-content_item"
        v-for="item in artistList.artists"
        :key="item.id"
      >
        <div
          class="artistList-content_item_pic"
          :style="{ backgroundImage: `url(${item.img1v1Url})` }"
        ></div>
        <div class="artistList-content_item_title">
          <div class="artistList-content_item_name">
            {{ item.name }}
            <!-- <svg-icon type="singer" v-if="item.accountId"></svg-icon> -->
          </div>
          <svg-icon
            type="singer"
            class="artistList-content_item_icon"
            v-if="item.accountId"
          ></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import { getArtistList } from '@services/Artist';
import SvgIcon from '@components/svg/SvgIcon.vue';

@Component({
  name: 'Default',
  components: {
    SvgIcon,
  },
})
export default class Default extends Vue {
  artistList: any = [];

  loadMore() {
    console.log('load');
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  async created() {
    const artistList = await getArtistList();
    this.artistList = artistList.data;
    console.log(artistList);
  }

  // mounted() {
  //   console.log('mounted');
  // }
}
</script>

<style scoped lang="scss">
// @import './index.scss';

.artistList {
  &-content {
    display: flex;
    flex-wrap: wrap;
    &_item {
      &:nth-child(6n + 1) {
        padding-left: 0;
      }
      // margin-bottom: 20px;
      width: 1/6 * 100%;
      padding: 0 10px 20px;
      box-sizing: border-box;
      &_pic {
        position: relative;
        // width: 1.045752rem;
        height: 1.045752rem;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center center;
        border-radius: 7px;
        cursor: pointer;
      }
      &_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0 0px;
      }
      &_name {
        font-size: 15px;
        color: #373737;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
      &_icon {
        cursor: pointer;
        width: 16px;
        height: 16px;
      }
    }
  }
}

@media screen and (max-width: 1250px) {
  .artistList {
    &-content_item_pic {
      width: 130px;
      height: 130px;
    }
  }
}
</style>
