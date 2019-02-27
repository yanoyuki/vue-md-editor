const reg = /^youtube\s*?$/

export default {
  validate: (params) => {
    return params.trim().match(reg)
  },

  render: (tokens, idx) => {
    if (tokens[idx].nesting === 1) {
      // opening tag
      return `<div id="test">`
    } else {
      // closing tag
      return `</div>`
    }
  }
}
