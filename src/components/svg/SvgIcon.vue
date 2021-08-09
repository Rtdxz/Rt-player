<template>
  <component :is="currentComponent" class="svg-icon" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SvgIconCloud from './SvgIconCloud.vue';
import SvgIconCloud2 from './SvgIconCloud2.vue';
import SvgIconICloud from './SvgIconICloud.vue';
import SvgIconRightArrow from './SvgIconRightArrow.vue';
import SvgIconLeftArrow from './SvgIconLeftArrow.vue';
import SvgIconPlay from './SvgIconPlay.vue';
import SvgIconPlay2 from './SvgIconPlay2.vue';
import SvgIconPlay3 from './SvgIconPlay3.vue';
import SvgIconMV from './SvgIconMV.vue';
import SvgIconSQ from './SvgIconSQ.vue';
import SvgIconSinger from './SvgIconSinger.vue';
import SvgIconMyCollect from './SvgIconMyCollect.vue';
import SvgIconPlayList from './SvgIconPlayList.vue';
import SvgIconSearch from './SvgIconSearch.vue';
import SvgIconCollect from './SvgIconCollect.vue';
import SvgIconCollectDone from './SvgIconCollectDone.vue';
import SvgIconShare from './SvgIconShare.vue';
import SvgIconDownload from './SvgIconDownload.vue';
import SvgIconDownload2 from './SvgIconDownload2.vue';

import SvgIconPlay4 from './SvgIconPlay4.vue';

import SvgIconHeart from './SvgIconHeart.vue';
import SvgIconHeart2 from './SvgIconHeart2.vue';

@Component({
  components: {
    SvgIconCloud,
    SvgIconCloud2,
    SvgIconICloud,
    SvgIconRightArrow,
    SvgIconLeftArrow,
    SvgIconPlay,
    SvgIconPlay2,
    SvgIconPlay3,
    SvgIconPlay4,
    SvgIconMV,
    SvgIconSQ,
    SvgIconSinger,
    SvgIconMyCollect,
    SvgIconPlayList,
    SvgIconHeart,
    SvgIconHeart2,
    SvgIconSearch,
    SvgIconCollect,
    SvgIconCollectDone,
    SvgIconShare,
    SvgIconDownload,
    SvgIconDownload2,
  },
})
export default class SvgIcon extends Vue {
  @Prop({ default: '' })
  type!: string;

  get currentComponent() {
    return `svg-icon-${this.type}`;
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.svg-icon {
  fill: currentColor;
}
</style>
