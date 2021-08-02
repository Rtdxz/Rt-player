<template>
  <div class="">
    <display-music-bar></display-music-bar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import DisplayMusicBar from '@components/DiscoverMusicBar.vue';

@Component({
  name: 'Find',
  components: {
    DisplayMusicBar,
  },
})
export default class Default extends Vue {
  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  // created() {
  //   // console.log('created');
  // }

  // mounted() {
  //   // console.log('mounted');
  // }
}
</script>

<style scoped lang="scss">
@import '~@assets/css/scroll.scss';

.container {
  width: 100%;
  height: 515px;
  padding: 30px 0.784314rem;
  padding-bottom: 100px;
  overflow-x: hidden;
  // overflow-y: scroll;
  box-sizing: border-box;
}
</style>
