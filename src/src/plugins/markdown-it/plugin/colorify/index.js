// this is extension of em syntax

// if you write "<{color}text>",
// this will be compiled as <span class="md-colorify md-colorify--${color}">text</span>

// if you write "<text>",
// this will be compiled as <span class="md-colorify md-colorify--accent">text</span> (default)

function testColorify (text) {
  const reg = /<(.+)>/
  const reg_color = /{(.+)}(.+)/

  // test if the text is wrapped by "<>"
  if (reg.test(text)) {
    const inner = reg.exec(text)[1]
    // test if the content has color definition
    if (reg_color.test(inner)) {
      return {
        color: reg_color.exec(inner)[1],
        content: reg_color.exec(inner)[2],
      }
    } else {
      return {
        color: 'accent',
        content: inner
      }
    }
  }

  return false
}

const defaultClassName = 'md-colorify'

export default function (md) {
  const defaultRender = md.renderer.rules.text || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.text = function (tokens, idx, options, env, self) {
    const content = tokens[idx].content
    const renderObj = testColorify(content)

    if (renderObj) {
      return (
        `<span class="${defaultClassName} ${defaultClassName}--${renderObj.color}">` +
        renderObj.content +
        `</span>`
      )
    }


    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self)
  }
}
