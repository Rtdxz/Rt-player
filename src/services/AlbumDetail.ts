import request from 'xhr-axios';

export const getAlbumDetailInfo = (id: string) => request({
  method: 'get',
  url: '/album',
  params: {
    id,
    cookie: sessionStorage.getItem('cookie'),
  },
});

export const getAlbumContent = (ids: string) => request({
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
  url: '/comment/album',
  params,
});
