import request from 'xhr-axios';

export const getNewestMusic = () => request({
  method: 'get',
  url: '/top/song',
  params: {
    type: 0,
  },
});
