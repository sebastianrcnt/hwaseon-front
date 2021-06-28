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
* {
  box-sizing: border-box;
}

#root {
  min-width: 800px;
  width: 100vw;
  max-width: 1200px;
  height: 100vh;
  padding: 0 20px;
  overflow-y: scroll;
  box-shadow: 0px 0px 15px 4px rgba(0, 0, 0, 0.1);
}

@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) {
  #root {
    all: unset;
  }
}

#root::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
#root {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  width: 100%;
}

.container > * {
  margin-bottom: 20px !important;
  width: 100%;
}
</style>
