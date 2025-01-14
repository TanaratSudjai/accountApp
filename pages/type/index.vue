<template>
  <button @click="send(5)" popovertarget="modal-s">modals ui open</button>
  <div id="modal-s" popover>
    <div class="bg-blue-500 p-4 grid">
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <button>add</button>
      <button popovertarget="modal-s">cancle</button>
    </div>
  </div>
</template>

<script setup>
const send = (params) => {
  return params;
};
</script>
