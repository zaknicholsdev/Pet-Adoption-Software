<template>
  <div id="edit-name-opp" class="container">
    <form @submit.prevent="updateNameOpp">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="name" placeholder="Enter Name" />
      </div>
      <div class="form-group">
        <label>Price</label>
        <input type="text" class="form-control" v-model="price" placeholder="Enter Price" />
      </div>
      <div class="form-group">
        <label>Naming Oppurtunity ID</label>
        <input disabled type="text" class="form-control" v-model="capitalCampaignId" placeholder="Enter ID" />
      </div>
      <div class="form-group">
        <label for="inputState">Paid</label>
        <select v-model="isPaid" class="form-control">
          <option selected disabled>Choose...</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <button type="submit" class="btn primary-btn-color text-white">Submit</button>
      <router-link to="/capital-campaign" class="btn btn-secondary">Cancel</router-link>
    </form>
  </div>
</template>

<script>
import firebase from "../firebaseInit";
export default {
  name: "edit-name-opp",
  data() {
    return {
      capitalCampaignId: null,
      name: null,
      price: null,
      isPaid: null
    };
  },
  beforeRouteEnter(to, from, next) {
    firebase.firestore().collection("capitalCampaign")
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
  methods: {
    fetchData() {
      firebase.firestore().collection("capitalCampaign")
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
    updateNameOpp() {
      firebase.firestore().collection("capitalCampaign")
        .where("capitalCampaignId", "==", this.$route.params.capitalCampaignId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                capitalCampaignId: this.capitalCampaignId,
                name: this.name,
                price: this.price,
                isPaid: this.isPaid
              })
              .then(() => {
                this.$router.push({
                  name: "view-name-opp",
                  params: { capitalCampaignId: this.capitalCampaignId }
                });
              });
          });
        });
    }
  }
};
</script>

<style scoped>

</style>