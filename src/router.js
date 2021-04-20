import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachesDetails from './pages/coaches/CoachesDetails.vue';
import CoachesRegistration from './pages/coaches/CoachesRegistration.vue';
import CoachesContact from './pages/requests/CoachesContact.vue';
import CoachesRequests from './pages/requests/CoachesRequests.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachesDetails,
            children: [
                { path: 'contact', component: CoachesContact }, // /coaches/[coachId]/contact
            ],
        },
        { path: '/register', component: CoachesRegistration },
        { path: '/requests', component: CoachesRequests },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

export default router;
