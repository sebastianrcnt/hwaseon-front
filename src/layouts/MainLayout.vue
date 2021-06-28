<template>
  <div>
    <TopBar></TopBar>
    <MenuBar></MenuBar>
    <slot></slot>
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
import MenuBar from "../components/MenuBar.vue";

export default {
  name: "MainLayout",
  components: {
    TopBar,
    MenuBar,
  },
};
</script>

<style></style>
