// markdown config
const markdown_config = {
  html: false,        // Enable HTML tags in source
  xhtmlOut: false,        // Use '/' to close single tags (<br />).
  breaks: true,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'lang-',  // CSS language prefix for fenced blocks.
  linkify: false,        // Autoconvert URL-like text to links
  typographer: true,
  quotes: '“”‘’',
}

const markdown = require('markdown-it')(markdown_config)

// plugins
const mark = require('markdown-it-mark')
const ins = require('markdown-it-ins')
import { a, blockEmbed } from './plugin'

// use plugins
markdown
  .use(mark)
  .use(ins)
  .use(a)
  .use(blockEmbed)

export default markdown
