<template>
  <div class="container">
    <modal v-model="modalOpen" v-on:deleteItem="deleteDog"></modal>
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <img v-bind:style="{ backgroundImage: 'url(' + imageUrl + ')' }" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-8">
        <ul class="px-3">
          <li>
            <strong>Name:</strong>
            {{name}}
          </li>
          <li>
            <strong>Breed:</strong>
            {{breed}}
          </li>
          <li>
            <strong>Age:</strong>
            {{age}}
          </li>
          <li>
            <strong>Neutered/Spayed:</strong>
            {{isNeuteredOrSpayed}}
          </li>
          <li>
            <strong>Adoption Fee:</strong>
            {{adoptionFee}}
          </li>
          <p class="desc-wrap">
            <strong>Description:</strong>
            {{description}}
          </p>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-center m-3">
          <router-link to="/dogs" class="btn btn-secondary m-1">Back</router-link>
          <button v-if="isLoggedIn" @click="showModal" class="btn btn-danger m-1">Delete</button>
          <router-link
            class="btn btn-warning m-1"
            v-if="isLoggedIn"
            v-bind:to="{name: 'edit-dog', params: {'dog-id': dogId}}"
          >Edit</router-link>
          <router-link
            v-if="isLoggedIn"
            to="/Dashboard"
            class="btn m-1 primary-btn-color text-white"
          >Dashboard</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebaseInit";
import Modal from "../Modal";
export default {
  components: {
    Modal
  },
  name: "view-dog",
  data() {
    return {
      dogId: null,
      name: null,
      age: null,
      breed: null,
      description: null,
      imageUrl: null,
      isLoggedIn: false,
      currentUser: false,
      isNeuteredOrSpayed: null,
      adoptionFee: null,
      modalOpen: false
    };
  },
  beforeRouteEnter(to, from, next) {
    firebase
      .firestore()
      .collection("dogs")
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
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
    }
  },
  methods: {
    fetchData() {
      firebase
        .firestore()
        .collection("dogs")
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
    showModal() {
      this.modalOpen = !this.modalOpen;
    },
    deleteDog() {
      firebase
        .firestore()
        .collection("dogs")
        .where("dogId", "==", this.$route.params.dogId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
            setTimeout(() => {
              this.$router.push("/dogs");
            }, 1000);
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

li {
  border-bottom: 1px solid lightgray;
}

.desc-wrap {
  word-wrap: break-word;
}

img {
  width: 100%;
  padding-bottom: 100%;
  background: no-repeat center/cover;
}
</style>