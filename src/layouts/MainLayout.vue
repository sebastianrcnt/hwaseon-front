<template>
  <div>
    <TopBar></TopBar>
    <slot></slot>
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";

export default {
  name: "MainLayout",
  components: {
    TopBar,
  },
};
</script>

<style></style>
