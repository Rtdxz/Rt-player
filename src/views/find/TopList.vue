<template>
  <div class="">
    <div class="officialList" v-loading="isLoading">
      <div class="officialList-title title">官方榜</div>
      <div class="officialList-content">
        <div
          class="officialList-list"
          v-for="list in officiallist"
          :key="list.id"
        >
          <div
            class="officialList-list_pic"
            @click="$router.push(`/PlayListDetail/${list.id}`)"
            :style="{
              backgroundImage: `url(${list.coverImgUrl || list.coverUrl})`,
            }"
          ></div>
          <div class="officialList-list_content">
            <div
              class="officialList-list_item"
              v-for="(item, index) in list.tracks"
              :key="item.id"
            >
              <div class="first">
                <span class="rank">{{ Number(index) + 1 }}</span
                >{{ item.first }}
              </div>
              <div class="second">{{ item.second }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="globalList">
      <div class="globalList-title title">全球榜</div>
      <div class="globalList-content">
        <!-- <div class="globalList-item" v-for="item in globallist" :key="item.id">
          <div
            class="globalList-item_pic"
            :style="{ backgroundImage: `url(${item.coverImgUrl})` }"
          ></div>
          <div class="globalList-item_title">{{ item.name }}</div>
        </div> -->
        <song-sheet-item
          :type="'SongSheet'"
          :item="item"
          v-for="(item, index) in globallist"
          :left="Number(index) % 5 === 0"
          :key="item.id"
        ></song-sheet-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { getTopListDetail } from '@services/TopList';

import SongSheetItem from '@components/SongSheetItem.vue';

@Component({
  name: 'TopList',
  components: {
    SongSheetItem,
  },
})
export default class Default extends Vue {
  toplist: any = {};

  officiallist: any = [];

  globallist: any = [];

  isLoading = true;

  async created() {
    this.isLoading = true;
    const toplist = await getTopListDetail();

    this.isLoading = false;
    console.log(toplist.data);
    this.toplist = toplist.data;
    this.officiallist = this.toplist.list.slice(0, 4);

    this.globallist = this.toplist.list.slice(4);
    console.log(this.globallist);
  }

  // mounted() {
  //   console.log('mounted');
  // }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.title {
  font-weight: 700;
  font-size: 20px;
}
.officialList {
  &-content {
    margin-top: 20px;
  }
  &-list {
    // width: 1000px;
    margin-bottom: 60px;
    display: flex;
    // justify-content: space-between;
    &_pic {
      position: relative;
      flex-shrink: 0;
      width: 170px;
      height: 170px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      border-radius: 7px;
      // box-shadow: 0px 10px 40px #8a8a8a inset;
      cursor: pointer;
    }

    &_content {
      flex: 1 1;
    }
    &_item {
      display: flex;
      justify-content: space-between;
      border-radius: 10px;
      &:nth-child(odd) {
        background-color: #f4f4f4;
      }
      padding: 20px;
      margin-left: 30px;
      div {
        font-size: 15px;
      }
      span {
        color: red;
        margin-right: 20px;
      }
      .second {
        color: #9b9b9b;
      }
    }
  }
}
.globalList {
  // &-title {
  // }
  &-content {
    display: flex;
    flex-wrap: wrap;
  }
  &-item {
    width: 20%;
    &_pic {
      width: 200px;
      height: 200px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      border-radius: 7px;
    }
  }
}
</style>
