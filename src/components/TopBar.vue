<template>
  <div class="header">
    <h1 class="logo" @click="handleLogoClick">HWASEON</h1>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    handleLogoClick() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #ddd;

  background-color: white;
  z-index: 100;

  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  all: unset;
  font-size: 30px;
  font-weight: bold;
  color: #ff6633;
  text-align: center;
  cursor: pointer;
}
</style>
