import { createRouter, createWebHistory } from 'vue-router'
import ChallengeOne from '../views/ChallengeOne.vue'
import ChallengeTwo from '@/views/ChallengeTwo.vue'
import ChallengeThree from '@/views/ChallengeThree.vue'
import ShirtsContent from '@/components/productContent/shirts/ShirtsContent.vue'
import JumpersContent from '@/components/productContent/jumpers/JumpersContent.vue'
import MugsContent from '@/components/productContent/mugs/MugsContent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'challengeone',
      component: ChallengeOne,
    },
    {
      path: '/:id',
      name: 'challengetwo',
      component: ChallengeTwo,
      redirect: (to) => {
        return `/${to.params.id}/camisetas`
      },
      children: [
        {
          path: 'camisetas',
          component: ShirtsContent,
        },
        {
          path: 'moletons',
          component: JumpersContent,
        },
        {
          path: 'xicaras',
          component: MugsContent,
        },
      ],
    },
    {
      path: '/2',
      name: 'challengethree',
      component: ChallengeThree,
    },
    // {
    //   path: '/3',
    //   name: 'challengefour',
    //   component: ChallengeFour,
    // },
    // {
  ],
})

export default router
