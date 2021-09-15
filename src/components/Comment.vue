<template>
  <div class="comment" :class="{ withoutPadding: !hasPadding }">
    <el-input
      type="textarea"
      v-model="commentInfo"
      maxlength="140"
      show-word-limit
      resize="none"
      rows="4"
      class="commentinput"
    >
    </el-input>
    <div class="comment-button button" @click="sendComment()">
      评论
    </div>

    <div
      class="title"
      v-if="comment.hotComments && comment.hotComments.length > 0"
    >
      精彩评论
    </div>
    <comment-item
      :item="item"
      class="comment_item"
      v-for="item in comment.hotComments"
      :key="item.id"
    >
    </comment-item>
    <div
      v-show="comment.moreHot"
      style="
          display: inline-block;
          margin-left: 50%;
          margin-top: 3%;
          transform: translateX(-50%);
          border-radius: 20px;
          border: 1px solid #d8d8d8;
          padding: 5px 15px;
          cursor: pointer;
        "
    >
      更多精彩评论>
    </div>

    <div class="title">最新评论</div>
    <comment-item
      :item="item"
      class="comment_item"
      v-for="item in comment.comments"
      :key="item.id"
    >
    </comment-item>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="Math.ceil(comment.total / 20) * 10"
      :pager-count="9"
      class="msg-pagination-container"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import CommentItem from '@components/CommentItem.vue';
import { sendComment } from '@services/Comment';

@Component({
  name: 'Comment',
  components: {
    CommentItem,
  },
})
export default class Default extends Vue {
  commentInfo = '';

  changePage(page: number) {
    this.$emit('changeCommentPage', page - 1);
    // console.log(page);
  }

  async sendComment() {
    const params = {
      t: 1,
      type: this.type,
      id: this.id,
      content: this.commentInfo,
      cookie: sessionStorage.getItem('cookie'),
    };
    const res = await sendComment(params);
    console.log(res.data);
    if (res.data.code === 200) {
      this.$message({ type: 'success', message: '评论成功，刷新页面更新' });
    } else {
      this.$message({ type: 'error', message: '评论失败' });
    }
  }

  @Prop()
  comment!: any;

  @Prop()
  type!: string;

  @Prop()
  id!: number;

  @Prop({ default: true })
  hasPadding!: boolean;
  // created() { }
  // mounted() { }
}
</script>

<style scoped lang="scss">
// @import './index.scss';
.comment {
  position: relative;
  padding: 10px 30px 50px;
  div {
    font-size: 12px;
  }
  .title {
    font-weight: 600;
    font-size: 15px;
    margin: 80px 0 20px;
  }

  &-button {
    position: absolute;
    top: 120px;
    right: 20px;
    width: 60px;
  }

  &_item {
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
}
.withoutPadding {
  padding: 0;
}
</style>
