import request from 'AXIOS';

export const search = (data: string) => request({
  method: 'get',
  url: '/search',
  params: {
    keywords: data,
  },
});
