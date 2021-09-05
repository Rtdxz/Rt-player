<template>
  <div class="ss">
    <song-item-list
      :playListContent="playListContent"
      :isLoading="isLoading"
    ></song-item-list>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import SongItemList from '@components/SongItemList.vue';
import { mapState } from 'vuex';
import { Search } from '@services/Search';

@Component({
  name: 'SearchBySong',
  components: {
    SongItemList,
  },
  computed: {
    ...mapState(['searchKeywords']),
  },
})
export default class Default extends Vue {
  searchKeywords!: string;

  isLoading = true;

  playListContent: any = {};

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  async created() {
    const res = await Search(this.searchKeywords);
    console.log(res.data.result);
    this.playListContent = res.data.result;
    this.isLoading = false;
  }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
</style>
