<template>
  <div id="app">
    <v-editor/>
    <mavon-editor language="en" />
  </div>
</template>

<script>
import vEditor from './components/editor.vue'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'app',
  components: {
    vEditor,
    mavonEditor,
  }
}
</script>
