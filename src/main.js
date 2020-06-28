import Vue from 'vue'
import App from './App.vue'
import './assets/css/styles.css'
import router from './router'
import firebase from 'firebase'
import './components/firebaseInit'

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user =>  {
  if (user) {
    console.log('User is signed in.', user)
  } else {
    console.log('No user is signed in.')
  }
});

const vm = new Vue({
  router,
  render: h => h(App)
})

vm.$mount('#app')
