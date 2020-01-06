import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login'
import Logout from '../views/auth/Logout'
import Acts from '../components/Acts'
import common from '../common';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Login
    },
    {
        path: '/acts',
        name: 'act',
        component: Acts,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    let sessionCookie = common.getSessionCookie();

    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log('to requiresAuth? : ' + to.matched.some(record => record.meta.requiresAuth));

        if (sessionCookie) {
            let session = JSON.parse(sessionCookie);
            let user = session['user'];

            if (user) {
                next();
            } else {
                next('/login')
            }

            // TODO: where the check for isAdmin might come from

            // let user = JSON.parse(VueCookie.get('user'));
            // if (to.matched.some(record => record.meta.is_admin)) {
            //     if (user.is_admin == 1) {
            //         next()
            //     } else {
            //         next('userboard')
            //     }
            // } else {
            //     next()
            // }
            //
            // return
        }
    } else {
        next();
    }
});

export default router
