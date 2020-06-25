<template>
  <div class="container">
    <modal v-model="modalOpen" v-on:deleteItem="deleteCat"></modal>
    <div class="card border mt-3 mb-5 shadow bg-white rounded col-xs-12 max">
      <div class="caption">
        <img v-bind:src="imageUrl" class="img-fluid card-img-top" />
        <br />
        <ul class="pl-2 pt-2 pr-2 pb-0 m-2">
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
            <strong>Spayed/Neutered:</strong>
            {{isNeuteredOrSpayed}}
          </li>
          <li>
            <strong>Declawed:</strong>
            {{isDeclawed}}
          </li>
          <li>
            <strong>Adoption Fee:</strong>
            ${{adoptionFee}}
          </li>
          <p class="of">
            <strong>Description:</strong>
            {{description}}
          </p>
        </ul>
      </div>
      <div class="mb-3 mr-3 ml-3">
        <router-link to="/cats" class="btn btn-secondary m-1">Back</router-link>
        <button v-if="isLoggedIn" @click="showModal" class="btn btn-danger m-1">Delete</button>
        <router-link
          class="btn btn-warning m-1"
          v-if="isLoggedIn"
          v-bind:to="{name: 'edit-cat', params: {'cat-id': catId}}"
        >Edit</router-link>
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
  name: "view-cat",
  data() {
    return {
      catId: null,
      name: null,
      age: null,
      breed: null,
      description: null,
      isNeuteredOrSpayed: null,
      isDeclawed: null,
      imageUrl: null,
      isLoggedIn: false,
      currentUser: false,
      adoptionFee: null,
      modalOpen: false
    };
  },
  beforeRouteEnter(to, from, next) {
    firebase
      .firestore()
      .collection("cats")
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
        .collection("cats")
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
            this.isNeuteredOrSpayed = doc.data().isNeuteredOrSpayed;
            this.isDeclawed = doc.data().isDeclawed;
            this.adoptionFee = doc.data().adoptionFee;
          });
        });
    },
    showModal() {
      this.modalOpen = !this.modalOpen;
    },
    deleteCat() {
        firebase
          .firestore()
          .collection("cats")
          .where("catId", "==", this.$route.params.catId)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/cats");
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

.of {
  word-wrap: break-word;
}

.max {
  max-width: 400px;
  margin: 0 auto;
}
.card-img-top {
  width: 100%;
  object-fit: cover;
}

.rounded {
  border-radius: 30px !important;
}
.card-img-top {
  border-top-left-radius: 30px !important;
  border-top-right-radius: 30px !important;
}
</style>