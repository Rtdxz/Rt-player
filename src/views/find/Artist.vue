<template>
  <div class="">
    <div class="artistList-select">选择</div>
    <div class="artistList-content">
      <artist-item
        v-for="item in artistList.artists"
        :key="item.id"
        :item="item"
        :width="6"
      ></artist-item>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import { getArtistList } from '@services/Artist';
import SvgIcon from '@components/svg/SvgIcon.vue';

import ArtistItem from '@components/ArtistItem.vue';

@Component({
  name: 'Artist',
  components: {
    SvgIcon,
    ArtistItem,
  },
})
export default class Default extends Vue {
  artistList: any = [];

  loadMore() {
    console.log('load');
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  async created() {
    const artistList = await getArtistList();
    this.artistList = artistList.data;
    console.log(artistList);
  }

  // mounted() {
  //   console.log('mounted');
  // }
}
</script>

<style scoped lang="scss">
// @import './index.scss';

.artistList {
  &-content {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
