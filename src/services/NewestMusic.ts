import request from 'xhr-axios';

export const getNewestMusic = (data?: any) => request({
  method: 'get',
  url: '/top/song',
  params: {
    type: 0,
  },
});
