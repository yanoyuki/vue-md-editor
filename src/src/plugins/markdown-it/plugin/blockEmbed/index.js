// this plugin is based on https://github.com/posva/markdown-it-block-embed

import PluginEnvironment from './PluginEnvironment'
import renderer from './renderer'
import tokenizer from './tokenizer'

export default function (md, options) {
  let env = new PluginEnvironment(md, options)

  md.block.ruler.before('fence', 'video', tokenizer.bind(env), {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })
  md.renderer.rules['video'] = renderer.bind(env)
}
