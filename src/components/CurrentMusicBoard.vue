<template>
  <transition name="showCurrentMusicBoard">
    <div
      class="currentMusicBoard"
      v-show="isShowCurrentMusicBoard && currentMusicId"
    >
      <div
        class="el-icon-arrow-down currentMusicBoard-close
"
        @click="close"
      ></div>

      <div class="currentMusicBoard-title">
        <div class="currentMusicBoard-title-name" v-if="currentMusic.name">
          {{ currentMusic.name }}
        </div>

        <div
          class="currentMusicBoard-title-alia"
          v-if="currentMusic.alia && currentMusic.alia.length"
        >
          {{ currentMusic.alia[0] }}
        </div>
        <div class="currentMusicBoard-title-artist" v-if="currentMusic.ar">
          <div
            class="currentMusicBoard-title-artist-item"
            v-for="(item, index) in currentMusic.ar"
            :key="item.id"
          >
            <span class="slash" v-if="currentMusic.ar.length > 1 && index != 0">
              /
            </span>
            {{ item.name }}
          </div>
          <span class="currentMusicBoard-title-album">
            <span class="split">-</span>{{ currentMusic.al.name }}
          </span>
        </div>
      </div>
      <div class="currentMusicBoard-middle">
        <div class="currentMusicBoard-disc-container">
          <div
            class="currentMusicBoard-disc"
            :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }"
          >
            <div
              class="currentMusicBoard-disc-avatar"
              :style="{
                backgroundImage: `url(${
                  currentMusic.al ? currentMusic.al.picUrl : ''
                })`,
              }"
            ></div>
          </div>
          <div
            :class="{
              'currentMusicBoard-disc-playBar': isPlaying,
              'currentMusicBoard-disc-playBarReverse': !isPlaying,
            }"
          ></div>
        </div>
        <div class="currentMusicBoard-lyric" ref="lyric">
          <div v-if="lyricType === 'noLyric'" style="margin:100px 0 0">
            还没有歌词哦~
          </div>
          <div v-else-if="lyricType === 'absolute'" style="margin:100px 0 0">
            纯音乐~请您欣赏
          </div>
          <div v-else class="lyric">
            <p
              v-for="(item, index) in lyricArr"
              :key="index"
              ref="lyricLine"
              :style="{
                color: index === currentIndex ? '#000' : '#858585',
                fontWeight: index === currentIndex ? '700' : '400',
                fontSize: '15px',
              }"
            >
              {{ item.content }}
            </p>
          </div>
        </div>
        <div class="currentMusicBoard-similar"></div>
      </div>

      <div class="currentMusicBoard-comment">
        <Comment @changeCommentPage="changeCommentPage" :comment="comment">
        </Comment>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import { mapState } from 'vuex';

import Comment from '@components/PlayListDetail/Comment.vue';
import { getComment, getSongLyric } from '@services/CurrentMusicBoard';

import { formatToMinute } from '@utils';

@Component({
  name: 'CurrentMusicBoard',
  components: {
    Comment,
  },
  computed: {
    ...mapState(['currentMusic', 'currentMusicId', 'isPlaying', 'currentTime']),
  },
})
export default class Default extends Vue {
  comment: any = {};

  isShowCurrentMusicBoard = false;

  currentMusic!: any;

  currentMusicId!: string;

  currentTime!: number;

  isPlaying!: boolean;

  currentIndex = -1;

  lyric = '';

  lyricArr: any = [];

  timeArr: any[] = [];

  lyricType = 'lyric';

  open() {
    this.isShowCurrentMusicBoard = true;
  }

  close() {
    this.isShowCurrentMusicBoard = false;
  }

  changeCommentPage(page: number) {
    console.log(page);
    const params = {
      id: this.currentMusicId,
      limit: 20,
      offset: page * 20,
    };
    // eslint-disable-next-line no-return-assign
    getComment(params).then((res) => {
      this.comment.comments = [...res.data.comments];
      console.log(res.data);
    });
  }

  analysisLyric() {
    this.lyricArr = [];
    const arr = this.lyric.split('\n');
    // const pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
    const pattern = /\[(\d+:.+?)\]/g;
    arr.forEach((line, index) => {
      // 可能会有多个时间段

      const lineArray: any = line.match(pattern);
      const content = line.split(']')[line.split(']').length - 1];
      console.log(lineArray);
      if (lineArray && content) {
        lineArray.forEach((ele: string) => {
          console.log(formatToMinute(ele.replace('[', '').replace(']', '')));
          this.lyricArr.push({
            time: formatToMinute(ele.replace('[', '').replace(']', '')),
            content,
          });
        });
      }
    });
    this.lyricArr.sort((a: any, b: any) => a.time - b.time);
    console.log(this.lyricArr);
  }

  @Watch('currentTime')
  currentTimeChange(newVal: number, oldVal: number) {
    const lyricContainer: any = this.$refs.lyric;
    // console.log(this.lyricArr);
    for (let i = 0; i < this.lyricArr.length; i += 1) {
      if (newVal > this.lyricArr[i].time) {
        const lyricLines: any = this.$refs.lyricLine;
        this.currentIndex = i;
        if (lyricLines && lyricLines[this.currentIndex].offsetTop > 150) {
          console.log(
            lyricContainer.scrollTop,
            lyricLines[this.currentIndex].offsetTop,
          );
          lyricContainer.scrollTop = lyricLines[this.currentIndex].offsetTop - 150;
        }

        // console.log(currentIndex, this.timeArr[i]);
      }
    }
  }

  @Watch('currentMusicId')
  async getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
    if (newVal !== '') {
      const params = {
        id: newVal,
        limit: 20,
        offset: 0,
      };
      const comment = await getComment(params);
      this.comment = comment.data;
      // const { total } = this.comment;
      const lyric = await getSongLyric(newVal);
      console.log(lyric);
      if (lyric.data.nolyric) {
        this.lyricType = 'absolute';
      } else {
        // console.log(lyric.data.lrc.lyric);

        this.lyric = lyric.data.lrc.lyric;
        console.log(this.lyric);
        if (!this.lyric) {
          this.lyricType = 'noLyric';
        } else {
          this.lyricType = 'lyric';
          this.analysisLyric();
        }
      }
    }
  }

  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
.currentMusicBoard {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: calc(100vh - 75px);
  width: 100vw;
  background-color: #dde4f0;
  background-image: linear-gradient(#dde4f0, #fff);
  z-index: 3;
  overflow-y: auto;

  &-close {
    position: fixed;
    margin-top: 20px;
    margin-left: 40px;
    cursor: pointer;
    font-size: 20px;
  }
  &-title {
    margin: 80px auto 0;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-name {
      text-align: center;
      // line-height: 100px;
      font-size: 26px;
      font-weight: 400;
    }
    &-alia,
    &-album {
      margin-top: 10px;
      font-size: 12px;
      color: #848787;
    }
    &-album {
      margin: 0;
    }
    &-artist {
      margin-top: 10px;
      display: flex;
      .split {
        margin: 0 3px;
      }
      &-item {
        font-size: 12px;
        color: #848787;
        .slash {
          margin: 0 3px;
        }
      }
    }
  }
  &-middle {
    display: flex;
    justify-content: space-around;
  }
  &-disc {
    position: absolute;
    right: 0px;
    width: 300px;
    height: 300px;
    background-image: url('~@assets/img/disc.png');
    // background-color: red;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;

    animation-name: record;
    animation-duration: 20s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    &-container {
      position: relative;

      width: 2.287582rem;
      height: 350px;

      flex-shrink: 1;
    }
    &-avatar {
      position: absolute;
      width: 202px;
      height: 202px;
      border-radius: 50%;
      top: 49px;
      left: 50px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
    }
    &-playBar {
      position: absolute;
      top: -50px;
      right: 50px;

      width: 138px;
      height: 192px;
      background-image: url('~@assets/img/play-bar.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      transform-origin: 0 0;
      transform: rotate(-45deg);

      animation-name: playBar;
      animation-duration: 0.5s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-timing-function: linear;
    }
    &-playBarReverse {
      position: absolute;
      top: -50px;
      right: 50px;

      width: 138px;
      height: 192px;
      background-image: url('~@assets/img/play-bar.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      transform-origin: 0 0;
      transform: rotate(0deg);

      animation-name: reBar;
      animation-duration: 0.5s;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-timing-function: linear;
    }
  }
  &-lyric {
    position: relative;
    flex: 1;
    // margin: 20px auto;
    padding: 30px 70px;
    text-align: center;
    // width: 350px;

    height: 350px;
    overflow-y: auto;
    transition: scrollTop 0.5s ease;

    // scroll-behavior: smooth;
  }
  &-similar {
    width: 2.287582rem;
    height: 350px;
  }
  &-comment {
    margin: 20px auto;
    width: 800px;
  }
}
@keyframes playBar {
  to {
    transform: rotate(0deg);
  }
}

@keyframes reBar {
  to {
    transform: rotate(-45deg);
  }
}

@keyframes record {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.showCurrentMusicBoard-enter-active {
  transition: all 0.4s ease;
}
.showCurrentMusicBoard-leave-active {
  transition: all 0.4s ease;
}
.showCurrentMusicBoard-enter,
.showCurrentMusicBoard-leave-to {
  // transform: translateY(1000px);
  opacity: 0;
}
// @import './index.scss';
</style>
