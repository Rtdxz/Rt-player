import request from 'xhr-axios';

export const getPlayListDetailInfo = (id: string) => request({
  method: 'get',
  url: '/playlist/detail',
  params: {
    id,
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
