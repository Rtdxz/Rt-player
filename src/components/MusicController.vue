<template>
  <div class="MusicController">
    <audio
      @timeupdate="timeUpdate"
      @ended="timeEnd"
      ref="audio"
      src="http://m8.music.126.net/20210807160022/07fdb412f2f9e2b02388f39bd5158131/ymusic/5153/0f5b/5458/f9e5e4ed42810ca87c2dc2660f31b6fa.mp3"
    ></audio>

    <div class="MusicController-base">
      <svg-icon-controller
        type="order-play"
        class="MusicController-base_playMode"
        style="margin-top:2px;"
      ></svg-icon-controller>
      <svg-icon-controller
        type="pre"
        class="MusicController-base_pre"
      ></svg-icon-controller>
      <i class="MusicController-base_play" @click="Play">
        <svg-icon-controller
          :type="isPlaying ? 'pause' : 'play'"
        ></svg-icon-controller
      ></i>

      <svg-icon-controller
        type="next"
        class="MusicController-base_next"
        style="margin-top:1.5px;"
      ></svg-icon-controller>
      <svg-icon-controller
        type="word"
        class="MusicController-base_word"
      ></svg-icon-controller>
    </div>
    <div class="MusicController-progress">
      <div class="MusicController-progress_currentTime">
        {{ timeFormat(currentTime) }}
      </div>
      <el-slider
        v-model="currentTime"
        :max="Math.floor(188571 / 1000)"
        @change="changeProgress"
        @mousedown.native="isDragging = true"
        @mouseleave.native="isDragging = false"
        @mouseup.native="isDragging = false"
        :show-tooltip="false"
      ></el-slider>
      <div class="MusicController-progress_duration">{{ duration }}</div>
    </div>
    <div class="volume">
      <svg-icon-controller
        :type="this.volume === 0 ? 'mute' : 'volume'"
        class="volume-icon"
        @click.native="clickVolumeButton"
      ></svg-icon-controller>
      <el-slider
        v-model="volume"
        :max="1"
        :step="0.1"
        @input="changeVolume"
        :show-tooltip="false"
      ></el-slider>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import SvgIconController from '@components/svg/MusicController/SvgIconController.vue';

import { timeFormat, timeHandle } from '@utils';

@Component({
  name: 'MusicController',
  components: {
    SvgIconController,
  },
  // filters: {
  //   timeFormat: (time: number) => timeFormat(time),
  //   timeHandle: (time: number) => timeHandle(time),
  // },
})
export default class Default extends Vue {
  isPlaying = false;

  timeFormat = timeFormat;

  progress = 0;

  currentTime = 0;

  duration = timeHandle(188571);

  audio: any = {};

  isDragging = false;

  volume = 0.5;

  currentVolume = 0.5;

  timeUpdate() {
    if (this.isDragging) return;
    // this.audio.currenTime += 1;
    // console.log(this.audio.currentTime);
    this.currentTime = this.audio.currentTime;
    // console.log(this.currentTime);
  }

  timeEnd() {
    this.currentTime = 0;
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }

  changeProgress() {
    this.audio.currentTime = this.currentTime;
    this.isDragging = false;
  }

  changeVolume() {
    console.log(this.volume);
    this.audio.volume = this.volume;
  }

  clickVolumeButton() {
    if (this.volume === 0) {
      this.volume = this.currentVolume;
      this.audio.volume = this.volume;
    } else {
      this.currentVolume = this.volume;
      this.audio.volume = 0;
      this.volume = 0;
    }
  }

  Play() {
    this.audio = this.$refs.audio;
    this.audio.volume = this.volume;
    console.log(this.audio.currentTime);
    console.log(this.audio.volume);
    if (!this.isPlaying) {
      this.audio.play();
      this.isPlaying = true;
    } else {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;
  // created() { }
  // mounted() { }
}
</script>

<style lang="scss">
// @import './index.scss';

.MusicController {
  position: relative;
  &-base {
    padding: 0 50px;
    display: flex;
    align-items: center;

    & .svg-icon-controller {
      margin: 0px 20px;
      width: 17px;
      height: 17px;
      &:hover {
        color: #ef6767;
      }
    }
    &_play {
      display: inline-block;
      position: relative;
      width: 35px;
      height: 35px;
      margin: 0 10px;
      background-color: #f4f4f4;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background-color: #e5e5e5;
      }
      & .svg-icon-controller {
        margin: 0;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 17px;
        height: 17px;
        transform: translate(-50%, -50%);
      }
    }
  }
  &-progress {
    position: relative;
    &_duration,
    &_currentTime {
      position: absolute;
      font-size: 12px;
      color: #9f9f9f;
      top: 4px;
    }
    &_duration {
      right: -36px;
    }
    &_currentTime {
      left: -40px;
    }
  }
}

.el-slider {
  &:hover {
    .el-slider__bar {
      height: 5px;
    }
    .el-slider__runway {
      margin-top: 8px;
      height: 5px;
    }
    .el-slider__button {
      width: 7px;
      height: 7px;
      // visibility: hidden;
      // &:hover {
      transition: all 0s;
      visibility: visible;
      // }
      border: 1px solid #ff4e4e;
      background: #ff4e4e;
      // border: none;
      // border-radius: 0;
    }
    .el-slider__button-wrapper {
      height: 10px;
      width: 10px;
      top: -13px;
    }
  }
  .el-slider__button {
    width: 7px;
    height: 7px;
    transition: all 0s;
    visibility: hidden;
    // &:hover {
    //   visibility: visible;
    // }
    // border: 1px solid #ff4e4e;
    // background: #ff4e4e;
    // border: none;
    // border-radius: 0;
  }
  .el-slider__bar {
    background-color: #ff4e4e;
    height: 3px;
  }
  .el-slider__runway {
    margin: 10px 0 0;
    background-color: #e0eaf3;
    height: 3px;

    border-radius: 50%;
  }
  .el-slider__button-wrapper {
    height: 10px;
    width: 10px;
    top: -14px;
  }
}
.volume {
  position: absolute;
  width: 200px;
  height: 20px;
  top: 10px;
  right: -520px;
  &-icon {
    position: absolute;
    left: -25px;
    top: 0;
    width: 25px;
    height: 25px;
  }
  .el-slider {
    width: 100px;
  }
}
</style>
