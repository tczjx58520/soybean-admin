<template>
  <div>
    <vue-form v-bind="$attrs"></vue-form>
  </div>
</template>

<script setup lang="ts">
import VueForm from '@lljj/vue3-form-naive';
defineOptions({ name: 'NwowForm' });
</script>

<style scoped></style>
