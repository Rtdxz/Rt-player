<template>
  <div class="Individuation">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item
        v-for="item in banner.banners"
        :key="item"
        :style="{
          backgroundImage: `url(${item.imageUrl})`,
        }"
      >
        <h3 class="medium"></h3>
      </el-carousel-item>
    </el-carousel>

    <div class="privatecontent">
      <div class="privatecontent_title content_title">
        {{ privatecontent.name }}
        <svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
      <div class="privatecontent_content">
        <div
          class="privatecontent_content_item"
          v-for="item in privatecontent.result"
          :key="item.id"
        >
          <div
            class="privatecontent_content_item_pic"
            :style="{ backgroundImage: `url(${item.sPicUrl})` }"
          ></div>
          <div class="privatecontent_content_item_title">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <div class="recommandSongSheet">
      <div class="recommandSongSheet_title content_title">
        推荐歌单<svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
      <div class="recommandSongSheet_content">
        <div
          class="recommandSongSheet_content_item"
          v-for="item in recommandSongSheet.recommend.slice(0, 10)"
          :key="item.id"
        >
          <div
            class="recommandSongSheet_content_item_pic"
            :style="{ backgroundImage: `url(${item.picUrl})` }"
          ></div>
          <div class="recommandSongSheet_content_item_title">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="newestMusic">
      <div class="newestMusic_title content_title">
        最新音乐<svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
    </div>
    <div class="recommandMV">
      <div class="recommandMV_title content_title">
        推荐MV<svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
    </div>
    <div class="podcast">
      <div class="podcast_title content_title">
        播客<svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
    </div>
     <div class="listen">
      <div class="listen_title content_title">
        听听<svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
    </div>
    <div class="look">
      <div class="look_title content_title">
        看看<svg-icon type="right-arrow" class="icon"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

import { getPrivateContent, getRecommandSongSheet, getBanner } from '@services';
import { PrivateContent, RecommandSongSheet } from '@interface';

import SvgIcon from '@components/svg/SvgIcon.vue';

@Component({
  name: 'Default',
  components: {
    SvgIcon,
  },
})
export default class Default extends Vue {
  privatecontent: PrivateContent = {
    name: '',
    result: [],
    code: 0,
  };

  banner: any = {
    code: 0,
    banners: [],
  };

  recommandSongSheet: RecommandSongSheet = {
    code: 0,
    featureFirst: true,
    haveRcmdSongs: false,
    recommend: [],
  };

  @Watch('name')
  getWatchValue(newVal: string, oldVal: string) {
    console.log(newVal, oldVal);
  }

  @Prop({ default: 'default value' })
  propA!: string;

  async created() {
    const privatecontent = await getPrivateContent();
    this.privatecontent = privatecontent.data;
    const recommandSongSheet = await getRecommandSongSheet();
    this.recommandSongSheet = recommandSongSheet.data;
    const banner = await getBanner();
    this.banner = banner.data;

    console.log(this.banner);
  }

  mounted() {
    console.log('mounted');
  }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.el-carousel__item {
  border-radius: 10px;
  background-size: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.content_title {
  display: flex;
  align-items: center;
  font-weight: 1000;
  margin: 30px 0 10px;
  .icon {
    margin-left: 7px;
    width: 20px;
    height: 20px;
    color: rgb(76, 76, 76);
  }
}

.privatecontent {
  &_content {
    width: 100%;
    display: flex;
    &_item {
      &:first-child {
        padding-left: 0;
      }
      flex: 1;
      padding: 5px;
      &_pic {
        height: 1.30719rem;
        // width: 2.30719rem;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center center;
        border-radius: 7px;
      }
      &_title {
        margin-top: 10px;
        font-size: 14px;
      }
    }
  }
}

.recommandSongSheet {
  &_content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    &_item {
      padding: 5px;
      &:first-child {
        padding-left: 0;
      }
      width: 20%;
      box-sizing: border-box;
      &_pic {
        height: 1.30719rem;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center center;
        border-radius: 7px;
      }
      &_title {
        margin-top: 10px;
        font-size: 14px;
      }
    }
  }
}

.Individuation {
  height: 1000px;
}

@media screen and (max-width: 1250px) {
  .privatecontent {
    &_content {
      &_item {
        &_pic {
          // width: 300px;
          height: 163px;
          border-radius: 7px;
        }
      }
    }
  }
}
</style>
