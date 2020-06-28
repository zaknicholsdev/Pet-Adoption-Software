<template>
  <div id="edit-dog" class="container">
    <form @submit.prevent="updateDog">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="name" placeholder="Enter Name" />
      </div>
      <div class="form-group">
        <label>Age</label>
        <input type="text" class="form-control" v-model="age" placeholder="Enter Age" />
      </div>
      <div class="form-group">
        <label>Breed</label>
        <input type="text" class="form-control" v-model="breed" placeholder="Enter Breed" />
      </div>
      <div class="form-group">
        <label for="inputState">Spayed/Neutered</label>
        <select v-model="isNeuteredOrSpayed" class="form-control">
          <option selected disabled>Choose...</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <div class="form-group">
        <label>Adoption Fee</label>
        <input
          type="text"
          class="form-control"
          v-model="adoptionFee"
          placeholder="Enter Adoption Fee"
        />
      </div>
      <div class="form-group">
        <label>Description</label>
        <input
          type="text"
          class="form-control"
          v-model="description"
          placeholder="Enter Description"
        />
      </div>
      <div class="form-group">
        <label>Dog ID</label>
        <input disabled type="text" class="form-control" v-model="dogId" placeholder="Enter ID" />
      </div>
      <div class="form-group">
        <label>Image URL</label>
        <input disabled type="text" class="form-control" v-model="imageUrl" placeholder="Enter Image URL" />
      </div>
      <button type="submit" class="btn primary-btn-color text-white mr-2">Submit</button>
      <router-link to="/dogs" class="btn btn-secondary">Cancel</router-link>
    </form>
  </div>
</template>

<script>
import firebase from "../firebaseInit";
export default {
  name: "edit-dog",
  data() {
    return {
      dogId: null,
      name: null,
      age: null,
      breed: null,
      description: null,
      imageUrl: null,
      isNeuteredOrSpayed: null,
      adoptionFee: null
    };
  },
  beforeRouteEnter(to, from, next) {
    firebase.firestore().collection("dogs")
      .where("dogId", "==", to.params.dogId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.dogId = doc.data().dogId;
            vm.name = doc.data().name;
            vm.age = doc.data().age;
            vm.breed = doc.data().breed;
            vm.description = doc.data().description;
            vm.imageUrl = doc.data().imageUrl;
            vm.isNeuteredOrSpayed = doc.data().isNeuteredOrSpayed;
            vm.adoptionFee = doc.data().adoptionFee;
          });
        });
      });
  },
  methods: {
    fetchData() {
      firebase.firestore().collection("dogs")
        .where("dogId", "==", this.$route.params.dogId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.dogId = doc.data().dogId;
            this.name = doc.data().name;
            this.age = doc.data().age;
            this.breed = doc.data().breed;
            this.description = doc.data().description;
            this.imageUrl = doc.data().imageUrl;
            this.isNeuteredOrSpayed = doc.data().isNeuteredOrSpayed;
            this.adoptionFee = doc.data().adoptionFee;
          });
        });
    },
    updateDog() {
      firebase.firestore().collection("dogs")
        .where("dogId", "==", this.$route.params.dogId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                dogId: this.dogId,
                name: this.name,
                age: this.age,
                breed: this.breed,
                description: this.description,
                imageUrl: this.imageUrl,
                isNeuteredOrSpayed: this.isNeuteredOrSpayed,
                adoptionFee: this.adoptionFee
              })
              .then(() => {
                this.$router.push({
                  name: "view-dog",
                  params: { dogId: this.dogId }
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