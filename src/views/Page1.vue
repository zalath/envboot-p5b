<template>
  <div>
    <a @click="call()">click</a>
    <a @click="callinit()">iniclick</a>
  </div>
</template>

<script>
const ipc = require('electron').ipcRenderer;
export default {
  name: 'Page1',
  methods: {
    call() {
      ipc.send('tt', 'e1');
    },
    callinit() {
      ipc.send('initd', 'e');
    }
  },
  created() {
    ipc.on('ss', function (event, e) {
      alert(e);
      console.log(e);
    })
    ipc.on('inid', function (event, e) {
      console.log(e)
    })
  }
};
</script>
