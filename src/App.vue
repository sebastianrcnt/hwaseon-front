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
  box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.1);
}

.ant-card:hover {
  transform: scale(1.01);
}
</style>
