import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachesDetails from './pages/coaches/CoachesDetails.vue';
import CoachesRegistration from './pages/coaches/CoachesRegistration.vue';
import CoachesContact from './pages/requests/CoachesContact.vue';
import CoachesRequests from './pages/requests/CoachesRequests.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';

import store from './store/index.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachesDetails,
            props: true, // this will pass the path dynamic content as a propb. In this case the 'id'
            children: [
                { path: 'contact', component: CoachesContact }, // /coaches/[coachId]/contact
            ],
        },
        { path: '/register', component: CoachesRegistration, meta: { requiresAuth: true } },
        { path: '/requests', component: CoachesRequests, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresNoAuth: true } },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth'); // stopping the route and redirecting to auth
    } else if (to.meta.requiresNoAuth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
});

export default router;
