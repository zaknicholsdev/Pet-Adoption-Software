import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import EditCat from '../components/Cats/EditCat'
import EditDog from '../components/Dogs/EditDog'
import ViewCat from '@/components/Cats/ViewCat'
import ViewDog from '@/components/Dogs/ViewDog'
import NewCat from '../components/Cats/NewCat'
import NewDog from '@/components/Dogs/NewDog'
import Login from '@/components/Auth/Login'
import Home from '@/components/Layout/Home'
import Donate from '@/components/Misc/Donate'
import CapitalCampaign from '@/components/CapitalCampaign/CapitalCampaign'
import NewNameOpp from '@/components/CapitalCampaign/NewNameOpp'
import EditNameOpp from '@/components/CapitalCampaign/EditNameOpp'
import ViewNameOpp from '@/components/CapitalCampaign/ViewNameOpp'
import Contact from '@/components/Layout/Contact'
import Dogs from '@/components/Dogs/Dogs'
import Cats from '@/components/Cats/Cats'
import Restricted from '@/components/Auth/Restricted'

Vue.use(Router)

const scrollBehavior = function() {
    return { x: 0, y: 0 }
}

const router = new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/dogs',
      name: 'dogs',
      component: Dogs
    },
    {
      path: '/cats',
      name: 'cats',
      component: Cats
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new-dog',
      name: 'new-dog',
      component: NewDog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-dog/:dogId',
      name: 'edit-dog',
      component: EditDog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dog/:dogId',
      name: 'view-dog',
      component: ViewDog
    },
    {
      path: '/new-cat',
      name: 'new-cat',
      component: NewCat,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-cat/:catId',
      name: 'edit-cat',
      component: EditCat,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cat/:catId',
      name: 'view-cat',
      component: ViewCat
    },
    {
      path: '/donate',
      name: 'donate',
      component: Donate
    },
    {
      path: '/capital-campaign',
      name: 'capital-campaign',
      component: CapitalCampaign
    },
    {
      path: '/new-name-opp',
      name: 'new-name-opp',
      component: NewNameOpp,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-name-opp/:capitalCampaignId',
      name: 'edit-name-opp',
      component: EditNameOpp,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/view-name-opp/:capitalCampaignId',
      name: 'view-name-opp',
      component: ViewNameOpp,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/restricted',
      name:'restricted',
      component: Restricted
    }
  ]
})

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to dashboard
      next({
        path: '/restricted',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if user IS logged IN
    if (firebase.auth().currentUser) {
      // Go to home
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router; 