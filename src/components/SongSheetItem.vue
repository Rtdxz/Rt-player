<template>
  <div
    class="SongSheet_item"
    :style="{ width: Width() }"
    :class="{ leftestItem: left }"
    @click="
      $router.push({
        name: 'PlayListDetail',
        path: 'PlayListDetail',
        params: { id: item.id },
      })
    "
  >
    <div
      class="SongSheet_item_pic"
      :style="{
        backgroundImage: `url(${Item().picUrl})`,
      }"
    >
      <div class="SongSheet_item_playcount">
        <svg-icon type="play3" class="SongSheet_item_icon"></svg-icon
        >{{ Item().playcount }}
      </div>
    </div>
    <div class="SongSheet_item_title item_title">
      {{ item.name }}
    </div>
    <div class="SongSheet_item_count " v-if="showCount">
      {{ item.trackCount }}首
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import SvgIcon from '@components/svg/SvgIcon.vue';

@Component({
  name: 'SongSheetItem',
  components: {
    SvgIcon,
  },
})
export default class Default extends Vue {
  // 不同类型的歌单项目分别提取
  Item() {
    const item = {
      picUrl: '',
      playcount: 0,
    };
    if (this.type === 'Individuation') {
      item.picUrl = this.item.picUrl;
      item.playcount = this.playCount(this.item.playcount);
    } else if (this.type === 'SongSheet') {
      item.picUrl = this.item.coverImgUrl;
      item.playcount = this.playCount(this.item.playCount);
    } else if (this.type === 'Detail') {
      item.picUrl = this.item.coverImgUrl;
      item.playcount = this.playCount(this.item.playCount);
    }
    return item;
  }

  Width() {
    if (this.type === 'Individuation' || this.type === 'SongSheet') {
      return '20%';
    }
    if (this.type === 'Detail') {
      return '16.6%';
    }
    return '20%';
  }

  // 播放量换算
  playCount(playcount: any) {
    return playcount > 10000 ? `${Math.floor(playcount / 10000)}万` : playcount;
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: {} })
  item: any;

  @Prop({ default: 'Individuation' })
  type?: string;

  @Prop({ default: false })
  left?: boolean;

  @Prop({ default: false })
  showCount?: boolean;
  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';

.SongSheet_item {
  padding: 10px;

  box-sizing: border-box;
  &_pic {
    position: relative;
    width: 1.354167rem;
    height: 1.354167rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
    box-shadow: 0px 10px 40px #8a8a8a inset;
    cursor: pointer;
  }
  &_playcount {
    position: absolute;
    top: 7px;
    right: 7px;
    font-size: 13px;
    text-shadow: 1px 1px 1px #333333;
    color: #fff;
  }
  &_icon {
    vertical-align: bottom;
    text-shadow: 1px 1px 1px #333333;
    width: 13px;
    height: 13px;
    margin-right: 3px;
  }

  &_title {
    width: fit-content;
    margin-top: 10px;
    font-size: 14px;
    cursor: pointer;
    color: #373737;
  }
  &_count {
    font-size: 12px;
    color: #9f9f9f;
    margin-top: 5px;
  }
}
.item_title {
  &:hover {
    font-size: 14px;
    color: #000;
  }
  font-weight: 400;
  width: fit-content;
  // margin-top: 10px;
  font-size: 14px;
  cursor: pointer;
}
.leftestItem {
  padding-left: 0;
}
@media screen and (max-width: 1250px) {
  .SongSheet_item {
    &_pic {
      width: 158px;
      height: 163px;
      border-radius: 7px;
    }
  }
}
</style>
