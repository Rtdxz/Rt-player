<template>
  <div
    class="artistItem"
    :style="{ width: Width() }"
    @click="$router.push(`/ArtistDetail/${item.id}`)"
  >
    <div
      class="artistItem_pic"
      :style="{ height: picHeight, backgroundImage: `url(${item.img1v1Url})` }"
    ></div>
    <div class="artistItem_title">
      <div class="artistItem_name">
        {{ item.name }}
        <!-- <svg-icon type="singer" v-if="item.accountId"></svg-icon> -->
      </div>
      <svg-icon
        type="singer"
        class="artistItem_icon"
        v-if="item.accountId"
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
  name: 'ArtistItem',
  components: {
    SvgIcon,
  },
})
export default class Default extends Vue {
  Width() {
    return `${(1 / this.width) * 100}%`;
  }

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop()
  item!: any;

  @Prop({ default: 6 })
  width!: number;

  @Prop({ default: '1.045752rem' })
  picHeight!: string;
  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.artistItem {
  &:nth-child(6n + 1) {
    padding-left: 0;
  }
  // margin-bottom: 20px;

  padding: 0 10px 20px;
  box-sizing: border-box;
  &_pic {
    position: relative;
    // width: 1.045752rem;
    // height: 1.045752rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
    cursor: pointer;
  }
  &_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 0px;
  }
  &_name {
    font-size: 15px;
    color: #373737;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  }
  &_icon {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
}

@media screen and (max-width: 1250px) {
  .artistItem_pic {
    width: 130px;
    height: 130px;
  }
}
</style>
