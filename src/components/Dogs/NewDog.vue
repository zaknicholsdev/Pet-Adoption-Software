<template>
  <div id="new-dog" class="container">
    <form @submit.prevent="saveDog">
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
        <input
          disabled
          type="text"
          class="form-control"
          v-model="imageUrl"
          placeholder="Enter Image URL"
        />
      </div>
      <button type="submit" class="btn primary-btn-color text-white mr-2">Submit</button>
      <router-link to="/dogs" class="btn btn-secondary">Cancel</router-link>
    </form>
    <div>
      <p>Upload an image:</p>
      <input type="file" @change="previewImage" accept="image/*" />
    </div>
    <div>
      <p>Progress: {{uploadValue.toFixed()+"%"}}</p>
      <progress id="progress" :value="uploadValue" max="100"></progress>
    </div>
    <br />
    <div v-if="imageData!=null">
      <button class="btn primary-btn-color text-white mb-2" @click="onUpload">Upload</button>
      <br />
      <img class="img-fluid" :src="picture" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { uuid } from "vue-uuid";

export default {
  name: "new-dog",
  data() {
    return {
      dogId: uuid.v4(),
      age: null,
      description: null,
      name: null,
      imageUrl: null,
      breed: null,
      isNeuteredOrSpayed: "No",
      adoptionFee: null,
      imageData: null,
      picture: null,
      uploadValue: 0
    };
  },
  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      console.log(this.imageData);
    },
    onUpload() {
      this.picture = null;
      this.imageUrl = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}${Math.random()}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
            this.imageUrl = url;
            console.log(url);
          });
        }
      );
    },
    saveDog() {
      firebase
        .firestore()
        .collection("dogs")
        .add({
          dogId: this.dogId,
          name: this.name,
          breed: this.breed,
          age: this.age,
          imageUrl: this.imageUrl,
          isNeuteredOrSpayed: this.isNeuteredOrSpayed,
          adoptionFee: this.adoptionFee,
          description: this.description
        })
        .then(() => {
          this.$router.push("/dogs");
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
img {
  max-width: 400px;
  display: block;
  margin: auto;
}
</style>