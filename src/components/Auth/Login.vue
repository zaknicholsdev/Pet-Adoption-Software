<template>
  <div class="login container">
    <SuccessModal v-model="showModal"></SuccessModal>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        >
        <small
          id="emailHelp"
          class="form-text text-muted"
        >Enter your admin credentials.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="password"
        >
      </div>
      <button v-on:click="login" class="btn other-btn-color">Submit</button>
      <router-link to="/" class="btn btn-secondary text-white">Back Home</router-link>
    </form>
  </div>
</template>

<script>
import firebase from '../firebaseInit'
import SuccessModal from './SuccessModal'
export default {
  components: {
    SuccessModal
  },
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      showModal: false
    };
  },
  methods: {
    login(event) {
        firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.showModal = !this.showModal
          setTimeout(() => {
            this.$router.push('/')
          }, 1500)
        }, err => {
            alert(err.message);
        }
        );
        event.preventDefault();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.other-btn-color {
  background-color: #054864;
  color: white;
}
</style>