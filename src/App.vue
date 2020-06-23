<template>
  <div id="app">
    <Navbar :key="$route.fullPath" />
    <router-view />
    <Contact />
  </div>
</template>

<script>
import Navbar from "./components/Layout/Navbar";
import Contact from "./components/Layout/Contact";
export default {
  name: "app",
  components: {
    Navbar,
    Contact
  }
};
</script>

<style>
body {
  font-family: "Montserrat", sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500;
}
body {
  overflow-x: hidden;
}
</style>