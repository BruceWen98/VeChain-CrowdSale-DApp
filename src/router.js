import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from '@/store.js';
import dataStore from '@/store/dataStore.js';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue'),
            meta: {
                authRequired: true
            }
        },
        {
            path: '/marketplace',
            name: 'marketplace',
            component: () => import('./views/Marketplace.vue')
        },
        {
            path: '/newsale',
            name: 'newsale',
            component: () => import('./views/Newsale.vue'),
            meta: {
                saleAuthRequired: true
            }
        },
        {
            path: '/history',
            name: 'history',
            component: () => import('./views/History.vue')
        },
        {
            path: '/howitworks',
            name: 'Howitworks',
            component: () => import('./views/Howitworks.vue')
        },
        {
            path: '/sign-in',
            name: 'signin',
            component: () => import('./views/Signin.vue')
        },
        {
            path: '/join',
            name: 'join',
            component: () => import('./views/Join.vue')
        },
        {
            path: '/view',
            name: 'view',
            component: () => import('./views/View.vue')
        },
        {
            path: '/authorise-sale',
            name: 'authorisesale',
            component: () => import('./views/AuthoriseSale.vue')
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('./views/Test.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (!store.state.isAuthenticated) {
            next({
                path: '/sign-in'
            });
        } else {
            next();
        }
    } else {
        next();
    }
    if (to.matched.some(record => record.meta.saleAuthRequired)) {
        if (!store.state.isAuthenticated) {
            next({
                path: '/sign-in'
            });
        } else if (!dataStore.state.user.authorisedSeller) {
            next({
                path: '/about'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
