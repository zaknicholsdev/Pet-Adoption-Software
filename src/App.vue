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

</style>