<template>
  <div>
    <router-view />
<!--    <Footer />-->
  </div>
</template>

<script>
import Footer from '../components/Footer.vue';

export default {
  name: 'Layout',
  components: {
    // Footer
  }
};
</script>
