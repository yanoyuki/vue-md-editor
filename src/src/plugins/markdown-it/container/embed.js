const reg = /^embed\s*?$/

export default {
  validate: (params) => {
    return params.trim().match(reg)
  },

  render: (tokens, idx) => {
    if (tokens[idx].nesting === 1) {
      // opening tag
      return `<h2 id="test">`
    } else {
      // closing tag
      return `</h2>`
    }
  }
}
