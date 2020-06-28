<template>
  <div id="new-cat" class="container">
    <form @submit.prevent="saveNameOpp">
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
          <option disabled>Choose...</option>
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
import { uuid } from "vue-uuid";

export default {
  name: "new-name-opp",
  data() {
    return {
      capitalCampaignId: uuid.v4(),
      name: null,
      price: null,
      isPaid: "No"
    };
  },
  methods: {
    saveNameOpp() {
      firebase.firestore().collection("capitalCampaign")
        .add({
          capitalCampaignId: this.capitalCampaignId,
          name: this.name,
          price: this.price,
          isPaid: this.isPaid
        })
        .then(() => {
          this.$router.push("/capital-campaign");
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>

</style>