<template>
  <div class="MusicController">
    <!-- autoplay="autoplay" -->
    <audio
      autoplay="autoplay"
      @start="start"
      @timeupdate="timeUpdate"
      @ended="playNextMusic(0)"
      ref="audio"
      :src="$store.state.currentMusicUrl"
    ></audio>

    <div class="MusicController-base">
      <svg-icon-controller
        :type="PlayMode()"
        class="MusicController-base_playMode"
        style="margin-top:2px;"
        @click.native="changePlayMode"
      ></svg-icon-controller>
      <svg-icon-controller
        type="pre"
        class="MusicController-base_pre"
        @click.native="playNextMusic(1, true)"
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
        @click.native="playNextMusic(0, true)"
      ></svg-icon-controller>
      <svg-icon-controller
        type="word"
        class="MusicController-base_word"
      ></svg-icon-controller>
    </div>
    <div class="MusicController-progress">
      <div class="MusicController-progress_currentTime">
        {{ timeFormat($store.state.currentTime) }}
      </div>

      <el-slider
        v-model="$store.state.currentTime"
        :max="Math.floor(currentMusic.dt / 1000)"
        :marks="slider"
        @change="changeProgress"
        @mousedown.native="isDragging = true"
        @mouseleave.native="isDragging = false"
        @mouseup.native="isDragging = false"
        :show-tooltip="false"
      ></el-slider>
      <div class="MusicController-progress_duration">
        {{ timeHandle(currentMusic.dt) }}
      </div>
    </div>
    <div class="volume">
      <svg-icon-controller
        :type="volume === 0 ? 'mute' : 'volume'"
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
import { Component, Watch, Prop } from 'vue-property-decorator';
import SvgIconController from '@components/svg/MusicController/SvgIconController.vue';
import SvgIcon from '@components/svg/SvgIcon.vue';
import { timeFormat, timeHandle } from '@utils';
import { mapState } from 'vuex';
import { PublicPlay } from '@mixins/PublicPlay';

@Component({
  name: 'MusicController',
  components: {
    SvgIconController,
    SvgIcon,
  },
  computed: {
    ...mapState([
      'isPlaying',
      'currentMusic',
      'playDur',
      'slider',
      'playList',
      'remainPlayList',
      'currentTime',
    ]),
  },
})
export default class Default extends PublicPlay {
  isPlaying!: boolean;

  playMode = 0;

  playList!: any[];

  remainPlayList!: any[];

  currentMusic!: any;

  slider!: any;

  isBeforeDestroy = false;
  // currentTime = 0;

  playDur!: number[];

  timeFormat = timeFormat;

  timeHandle = timeHandle;

  progress = 0;

  // duration = timeHandle(188571);

  // audio: any = {};

  isDragging = false;

  volume = 0.5;

  currentVolume = 0.5;

  PlayMode() {
    switch (this.playMode) {
      case 0:
        return 'order-play';
      case 1:
        return 'Beckoning';
      case 2:
        return 'list-loop';
      case 3:
        return 'single-loop';
      case 4:
        return 'random-play';
      default:
        return '';
    }
  }

  start() {
    console.log(this.slider);
  }

  timeUpdate() {
    if (this.isDragging || this.isBeforeDestroy) return;
    // this.audio.currenTime += 1;
    // console.log(this.audio.currentTime);
    this.$nextTick(() => {
      const music: any = this.$refs.audio;
      // this.$store.state.currentTime = music.currentTime + this.playDur[0];
      this.$store.commit(
        'changeCurrentTime',
        music.currentTime + this.playDur[0],
      );
    });
  }

  /*  type:
  0 播放下一首
  1 播放上一首
  isClick
  是否人为点击
  */
  playNextMusic(type = 0, isClick = false) {
    switch (this.playMode) {
      // 列表顺序播放
      case 0:
        this.orderPlay(type, isClick, false);
        break;
      // 心动模式
      case 1:
        this.beckoningPlay();
        break;
      // 列表循环
      case 2:
        this.orderPlay(type, isClick, true);
        break;
      // 单曲循环
      case 3:
        this.singleLoopPlay(isClick);
        break;
      // 随机播放
      case 4:
        this.randomPlay();
        break;
      default:
        break;
    }
  }

  // 随机播放
  randomPlay() {
    const { length } = this.remainPlayList;
    // 如果剩下未播放的歌曲仅剩一首，要对列表重置
    if (length === 1) {
      this.$store.commit('resetRemainPlayList');
    }
    let currentIndex = 0;
    this.playList.forEach((ele, index) => {
      if (ele.id === this.currentMusic.id) {
        currentIndex = index;
      }
    });

    // 将当前播放完的歌曲在随机列表里删除，剩下的歌曲可作为接下来获取随机下标的元素
    // 这样就保住了不会重复播放当前的歌曲
    this.remainPlayList.splice(currentIndex, 1);
    // 获取随机下标
    const randomIndex = Math.floor(Math.random() * length);

    this.playMusic(this.remainPlayList[randomIndex]);
  }

  singleLoopPlay(isClick: boolean) {
    if (isClick) {
      this.orderPlay(0, isClick, false);
    } else {
      const music: any = this.$refs.audio;
      music.load();
    }
  }

  beckoningPlay() {
    this.$message({ message: '目前暂时无法心动模式播放', type: 'warning' });
  }

  changeProgress() {
    const music: any = this.$refs.audio;
    music.currentTime = this.$store.state.currentTime - this.playDur[0];
    // console.log(this.currentTime, music.currentTime);
    this.isDragging = false;
  }

  changeVolume() {
    console.log(this.volume);
    const music: any = this.$refs.audio;
    music.volume = this.volume;
  }

  clickVolumeButton() {
    if (this.volume === 0) {
      this.volume = this.currentVolume;
      const music: any = this.$refs.audio;
      music.volume = this.volume;
    } else {
      this.currentVolume = this.volume;
      const music: any = this.$refs.audio;
      music.volume = 0;
      this.volume = 0;
    }
  }

  changePlayMode() {
    this.playMode = this.playMode === 4 ? 0 : this.playMode + 1;
  }

  Play() {
    if (this.playList.length === 0) return;

    const music: any = this.$refs.audio;

    music.volume = this.volume;
    console.log(music.currentTime);
    // console.log(this.currentTime);
    // console.log(music.volume);
    if (!this.isPlaying) {
      music.play();
      this.$store.commit('changePlayStatus', true);
      // this.isPlaying = true;
    } else {
      music.pause();
      this.$store.commit('changePlayStatus', false);
      // this.isPlaying = false;
    }
  }

  // 列表顺序播放
  orderPlay(type: number, isClick: boolean, isLoop: boolean) {
    console.log(type);
    let currentIndex = 0;
    this.playList.forEach((ele, index) => {
      if (ele.id === this.currentMusic.id) {
        currentIndex = index;
      }
    });
    // 人为点击下一首
    if (isClick || isLoop) {
      // 播放下一首
      if (type === 0) {
        // 是否到达末尾，点击到达末尾或者循环可以回到列表重新开始播放
        this.playMusic(
          this.playList[
            currentIndex === this.playList.length - 1 ? 0 : currentIndex + 1
          ],
        );
      } else {
        this.playMusic(
          this.playList[
            currentIndex === 0 ? this.playList.length - 1 : currentIndex - 1
          ],
        );
      }
    } else if (type === 0) {
      // 是否到达末尾，自动到达末尾表示播放结束
      // eslint-disable-next-line no-unused-expressions
      currentIndex === this.playList.length - 1
        ? console.log('播放结束')
        : this.playMusic(this.playList[currentIndex + 1]);
    } else {
      // eslint-disable-next-line no-unused-expressions
      currentIndex === 0
        ? console.log('播放结束')
        : this.playMusic(this.playList[currentIndex - 1]);
    }
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  mounted() {
    // 离开页面回来初始化
    const music: any = this.$refs.audio;
    music.currentTime = this.$store.state.currentTime - this.playDur[0];
    if (!this.isPlaying) {
      console.log(music);
      music.pause();
      // this.$store.commit('changePlayStatus', f);
      // this.isPlaying = true;
    }
  }

  beforeDestroy() {
    // 退出前的一些状态保存处理
    this.isBeforeDestroy = true;
    this.$store.commit('changePlayStatus', false);
  }
}
</script>

<style lang="scss">
// @import './index.scss';

.MusicController {
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
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
      cursor: pointer;
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
      top: -7px;
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
    cursor: pointer;
    background-color: #ff4e4e;
    height: 3px;
  }
  .el-slider__runway {
    margin: 10px 0 0;
    background-color: #e0eaf3;
    height: 3px;

    // border-radius: 50%;
  }
  .el-slider__button-wrapper {
    height: 10px;
    width: 10px;
    top: -5px;
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
