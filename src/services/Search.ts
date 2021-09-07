import request from 'xhr-axios';

export const getHotSearch = () => request({
  method: 'get',
  url: '/search/hot/detail',
});

export const Search = (params: any) => request({
  method: 'get',
  url: '/cloudsearch',
  params,
});

export const getSearchSuggest = (keywords: string) => request({
  method: 'get',
  url: '/search/suggest',
  params: {
    keywords,
  },
});

export const getSongDetail = (ids: string) => request({
  method: 'get',
  url: '/song/detail',
  params: {
    ids,
  },
});
