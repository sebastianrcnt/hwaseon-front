<template>
  <div id="root">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HomeLayout",
  components: {},
};
</script>

<style scoped>
#root {
  width: 100%;
  min-width: 800px;
  max-width: 1600px;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
