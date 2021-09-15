import request from 'xhr-axios';

export const getTopListDetail = () => request({
  method: 'get',
  url: '/toplist/detail',
});

export const getSongDetail = (ids: string) => request({
  method: 'get',
  url: '/song/detail',
  params: {
    ids,
  },
});
