<template>
  <div class="">
    <audio
      src="http://m7.music.126.net/20210730222748/f3155686c7ac2bc1d658a48165401eb7/ymusic/1dc1/f6af/19a5/6fbf059ec5c63727753f7550975a6a9f.mp3"
      autoplay
      class="playMusicAudio"
      ref="audio"
    ></audio>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

@Component({
  name: 'Default',
})
export default class Default extends Vue {
  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  // created() {}

  // mounted() {}
}
</script>

<style scoped lang="scss">
// @import './index.scss';
</style>
