import request from 'xhr-axios';

export const getPlayListDetailInfo = (id: string) => request({
  method: 'get',
  url: '/playlist/detail',
  params: {
    id,
    cookie: sessionStorage.getItem('cookie'),
  },
});

export const getPlayListContent = (ids: string) => request({
  method: 'get',
  url: '/song/detail',
  params: {
    ids,
  },
});

export const getMusicUrl = (id: string) => request({
  method: 'get',
  url: '/song/url',
  params: {
    id,
  },
});

export const getComment = (params: any) => request({
  method: 'get',
  url: '/comment/playlist',
  params,
});
