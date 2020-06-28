<template>
  <div id="animals">
    <h1
      class="text-center p-3 container-fluid header-text mb-0 bg-color"
    >DASHBOARD</h1>

    <div class="p-text mt-2 container">
      <p class="text-center">Welcome back, {{currentUser}}.</p>
    </div>
    <h1 v-if="loading" class="text-center">Loading...</h1>

    <div else class="container">
      <h2 class="text-center mt-1" v-show="!loading" id="cats">Pet Inventory</h2>
      <div class="row text-center">
        <div class="col-6">
          <router-link to="/new-cat" class="pet-link" v-if="isLoggedIn">
            Add Cat
            <i class="fas fa-plus ml-1"></i>
          </router-link>
          <h4 class="mt-3">Cats</h4>

          <div v-for="cat in cats" v-bind:key="cat.id" class="text-center">
            <ul>
              <li>
                <strong>
                  <div class="p-1">
                    {{cat.name}}
                    <router-link
                      class="ml-1 pet-link"
                      v-bind:to="{name: 'view-cat', params: {catId: cat.catId}}"
                    >
                    <br />
                      View
                      <i class="fas fa-search ml-1"></i>
                    </router-link>
                  </div>
                </strong>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-6">
          <div>
            <router-link to="/new-dog" class="pet-link" v-if="isLoggedIn">
              Add Dog
              <i class="fas fa-plus ml-1"></i>
            </router-link>
            <h4 class="mt-3">Dogs</h4>
          </div>

          <div v-for="dog in dogs" v-bind:key="dog.id" class="text-center">
            <ul>
              <li>
                <strong>
                  <div class="p-1">
                    {{dog.name}}
                    <router-link
                      class="ml-1 pet-link"
                      v-bind:to="{name: 'view-dog', params: {dogId: dog.dogId}}"
                    >
                    <br />
                      View
                      <i class="fas fa-search ml-1"></i>
                    </router-link>
                  </div>
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "./firebaseInit";
export default {
  name: "cats",
  data() {
    return {
      cats: [],
      dogs: [],
      capitalCampaign: [],
      isLoggedIn: false,
      currentUser: false,
      loading: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }

    this.loading = true;

    firebase
      .firestore()
      .collection("cats")
      .orderBy("name")
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            catId: doc.data().catId,
            name: doc.data().name
          };
          this.cats.push(data);
        });
      });

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
            name: doc.data().name
          };
          this.dogs.push(data);
        });
      });

    firebase
      .firestore()
      .collection("capitalCampaign")
      .orderBy("capitalCampaignId")
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            capitalCampaignId: doc.data().capitalCampaignId,
            name: doc.data().name
          };
          this.capitalCampaign.push(data);
        });
      });
  }
};
</script>

<style scoped>
ul {
  padding-left: 0px;
  margin-bottom: 0px;
  list-style: none;
}

li {
  border-top: 1px solid lightgray;
}

.pet-link {
  text-decoration: none;
  color: var(--primary-btn-color);
}
</style>