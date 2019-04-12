import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/hotsearch',
    component: Layout,
    redirect: '/hotsearch/index',
    name: 'hotsearch',
    meta: { title: '热搜', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/hotsearch/index'),
        meta: { title: 'Index', icon: 'documentation' }
      },
      {
        path: 'hotsearch_add',
        name: 'Hotsearch_add',
        component: () => import('@/views/hotsearch/hotsearch_add'),
        meta: { title: 'Hotsearch_add', icon: 'excel' }
      }
    ]
  },

  {
    path: '/vipjx',
    component: Layout,
    redirect: '/vipjx/index',
    name: 'vipjx',
    meta: { title: 'VIp解析接口', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/vipjx/index'),
        meta: { title: 'Index', icon: 'documentation' }
      },
      {
        path: 'vipjx_add',
        name: 'vipjx_add',
        component: () => import('@/views/vipjx/vipjx_add'),
        meta: { title: 'vipjx_add', icon: 'excel' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'edittable',
        name: 'EditTable',
        component: () => import('@/views/table/edittable'),
        meta: { title: 'EditTable', icon: 'documentation' }
      },
      {
        path: 'usetable',
        name: 'UseTable',
        component: () => import('@/views/table/usetable'),
        meta: { title: 'UseTable', icon: 'excel' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '录入', icon: 'form' }
      }
    ]
  },
  {
    path: '/linklist',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Linklist',
        component: () => import('@/views/form/linklist'),
        meta: { title: '网站列表', icon: 'excel' }
      }
    ]
  },
  {
    path: '/UploadExcel',
    component: Layout,
    children: [
      {
        path: 'uploadExcel',
        name: 'UploadExcel',
        component: () => import('@/views/excel/uploadExcel'),
        meta: { title: 'UploadExcel', icon: 'excel' }
      }
    ]
  },
  {
    path: '/Eo',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Eo',
        component: () => import('@/views/eo/index'),
        meta: { title: 'Eo', icon: 'excel' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
