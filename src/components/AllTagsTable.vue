<template>
  <div class="allTagsTable" v-show="isShowTagsTable">
    <div class="allTagsTable-title">
      全部歌单
    </div>
    <div class="allTagsTable-content" v-if="allTagsInfo">
      <div class="item" v-for="(item, index) in tags" :key="index">
        <div class="category">{{ allTagsInfo.categories[index] }}</div>
        <div class="tags">
          <div
            class="tag"
            v-for="tag in item"
            :key="tag.id"
            @click="changeTag(tag.name)"
          >
            <div
              class="name"
              :class="{ 'name-active': currentTag == tag.name }"
            >
              {{ tag.name }} <span v-show="tag.hot">HOT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { getAllTags } from '@services/SongSheet';

@Component({
  name: 'AllTagsTable',
})
export default class Default extends Vue {
  allTagsInfo: any = {};

  tags: any[] = [];

  changeTag(tag: string) {
    this.$emit('changeCurrentTag', tag);
    // console.log(tag);
  }

  // @Watch('name')
  // getWatchValue(newVal: string, oldVal: string) {
  //   console.log(newVal, oldVal);
  // }

  @Prop({ default: false })
  isShowTagsTable!: boolean;

  @Prop({ default: '全部歌单' })
  currentTag!: string;

  async created() {
    const res = await getAllTags();
    // this.allTagsInfo = res.data;
    console.log(res.data);

    this.allTagsInfo.categories = res.data.categories;
    this.tags = [[], [], [], [], []];
    res.data.sub.forEach((tag: any) => {
      switch (tag.category) {
        case 0:
          this.tags[0].push(tag);
          break;
        case 1:
          this.tags[1].push(tag);
          break;
        case 2:
          this.tags[2].push(tag);
          break;
        case 3:
          this.tags[3].push(tag);
          break;
        case 4:
          this.tags[4].push(tag);
          break;
        default:
          break;
      }
    });
    // console.log(this.allTagsInfo);
  }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.allTagsTable {
  position: absolute;
  top: 33px;
  left: -5px;
  height: calc(100vh - 230px);
  width: 745px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 0px 3px 3px rgba(100, 100, 100, 0.1);
  z-index: 4;
  &-title {
    height: 55px;
    line-height: 55px;
    padding-left: 30px;
    border-bottom: 1px solid #e5e5e5;
    color: #373737;
    &:hover {
      color: #ec4141;
    }
  }
  &-content {
    display: flex;
    flex-direction: column;
    .item {
      display: flex;
      margin: 15px 0;
      .category {
        height: 30px;
        flex-shrink: 0;
        width: 100px;
        text-align: center;
        color: #cfcfcf;
        line-height: 40px;
        font-size: 14px;
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .tag {
          position: relative;
          display: flex;
          align-items: center;
          width: 16.6%;
          height: 30px;
          color: #373737;

          margin: 5px 0;
          font-size: 14px;
          cursor: pointer;
          .name {
            padding: 5px 14px;
            border-radius: 15px;
            // background-color: #fdf5f5;
            box-sizing: border-box;
            cursor: pointer;
            &-active {
              background-color: #fdf5f5;
              color: #ec4141;
            }
            span {
              position: absolute;
              top: 5px;
              // right: 20px;
              // left: 0;
              transform: scale(0.4, 0.6);
              font-weight: 700;
              color: #ec4141;
            }
          }
          &:hover {
            color: #ec4141;
          }
        }
      }
    }
  }
}
</style>
