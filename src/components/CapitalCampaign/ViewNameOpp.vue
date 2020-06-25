<template>
  <div class="container">
    <modal v-model="modalOpen" v-on:deleteItem="deleteNameOpp"></modal>
    <div class="card border mt-3 shadow p-3 mb-5 bg-white rounded col-xs-12 max">
      <div class="caption">
        <br />
        <ul class="pl-2 pt-2 pr-2 pb-0">
          <li>
            <strong>Name:</strong>
            {{name}}
          </li>
          <li>
            <strong>Price:</strong>
            {{price}}
          </li>
          <li>
            <strong>ID:</strong>
            {{capitalCampaignId}}
          </li>
          <li>
            <strong>Paid:</strong>
            {{isPaid}}
          </li>
        </ul>
      </div>
      <div>
        <router-link to="/capital-campaign" class="btn btn-secondary m-1">Back</router-link>
        <button v-if="isLoggedIn" @click="showModal" class="btn btn-danger m-1">Delete</button>
        <router-link
          class="btn btn-warning m-1"
          v-if="isLoggedIn"
          v-bind:to="{name: 'edit-name-opp', params: {'cc-id': capitalCampaignId}}"
        >Edit</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebaseInit";
import Modal from "../Modal"
export default {
  components: {
    Modal
  },
  name: "view-name-opp",
  data() {
    return {
      capitalCampaignId: null,
      name: null,
      price: null,
      isPaid: null,
      modalOpen: false
    };
  },
  beforeRouteEnter(to, from, next) {
    firebase
      .firestore()
      .collection("capitalCampaign")
      .where("capitalCampaignId", "==", to.params.capitalCampaignId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.capitalCampaignId = doc.data().capitalCampaignId;
            vm.name = doc.data().name;
            vm.price = doc.data().price;
            vm.isPaid = doc.data().isPaid;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    fetchData() {
      firebase
        .firestore()
        .collection("capitalCampaign")
        .where("capitalCampaignId", "==", this.$route.params.capitalCampaignId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.capitalCampaignId = doc.data().capitalCampaignId;
            this.name = doc.data().name;
            this.price = doc.data().price;
            this.isPaid = doc.data().isPaid;
          });
        });
    },
    showModal() {
      this.modalOpen = !this.modalOpen;
    },
    deleteNameOpp() {
      firebase
        .firestore()
        .collection("capitalCampaign")
        .where("capitalCampaignId", "==", this.$route.params.capitalCampaignId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
            this.$router.push("/capital-campaign");
          });
        });
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

.max {
  max-width: 500px;
  margin: 0 auto;
}

li {
  border-bottom: 1px solid lightgray;
}
</style>