<template>
  <div>
    <nav class="navbar navbar-expand-xl navbar-light secondary-bg-color">
      <router-link to="/" class="navbar-brand color">
        <span>
          <img src="../../assets/logo.png" class="img-fluid" height="50" width="50" />
          <span>Adopty</span>
        </span>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fas fa-paw mr-1"></i>Adoptable Pets
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/dogs" class="dropdown-item">
                <a>
                  <i class="fas fa-dog mr-1"></i>Dogs
                </a>
              </router-link>
              <div class="dropdown-divider"></div>
              <router-link to="/cats" class="dropdown-item">
                <a>
                  <i class="fas fa-cat mr-1"></i>Cats
                </a>
              </router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link to="/donate" class="nav-link">
              <i class="fas fa-heart mr-1"></i>Donate
            </router-link>
          </li>
          <li class="nav-item">
            <router-link  v-if="isLoggedIn" to="/dashboard" class="nav-link">
              <i class="fas fa-chart-line mr-1"></i>Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/capital-campaign" class="nav-link">
              <i class="fas fa-comment-dollar mr-1"></i>Capital Campaign
            </router-link>
          </li>
          <li class="nav-item">
            <div v-if="isLoggedIn" v-on:click="logout" class="pointer nav-link">
              <i class="fas fa-sign-out-alt mr-1"></i>Logout
            </div>
          </li>
          <li class="nav-item">
            <div v-if="isLoggedIn" class="nav-link">Welcome Back, {{currentUser}}</div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>




<script>
import firebase from "../firebaseInit";
export default {
  name: "navbar",

  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>