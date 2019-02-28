// this plugin is based on https://github.com/posva/markdown-it-block-embed

import PluginEnvironment from './PluginEnvironment'
import renderer from './renderer'
import tokenizer from './tokenizer'

export default function (md, options) {
  let env = new PluginEnvironment(md, options)

  md.block.ruler.before('fence', 'embed', tokenizer.bind(env), {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })
  md.renderer.rules['embed'] = renderer.bind(env)
}
