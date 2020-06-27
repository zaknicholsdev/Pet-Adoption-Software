<template>
  <div id="home">
    <h1 class="text-center p-3 container-fluid header-text mb-0" style="background-color: #e6f6fd;">DONATE</h1>
    <!-- Masthead -->
    <header class="hero py-5">
      <div class="container h-100">
        <div class="row h-100 align-items-center justify-content-center text-center">
          <div class="col-lg-10 align-self-end">
            <h2 class="text-uppercase text-white font-weight-bold">Give a Gift Today</h2>
          </div>
          <div class="col-lg-8 align-self-baseline">
            <p
              class="container text-white"
            >None of this is possible without you. Thank you for your support. If you'd like to donate click the button below.</p>
            <i class="fas fa-2x fa-chevron-down text-white mb-2"></i>
            <div>
              <button class="btn btn-primary">Donate</button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Donate Section -->
    <section class="page-section py-5 text-center" id="donate">
      <p class="container">
        Your generosity supports hundreds of animals in need. It helps pay for treatment when they
        are sick and finds them loving homes.
        As a non-profit your donations mean the world to these animals.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "donate"
};
</script>

<style>

.hero {
  /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url("../../assets/donate.jpeg");

  /* Set a specific height */
  height: 400px;

  /* Position and center the image to scale nicely on all screens */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>
