import request from 'xhr-axios';

export const getTopListDetail = () => request({
  method: 'get',
  url: '/toplist/detail',
});
