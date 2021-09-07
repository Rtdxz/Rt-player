<template>
  <div class="mvItem">
    <div
      class="mvItem_pic"
      :style="{
        backgroundImage: `url(${item.coverUrl || item.picUrl})`,
        height: picHeight,
      }"
    >
      <div class="mvItem_playcount">
        <svg-icon type="play3" class="mvItem_icon"></svg-icon
        >{{
          item.playCount || item.playTime > 10000
            ? Math.floor(item.playCount || item.playTime / 10000) + '万'
            : item.playCount || item.playTime
        }}
      </div>
      <div class="mvItem_duration" v-if="item.durationms">
        {{ timeHandle(item.durationms) }}
      </div>
    </div>
    <div class="mvItem_title item_title">
      {{ item.name || item.title }}
    </div>
    <div class="mvItem_artist ">
      {{ item.artists ? item.artists[0].name : item.creator[0].userName }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import SvgIcon from '@components/svg/SvgIcon.vue';
import { timeHandle } from '@utils';

@Component({
  name: 'MVItem',
  components: {
    SvgIcon,
  },
})
export default class Default extends Vue {
  timeHandle = timeHandle;

  @Prop()
  item!: any;

  @Prop({ default: '0.960784rem' })
  picHeight!: string;

  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
.mvItem {
  &:first-child {
    padding-left: 0;
  }
  flex: 1;
  padding: 10px;
  &_pic {
    position: relative;
    // width: 1.699346rem;
    height: 0.960784rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    border-radius: 7px;
    cursor: pointer;
  }
  &_playcount {
    position: absolute;
    top: 7px;
    right: 7px;
    font-size: 13px;

    color: #fff;
  }
  &_duration {
    position: absolute;
    bottom: 7px;
    right: 7px;
    font-size: 13px;

    color: #fff;
  }
  &_icon {
    vertical-align: bottom;

    width: 13px;
    height: 13px;
    margin-right: 6px;
  }
  &_title {
    width: 1.699346rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 10px;
    font-size: 14px;
    cursor: pointer;
  }
  &_artist {
    cursor: pointer;
    margin-top: 10px;
    font-size: 12px;
    color: #676767;
    &:hover {
      color: #333;
    }
  }
}

@media screen and (max-width: 1250px) {
  .mvItem {
    &_pic {
      // width: 300px;
      width: 213px;
      height: 140px;
    }
    &_title {
      width: 213px;
    }
  }
}
</style>
