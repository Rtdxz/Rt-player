import request from 'xhr-axios';

export const sendComment = (params: any) => request({
  method: 'get',
  url: '/comment',
  params,
});
