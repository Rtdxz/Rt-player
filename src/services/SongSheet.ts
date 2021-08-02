import request from 'xhr-axios';

export const getAllPlayList = (page: number) => request({
  method: 'get',
  url: '/top/playlist',
  params: {
    limit: 100,
    offset: page * 100,
  },
  //   params: {
  //     order:
  //       // 可选值为 'new' 和 'hot', 分别对应最新和最热, 默认为 'hot'

  //     cat:
  //       // 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部", 可从歌单分类接口获取(/ playlist / catlist)

  // limit:
  // // 取出歌单数量, 默认为 50

  //       offset:
  //     // 偏移数量, 用于分页, 如: (评论页数 - 1) * 50, 其中 50 为 limit 的值
  //   },
});
