<template>
  <div id="edit-cat" class="container">
    <form @submit.prevent="updateCat">
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
        <label>Description</label>
        <input
          type="text"
          class="form-control"
          v-model="description"
          placeholder="Enter Description"
        />
      </div>
      <div class="form-group">
        <label for="inputState">Declawed</label>
        <select v-model="isDeclawed" class="form-control">
          <option disabled>Choose...</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
      <div class="form-group">
        <label for="inputState">Spayed/Neutered</label>
        <select v-model="isNeuteredOrSpayed" class="form-control">
          <option disabled>Choose...</option>
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
        <label>Cat ID</label>
        <input disabled type="text" class="form-control" v-model="catId" placeholder="Enter ID" />
      </div>
      <div class="form-group">
        <label>Image URL</label>
        <input disabled type="text" class="form-control" v-model="imageUrl" placeholder="Enter Image URL" />
      </div>
      <button type="submit" class="btn primary-btn-color text-white mr-2">Submit</button>
      <router-link to="/cats" class="btn btn-secondary">Cancel</router-link>
    </form>
  </div>
</template>

<script>
import firebase from "../firebaseInit";
export default {
  name: "edit-cat",
  data() {
    return {
      catId: null,
      name: null,
      age: null,
      breed: null,
      description: null,
      imageUrl: null,
      isNeuteredOrSpayed: null,
      isDeclawed: null,
      adoptionFee: null
    };
  },
  beforeRouteEnter(to, from, next) {
    firebase.firestore().collection("cats")
      .where("catId", "==", to.params.catId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.catId = doc.data().catId;
            vm.name = doc.data().name;
            vm.age = doc.data().age;
            vm.breed = doc.data().breed;
            vm.description = doc.data().description;
            vm.imageUrl = doc.data().imageUrl;
            vm.isNeuteredOrSpayed = doc.data().isNeuteredOrSpayed;
            vm.isDeclawed = doc.data().isDeclawed;
            vm.adoptionFee = doc.data().adoptionFee;
          });
        });
      });
  },
  methods: {
    fetchData() {
      firebase.firestore().collection("cats")
        .where("catId", "==", this.$route.params.catId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.catId = doc.data().catId;
            this.name = doc.data().name;
            this.age = doc.data().age;
            this.breed = doc.data().breed;
            this.description = doc.data().description;
            this.imageUrl = doc.data().imageUrl;
            this.isNeuteredOrSpayed = doc.data().isNeuteredOrSpayed
            this.isDeclawed = doc.data().isDeclawed;
            this.adoptionFee = doc.data().adoptionFee;
          });
        });
    },
    updateCat() {
      firebase.firestore().collection("cats")
        .where("catId", "==", this.$route.params.catId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                catId: this.catId,
                name: this.name,
                age: this.age,
                breed: this.breed,
                description: this.description,
                imageUrl: this.imageUrl,
                isNeuteredOrSpayed: this.isNeuteredOrSpayed,
                isDeclawed: this.isDeclawed,
                adoptionFee: this.adoptionFee
              })
              .then(() => {
                this.$router.push({
                  name: "view-cat",
                  params: { catId: this.catId }
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