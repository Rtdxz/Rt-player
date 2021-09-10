import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
// import Home from '@views/Home.vue';
import Find from '@views/find/Find.vue';
import Individuation from '@views/find/Individuation.vue';
import SongSheet from '@views/find/SongSheet.vue';
import TopList from '@views/find/TopList.vue';
import Artist from '@views/find/Artist.vue';
import NewestMusic from '@views/find/NewestMusic.vue';

import PlayListDetail from '@views/PlayListDetail.vue';

import SearchPage from '@views/SearchPage/SearchPage.vue';
import SearchBySong from '@views/SearchPage/SearchBySong.vue';

import SearchByArtist from '@views/SearchPage/SearchByArtist.vue';
import SearchByAlbum from '@views/SearchPage/SearchByAlbum.vue';
import SearchByMV from '@views/SearchPage/SearchByMV.vue';
import SearchByPlayList from '@views/SearchPage/SearchByPlayList.vue';
import SearchByUser from '@views/SearchPage/SearchByUser.vue';

import UserDetail from '@views/UserDetail.vue';
import ArtistDetail from '@views/ArtistDetail.vue';
import MVDetail from '@views/MVDetail.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/find',
  },
  {
    path: '/find',
    name: 'find',
    component: Find,
    children: [
      {
        path: '',
        redirect: 'Individuation',
      },
      {
        path: 'Individuation',
        component: Individuation,
      },
      {
        path: 'SongSheet',
        component: SongSheet,
      },
      {
        path: 'TopList',
        component: TopList,
      },
      {
        path: 'Artist',
        component: Artist,
      },
      {
        path: 'NewestMusic',
        component: NewestMusic,
      },
    ],
  },
  {
    path: '/PlayListDetail/:id',
    name: 'PlayListDetail',
    component: PlayListDetail,
  },
  {
    path: '/UserDetail/:uid',
    name: 'UserDetail',
    component: UserDetail,
  },
  {
    path: '/ArtistDetail/:id',
    name: 'ArtistDetail',
    component: ArtistDetail,
  },
  {
    path: '/MVDetail/:id',
    name: 'MVDetail',
    component: MVDetail,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@views/About.vue'),
  },
  {
    path: '/SearchPage',
    name: 'SearchPage',
    component: SearchPage,
    children: [
      {
        path: '',
        redirect: 'SearchBySong',
      },
      {
        path: 'SearchBySong',
        component: SearchBySong,
      },
      {
        path: 'SearchByArtist',
        component: SearchByArtist,
      },
      {
        path: 'SearchByAlbum',
        component: SearchByAlbum,
      },
      {
        path: 'SearchByMV',
        component: SearchByMV,
      },
      {
        path: 'SearchByPlayList',
        component: SearchByPlayList,
      },
      {
        path: 'SearchByUser',
        component: SearchByUser,
      },
    ],
  },
];

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any): any {
  const s: any = originalPush.call(this, location);
  return s.catch((err: any) => err);
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
