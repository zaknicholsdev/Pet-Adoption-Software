<template>
  <div id="home">
    <header class="hero-image pt-5">
      <div>
        <div class="text-center">
          <h2 class="text-uppercase text-white font-weight-bold">
            Changing Animals
            <br />Lives For Decades
          </h2>
        </div>
      </div>
    </header>

    <div class="text-center container pb-3">
      <h5 class="mr-2 mb-0 ml-2">
        <strong>VIEW OUR ADOPTABLE PETS OR GIVE A DONATION.</strong>
      </h5>
      <div class="my-2">
        <router-link
          class="btn btn-round home-btn px-2 py-3 my-1 round secondary-btn-color btn-shadow text-white"
          to="/dogs"
        ><i class="fas fa-dog"></i> Dogs
        </router-link>
        <br />
        <router-link
          class="btn home-btn btn-round px-2 py-3 my-1 round secondary-btn-color btn-shadow text-white"
          to="/cats"
        ><i class="fas fa-cat"></i> Cats
        </router-link>
        <br />
        <router-link
          to="/donate"
          class="btn home-btn btn-round px-5 primary-btn-color btn-shadow text-white py-3 my-1 round"
        ><i class="fas fa-heart"></i> Donate</router-link>
        <br />
      </div>
    </div>

    <!-- About Section -->
    <section class="page-section bg-color py-5" id="about">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="mt-0">You Make a Difference!</h2>
            <hr class="divider light my-4" />
            <p class="mb-4">
              For decades the Humane Society has been saving animals
              and finding them safe homes. We are a non-profit organization who receive our funds through
              donations, fundraising and adoptions. Your donations, volunteer work, and on-going support is everything.
            </p>
            <i class="fas fa-2x fa-chevron-down"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="page-section py-5" id="services">
      <div class="container">
        <h2 class="text-center mt-0">Help An Animal In Need</h2>
        <hr class="divider my-4" />
        <div class="row">
          <div class="col-lg-3 col-md-6 text-center">
            <div class="mt-5">
              <i class="fas fa-4x fa-paw i-color mb-4"></i>
              <h3 class="h4 mb-2">Adopt</h3>
              <p class="text-muted mb-0">Save a life and make a new best friend!</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="mt-5">
              <i class="fas fa-4x fa-donate mb-4 i-color"></i>
              <h3 class="h4 mb-2">Donate</h3>
              <p class="text-muted mb-0">We're a non-profit - Your donations are our backbone.</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="mt-5">
              <i class="fas fa-4x fa-hands-helping i-color mb-4"></i>
              <h3 class="h4 mb-2">Volunteer</h3>
              <p class="text-muted mb-0">The animals love new faces - Come see us!</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 text-center">
            <div class="mt-5">
              <i class="fas fa-4x fa-heart i-color mb-4"></i>
              <h3 class="h4 mb-2">Thank you</h3>
              <p
                class="text-muted mb-0"
              >Your help makes a real difference - We appreciate it so much.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style>
.home-btn {
  width: 200px;
}

.i-color {
  color: #054864;
}

.hero-image {
  /* Use "linear-gradient" to add a darken background effect to the image. This will make the text easier to read */
  background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
    url("../../assets/bg-masthead.jpg");

  /* Set a specific height */
  height: 500px;

  /* Position and center the image to scale nicely on all screens */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  clip-path: polygon(100% 0%, 100% 70%, 50% 90%, 50% 90%, 0 70%, 0 0);
}
</style>
