<template>
  <div id="animals">
    <h1
      class="text-center p-3 container-fluid header-text mb-0"
      style="background-color: #e6f6fd;"
    >ADOPTABLE CATS</h1>

    <div class="p-text mt-2 container">
      <p>
        These cats are currently up for adoption. This page is updated regularly to keep up to date. If you have any questions
        please stop by or give us a phone call.
      </p>
    </div>
    <h1 v-if="loading" class="text-center">Loading...</h1>

    <div else class="container">
      <h2 class="text-center mt-1" v-show="!loading" id="cats">Cats</h2>
      <router-link to="/new-cat" v-if="isLoggedIn" class="btn btn-secondary m-2">Add Cat</router-link>
      <div class="row">
        <div v-for="cat in cats" v-bind:key="cat.id" class="col-xs-12 col-md-4 mb-5">
          <div class="card border mt-3 shadow bg-white rounded">
            <div class="caption">
              <img
                v-bind:src="cat.imageUrl"
                class="img-fluid card-img-top"
                width="500"
                height="500"
              />
              <br />
              <ul class="p-2 text-center">
                <li>
                  <strong>
                    <h4>{{cat.name}}</h4>
                  </strong>
                </li>
              </ul>
              <router-link
                class="btn other-btn-color m-3"
                v-bind:to="{name: 'view-cat', params: {catId: cat.catId}}"
              >View Cat</router-link>
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
  name: "cats",
  data() {
    return {
      cats: [],
      isLoggedIn: false,
      loading: true
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
    }

    firebase.firestore().collection("cats")
      .orderBy("name")
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            catId: doc.data().catId,
            name: doc.data().name,
            imageUrl: doc.data().imageUrl
          };
          this.cats.push(data);
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
.card-img-top {
  width: 500px;
  height: 300px;
  object-fit: cover;
}

.other-btn-color {
  background-color: #054864;
  color: white;
}
.rounded {
  border-radius: 30px !important;
}
.card-img-top {
  border-top-left-radius: 30px !important;
  border-top-right-radius: 30px !important;
}
</style>