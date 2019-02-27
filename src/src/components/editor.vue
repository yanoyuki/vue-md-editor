<template>
  <div class="editor">
    <textarea
      class="editor-input"
      :value="input"
      @input="update"
      @keydown.tab.prevent="insertTab"
      ref="textarea"
    ></textarea>
    <div class="compiled-md" v-html="compiledMD"></div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import md from '@/plugins/markdown-it'
import samleMd from '@/assets/sample'
import {
  insertTextAtCaret,
  insertTextAtRowFirst,
} from '@/plugins/extra-functions'

export default {
  data: () => ({
    input: samleMd
  }),

  computed: {
    compiledMD() {
      return md.render(this.input)
    }
  },

  methods: {
    update: debounce(function(e) {
      this.input = e.target.value
    }, 300),

    insertTextAtCaret ({prefix, subfix, str}) {
      insertTextAtCaret(this.$refs.textarea, {prefix, subfix, str}, this)
    },

    insertTextAtRowFirst({prefix, str})  {
      insertTextAtRowFirst(this.$refs.textarea, {prefix, str}, this)
    },

    insertTab () {
      this.insertTextAtRowFirst({
        prefix: 'hoge',
        str: 'select',
      })
    }
  },
}
</script>

<style lang="scss">
.editor {
  width: 100%; /* TODO */
  height: 500px; /* TODO */
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    height: 100%;
    width: 1px;
    background-color: #ccc;
  }
}

.editor-input,
.compiled-md {
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
  height: 100%;
  width: 50%;
  overflow-y: scroll;
  border: none;
  background-color: transparent;
}

.compiled-md {
  // some md styles here
  .accent-color {
    &--1 {
      color: #f00;
    }

    &--2 {
      color: #0f0;
    }

    &--3 {
      color: #00f;
    }
  }
}
</style>

