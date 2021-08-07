<template>
  <div class="footer">
    <div class="MusicInfo"></div>
    <music-controller></music-controller>
    <div class="MusicSetting"></div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import MusicController from '@components/MusicController.vue';
//

@Component({
  name: 'Footer',
  components: {
    MusicController,
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
  height: 75px;
  width: 100%;
  background-color: #fff;
  border: 1px solid $border-color;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  // align-items: space-between;
  padding: 10px 10px 0;
}
</style>
