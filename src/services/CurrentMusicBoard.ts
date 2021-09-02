import request from 'xhr-axios';

export const getComment = (params: any) => request({
  method: 'get',
  url: '/comment/music',
  params,
});

export const getSongLyric = (id: string) => request({
  method: 'get',
  url: '/lyric',
  params: {
    id,
  },
});
