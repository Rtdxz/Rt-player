<template>
  <div class="userDetail">
    <div class="userDetail-top" v-if="userInfo.profile">
      <div
        class="userDetail-avatar"
        :style="{ backgroundImage: `url(${userInfo.profile.avatarUrl})` }"
      ></div>
      <div class="userDetail-info">
        <div class="userDetail-info-name">{{ userInfo.profile.nickname }}</div>
        <div class="userDetail-info-detail">
          <div class="detailContainer">
            <svg-icon
              type="vip"
              class="userDetail-info-detail-vip"
              v-if="userInfo.profile.vipType !== 0"
            ></svg-icon>

            <div
              class="userDetail-info-detail-authType"
              v-if="
                userInfo.profile.allAuthTypes &&
                  userInfo.profile.allAuthTypes.length > 0
              "
            >
              {{ userInfo.profile.allAuthTypes[0].desc }}
            </div>

            <div class="userDetail-info-detail-level">
              Lv{{ userInfo.level }}
            </div>
            <div class="userDetail-info-detail-gender">
              {{ userInfo.profile.gender }}
            </div>
          </div>
          <div class="operation" v-if="!IsCurrentUser()">
            <div class="button">发私信</div>
            <div class="button">关注</div>
          </div>
          <div class="operation" v-else>
            <div class="button">编辑个人资料</div>
          </div>
        </div>
        <div class="userDetail-info-list">
          <div class="userDetail-info-event listitem">
            {{ userInfo.profile.eventCount }}
            <div class="itemTitle">动态</div>
          </div>

          <div class="userDetail-info-follows listitem">
            {{ userInfo.profile.follows }}
            <div class="itemTitle">关注</div>
          </div>
          <div class="userDetail-info-followeds listitem">
            {{ userInfo.profile.followeds }}
            <div class="itemTitle">粉丝</div>
          </div>
        </div>
        <div class="userDetail-info-city" v-if="city[userInfo.profile.city]">
          <span style="color:#373737">所在地区: </span
          >{{ city[userInfo.profile.city] }}
        </div>
        <div class="userDetail-info-network">
          <span style="color:#373737">社交网络:</span> 未绑定
        </div>
        <!-- <div class="userDetail-info-signature">
          <span style="color:#373737"> 个人介绍:</span>
          {{ userInfo.profile.signature }}
        </div> -->
        <div
          class="userDetail-info-signature"
          v-if="userInfo.profile.signature"
          :class="{ hide: isHideSignature }"
        >
          <span style="color:#373737">个人介绍 :</span>
          {{ userInfo.profile.signature }}
          <i
            class="el-icon-caret-top icon"
            v-if="!isHideSignature && userInfo.profile.signature"
            @click="isHideSignature = !isHideSignature"
          ></i>
          <i
            class="el-icon-caret-bottom icon"
            v-else-if="isHideSignature && userInfo.profile.signature"
            @click="isHideSignature = !isHideSignature"
          ></i>
        </div>
      </div>
    </div>
    <div class="userDetail-body">
      <div class="userDetail-playList" v-if="userCreatedPlayList.length">
        <div class="title" v-if="!IsCurrentUser()">
          歌单<span>({{ userCreatedPlayList.length }})</span>
        </div>
        <div class="title" v-else>
          我创建的歌单<span>({{ userCreatedPlayList.length }})</span>
        </div>
        <div class="userDetail-playList-container">
          <song-sheet-item
            class="userDetail-playList-item"
            v-for="(item, index) in userCreatedPlayList"
            :key="item.id"
            :item="item"
            :type="'Detail'"
            :left="Number(index) % 6 === 0"
            :showCount="'true'"
          >
          </song-sheet-item>
        </div>
      </div>
      <div class="userDetail-collect" v-if="userCollectPlayList.length">
        <div class="title">
          收藏<span>({{ userCollectPlayList.length }})</span>
        </div>
        <div class="userDetail-playList-container">
          <song-sheet-item
            class="userDetail-playList-item"
            v-for="(item, index) in userCollectPlayList"
            :key="item.id"
            :item="item"
            :type="'Detail'"
            :left="Number(index) % 6 === 0"
            :showCount="'true'"
          >
          </song-sheet-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getUserPlayList, getUserDetail } from '@services/UserDetail';
import { city } from '@/assets/city';
import { mapState } from 'vuex';
import SvgIcon from '@components/svg/SvgIcon.vue';
import SongSheetItem from '@components/SongSheetItem.vue';

@Component({
  name: 'UserDetail',
  components: {
    SvgIcon,
    SongSheetItem,
  },
  computed: {
    ...mapState(['userId']),
  },
})
export default class Default extends Vue {
  userInfo: any = {};

  userId!: string;

  city = city;

  userCreatedPlayList: any = [];

  userCollectPlayList: any = [];

  isHideSignature = true;

  IsCurrentUser() {
    if (this.userInfo.userPoint) return this.userId === this.userInfo.userPoint.userId;
    return false;
  }

  async mounted() {
    await this.getData();
  }

  @Watch('$route')
  async getData() {
    this.userInfo = {};
    this.userCreatedPlayList = [];

    this.userCollectPlayList = [];

    const userDetail = await getUserDetail(this.$route.params.uid);
    this.userInfo = userDetail.data;
    const res = await getUserPlayList(this.$route.params.uid);

    const userPlayList = res.data.playlist;

    this.userCreatedPlayList = userPlayList.filter(
      (item: any) => item.userId === Number(this.$route.params.uid),
    );
    this.userCollectPlayList = userPlayList.filter(
      (item: any) => item.userId !== Number(this.$route.params.uid),
    );

    console.log(this.userCreatedPlayList, this.userCollectPlayList);
  }
  // mounted() { }
}
</script>

<style scoped lang="scss">
.userDetail {
  padding: 30px;
  overflow-y: auto;
  height: calc(100vh - 135px);
  box-sizing: border-box;
  &-top {
    display: flex;
  }
  &-avatar {
    width: 185px;
    height: 185px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    border-radius: 50%;
  }
  &-info {
    flex: 1;
    margin-left: 20px;
    &-name {
      font-size: 20px;
      font-weight: 700;
    }
    &-detail {
      position: relative;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      .detailContainer {
        display: flex;
        align-items: center;
      }
      .operation {
        display: flex;
        margin-bottom: 5px;
      }
      &-vip {
        width: 30px;
        height: 20px;
        margin-right: 5px;
      }
      &-level {
        display: flex;
        justify-content: center;
        // width: 20px;
        font-size: 12px;
        height: 14px;
        padding: 2px 7px;
        background-color: #f0f0f0;
        border-radius: 20px;
      }
    }
    &-list {
      display: flex;
      height: 70px;
      width: 100%;
      align-items: center;
      justify-content: flex-start;
      border-top: 1px solid #e5e5e5;
      .listitem {
        cursor: pointer;
        font-size: 19px;
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #373737;
        &:hover {
          color: #000;
        }
        &:first-child {
          padding-left: 0;
        }
        .itemTitle {
          margin-top: 5px;
          font-size: 13px;
          cursor: pointer;
        }
      }
    }
    &-follows {
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 1px;
        height: 30px;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        background-color: #e6e6e6;
      }
      &::after {
        content: '';
        position: absolute;
        width: 1px;
        height: 30px;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        background-color: #e6e6e6;
      }
    }
    &-city,
    &-network,
    &-signature {
      margin-top: 10px;
      font-size: 13px;
      color: #676767;
    }
    &-signature {
      width: 95%;
      position: relative;
      white-space: break-spaces;
      line-height: 28px;
      .icon {
        position: absolute;
        right: 0px;
        top: 0px;
        font-size: 20px;
        color: #999999 !important;
        cursor: pointer;
      }
      &.hide {
        position: relative;
        width: 95%;
        // height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        // line-height: 20px;
        white-space: break-spaces;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }

    &-city {
      font-size: 12px;
      margin: 0;
    }
  }

  &-body {
    margin-top: 40px;
    .title {
      font-size: 16px;
      font-weight: 600;
      margin-top: 20px;
      span {
        margin-left: 6px;
        font-size: 12px;
        color: #9f9f9f;
      }
    }
  }
  &-playList {
    &-container {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
