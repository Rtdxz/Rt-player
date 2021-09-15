<template>
  <div class="comment-item">
    <div
      class="comment-item_avatar"
      :style="{ backgroundImage: `url(${item.user.avatarUrl})` }"
      @click="$router.push(`/UserDetail/${item.user.userId}`)"
    ></div>
    <div class="comment-item_content">
      <span
        class="name"
        @click="$router.push(`/UserDetail/${item.user.userId}`)"
      >
        {{ item.user.nickname }}</span
      >: {{ item.content }}
      <div v-if="item.beReplied.length > 0" class="comment-item_replied">
        <div v-for="(citem, index) in item.beReplied" :key="index">
          <span style="color: #507daf; cursor: pointer">{{
            citem.user.nickname
          }}</span
          >: {{ citem.content }}
        </div>
      </div>
      <div class="comment-item_time">
        {{ dateFormat(item.time) }}
      </div>
      <div class="comment-item_operation">
        <svg-icon type="like" class="icon like"></svg-icon
        ><span class="likeCount">{{ item.likedCount }}</span>
        <span class="slash">|</span>
        <svg-icon type="share" class="icon"></svg-icon>
        <span class="slash">|</span>
        <svg-icon type="comment" class="icon"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import { dateFormat } from '@utils';
import SvgIcon from '@components/svg/SvgIcon.vue';

@Component({
  name: 'Default',
  components: {
    SvgIcon,
  },
})
export default class Default extends Vue {
  dateFormat = dateFormat;

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: {} })
  item!: any;
  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.comment-item {
  position: relative;
  width: 100%;
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #f2f2f2;
  &_content {
    flex: 1;
    margin-left: 10px;
    line-height: 20px;
    color: #373737;
    .name {
      color: #507daf;
      cursor: pointer;
    }
  }
  &_avatar {
    width: 35px;
    height: 35px;
    flex-shrink: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    border-radius: 50%;
    cursor: pointer;
  }
  &_replied {
    margin: 3px 0 6px;
    background-color: rgb(241, 241, 244);
    padding: 7px 10px;
    border-radius: 5px;
  }
  &_time {
    color: #9f9f9f;
  }
  &_operation {
    display: flex;
    align-items: center;
    color: #666666;
    position: absolute;
    bottom: 15px;
    right: 0;
    .icon {
      width: 12px;
      height: 12px;
      cursor: pointer;
    }
    .like {
      margin-right: 3px;
    }
    .likeCount {
      cursor: pointer;
    }
    .slash {
      color: #dfcfe7;
      font-size: 12px;
      margin: 0 13px;
    }
  }
}
</style>
