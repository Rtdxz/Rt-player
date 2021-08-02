import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
// import Home from '@views/Home.vue';
import Find from '@views/find/Find.vue';
import Individuation from '@views/find/Individuation.vue';
import SongSheet from '@views/find/SongSheet.vue';
import TopList from '@views/find/TopList.vue';
import Singer from '@views/find/Singer.vue';
import NewestMusic from '@views/find/NewestMusic.vue';

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
        path: 'Singer',
        component: Singer,
      },
      {
        path: 'NewestMusic',
        component: NewestMusic,
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
