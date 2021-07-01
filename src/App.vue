<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
.ant-card {
  border: none !important;
  border-radius: 5px !important;
  box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.1);
}

.ant-card:hover {
  transform: scale(1.01);
}

#root {
  width: 100%;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#app {
  width: 100vw;
  min-width: 800px;
  max-width: 1400px;
}

@media (max-width: 800px) {
  body {
    align-items: flex-start;
    height: 1000vh;
  }
}
</style>
