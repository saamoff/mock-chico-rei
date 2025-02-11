import { createRouter, createWebHistory } from 'vue-router'
import ChallengeOne from '../views/ChallengeOne.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'challengeone',
      component: ChallengeOne,
    },
    // {
    //   path: '/1',
    //   name: 'challengetwo',
    //   component: ChallengeTwo ,
    // },
    // {
    //   path: '/2',
    //   name: 'challengethree',
    //   component: ChallengeThree ,
    // },
    // {
    //   path: '/3',
    //   name: 'challengefour',
    //   component: ChallengeFour ,
    // },
    
  ],
})

export default router
