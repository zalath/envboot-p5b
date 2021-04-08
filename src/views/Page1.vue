<template>
  <div>
    <a @click="call()">click</a>
  </div>
</template>

<script>
const ipc = require('electron').ipcRenderer;
export default {
  name: 'Page1',
  methods: {
    call() {
      ipc.send('tt', 'e1');
    }
  },
  created() {
    ipc.on('ss', function (event, e) {
      alert(e);
      console.log(e);
    });
  }
};
</script>
