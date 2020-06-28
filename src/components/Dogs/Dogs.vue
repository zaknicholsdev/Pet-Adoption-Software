<template>
  <div id="animals">
    <h1
      class="text-center p-3 container-fluid header-text mb-0"
      style="background-color: #e6f6fd;"
    >ADOPTABLE DOGS</h1>

    <div class="p-text mt-2 container">
      <p>
        These dogs are currently up for adoption. This page is updated regularly to keep up to date. If you have any questions
        please stop by or give us a phone call.
      </p>
    </div>
    <h1 v-if="loading" class="text-center">Loading...</h1>

    <div else class="container">
      <h2 class="text-center mt-1" v-show="!loading">Dogs</h2>
      <router-link to="/new-dog" v-if="isLoggedIn" class="btn btn-secondary m-2">Add Dog</router-link>
      <div class="row">
        <div v-for="dog in dogs" v-bind:key="dog.id" class="col-xs-12 col-md-4 mb-5">
          <div class="card border mt-3 shadow bg-white rounded">
            <div class="caption">
              <img
                v-bind:style="{ backgroundImage: 'url(' + dog.imageUrl + ')' }"
                class="card-img-top"
              />
              <br />
              <ul class="p-2 text-center">
                <li>
                  <strong>
                    <h4>{{dog.name}}</h4>
                  </strong>
                </li>
              </ul>
              <div class="text-center">
                <router-link
                  class="btn primary-btn-color text-white"
                  v-bind:to="{name: 'view-dog', params: {dogId: dog.dogId}}"
                >View Dog</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebaseInit";
export default {
  name: "dogs",
  data() {
    return {
      dogs: [],
      isLoggedIn: false,
      loading: true,
      imageUrl: ""
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
    }

    firebase
      .firestore()
      .collection("dogs")
      .orderBy("name")
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            dogId: doc.data().dogId,
            name: doc.data().name,
            imageUrl: doc.data().imageUrl
          };
          this.dogs.push(data);
        });
      });
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
.border {
  height: 100%;
  width: 100%;
}
@media only screen and (min-width: 600px) {
  .p-text {
    margin: 0 auto;
    max-width: 600px;
  }
}
.rounded {
  border-radius: 30px !important;
}
.card-img-top {
  border-top-left-radius: 30px !important;
  border-top-right-radius: 30px !important;
}
img {
  width: 100%;
  padding-bottom: 100%;
  background: no-repeat center/cover;
}
</style>