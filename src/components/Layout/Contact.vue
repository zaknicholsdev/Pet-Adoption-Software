<template>
  <div id="contact">
    <section class="page-section bg-color py-5 mt-2" id="contact">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="mt-0">Come Visit Us!</h2>
            <hr class="divider my-4">
            <p class="mb-5">
              If you'd like to adopt please come visit us at: 
              <br>
              1234 Example Rd. Somewhere Some Place.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 ml-auto text-center">
            <i class="fas fa-phone fa-3x mb-3"></i>
            <div>555-123-4567</div>
          </div>
          <div class="col-lg-4 mr-auto text-center">
            <i class="fas fa-envelope fa-3x mb-3"></i>
            <a
              class="d-block" style="color: #212529;"
              href="mailto:example@adopty.org"
            >example@adopty.org</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-light py-5">
      <div class="container">
        <div
          class="small text-center text-muted"
        >Copyright &copy; 2020 - Adopty</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "contact",
};
</script>

<style scoped>
.bg-color {
  background-color: #e6f6fd;
}
</style>