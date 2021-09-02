<template>
  <div class="musicSetting">
    <div class="playListTab">
      <svg-icon
        type="list-tab"
        class="icon"
        @click.native="showPlayListTable"
      ></svg-icon>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import SvgIcon from '@components/svg/SvgIcon.vue';

@Component({
  name: 'MusicSetting',
  components: {
    SvgIcon,
  },
})
export default class Default extends Vue {
  isShowPlayListTable = false;

  showPlayListTable() {
    this.isShowPlayListTable = !this.isShowPlayListTable;
    this.$store.commit('showPlayListTable', this.isShowPlayListTable);
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.musicSetting {
  position: absolute;
  top: 10px;
  right: 10px;
  // width: 200px;
  // height: 60px;
  .playListTab {
    position: absolute;
    width: 40px;
    height: 20px;
    top: 10px;
    right: 10px;
    .icon {
      width: 17px;
      height: 17px;
      cursor: pointer;
    }
  }
}
</style>
