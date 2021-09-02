<template>
  <div class="footer">
    <div class="musicInfo" v-if="currentMusicId">
      <div
        class="musicInfo-pic"
        :style="{ backgroundImage: `url(${currentMusic.al.picUrl})` }"
        @mouseover="showPicHover = true"
        @mouseleave="showPicHover = false"
        @click="showCurrentMusicBoard"
      >
        <div class="musicInfo-pic-hover" v-show="showPicHover">
          <i class="el-icon-arrow-up icon"></i>
        </div>
      </div>

      <div class="musicInfo-title">
        <div class="musicInfo-name">
          {{ currentMusic.name }}{{ currentMusic.alia[0] }}
        </div>
        <div class="musicInfo-artist">
          <div
            class="musicInfo-artist-item"
            v-for="(item, index) in currentMusic.ar"
            :key="item.id"
          >
            <span class="slash" v-if="currentMusic.ar.length > 1 && index != 0"
              >/</span
            >
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- {{ currentMusic }} -->
    </div>
    <music-controller></music-controller>
    <music-setting></music-setting>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import MusicController from '@components/MusicController.vue';
//
import { mapState } from 'vuex';

import MusicSetting from '@components/MusicSetting.vue';

@Component({
  name: 'Footer',
  components: {
    MusicController,
    MusicSetting,
  },
  computed: {
    ...mapState(['currentMusicId', 'currentMusic']),
  },
})
export default class Default extends Vue {
  currentMusicId!: string;

  currentMusic!: any;

  showPicHover = false;

  showCurrentMusicBoard() {
    this.$emit('showCurrentMusicBoard');
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  // created() {
  //   console.log('created');
  // }

  // mounted() {
  //   console.log('mounted');
  // }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
@import '~@/assets/css/index.scss';
.footer {
  position: relative;
  height: 75px;
  width: 100%;
  background-color: #fff;
  border: 1px solid $border-color;
  box-sizing: border-box;
  // display: flex;
  justify-content: space-between;
  // align-items: space-between;
  padding: 10px 10px 0;
}
.musicInfo {
  display: flex;
  align-items: center;
  &-pic {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 7px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    cursor: pointer;
    &-hover {
      position: absolute;
      // left: 0;
      right: 0;

      width: 50px;
      height: 50px;
      border-radius: 7px;
      background-color: rgba(0, 0, 0, 0.5);
      .icon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #bfbdb9;
      }
    }
  }
  &-title {
    margin-left: 10px;
  }
  &-artist {
    // max-width: 300px;
    display: flex;
    margin-top: 7px;
    overflow-x: hidden;
    overflow-y: visible;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 15px;
    &-item {
      font-size: 12px;
      color: #373737;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
  &-name {
    // margin-top: -10px;
    font-size: 13px;
    color: #373737;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  }
}
</style>
