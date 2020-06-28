<template>
  <div>
    <h1
      class="text-center p-3 container-fluid header-text mb-0"
      style="background-color: #e6f6fd;"
    >CAPITAL CAMPAIGN</h1>
    <div class="container">
      <div class="p-text mt-2">
        <p>Each year, there are more animals in need of homes than there are homes available to adopt them. As demand for our services continue to grow, the Humane Society is pleased to offer naming opportunities as a way to help homeless pets in our community.</p>
        <p>
          You can choose to feature your name or the name of a beloved person or pet on any of the available locations.
          Your generosity will provide shelter, quality medical care, and homes for many animals that may never have had a chance without your help.
        </p>

        <p>To discuss naming opportunities, please contact Jane Doe, President of Humane Society, at 555.123.4567 or email. You may also stop in person.</p>
        <br />
      </div>
      <router-link
        to="/new-name-opp"
        v-if="isLoggedIn"
        class="btn btn-secondary mb-3"
      >Add Naming Oppurtunity</router-link>
      <h1 v-show="loading" class="text-center">Loading...</h1>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Naming Oppurtunity</th>
            <th scope="col">Cost</th>
            <th scope="col" v-if="isLoggedIn">Edit</th>
          </tr>
        </thead>
        <tbody v-for="namingOpp in capitalCampaign" v-bind:key="namingOpp.id">
          <tr
            v-bind:class="{'text-success' : namingOpp.isPaid == 'Yes', 'line-through' : namingOpp.isPaid == 'Yes'}"
          >
            <td>{{namingOpp.name}}</td>
            <td>${{namingOpp.price}}</td>
            <router-link
              class="btn mt-1 edit-btn"
              v-if="isLoggedIn"
              v-bind:to="{name: 'view-name-opp', params: {capitalCampaignId: namingOpp.capitalCampaignId}}"
            >
              View
              <i class="fas fa-search ml-1"></i>
            </router-link>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "../firebaseInit";
export default {
  name: "capital-campaign",
  data() {
    return {
      capitalCampaign: [],
      isLoggedIn: false,
      loading: true,
      isPaid: null
    };
  },
  created() {
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
            name: doc.data().name,
            price: doc.data().price,
            isPaid: doc.data().isPaid
          };
          this.capitalCampaign.push(data);
        });
      });

    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
}
.edit-btn {
  color: var(--primary-btn-color);
}
.line-through {
  text-decoration: line-through;
}
@media only screen and (min-width: 600px) {
  .p-text {
    margin: 0 auto;
    max-width: 600px;
  }
}
</style>