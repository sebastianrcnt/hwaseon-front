<template>
  <div id="root">
    <TopBar></TopBar>
    <MenuBar></MenuBar>
    <div class="container">
      <slot></slot>
    </div>
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
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 200vh;
  width: 100%;
}

.container > * {
  margin-bottom: 20px !important;
  width: 100%;
}
</style>
