// markdown config
const markdown_config = {
  html: false,        // Enable HTML tags in source
  xhtmlOut: false,        // Use '/' to close single tags (<br />).
  breaks: true,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'lang-',  // CSS language prefix for fenced blocks.
  linkify: false,        // Autoconvert URL-like text to links
  typographer: true,
  quotes: '“”‘’'
}

const markdown = require('markdown-it')(markdown_config)

// plugins
const mark = require('markdown-it-mark')
const container = require('markdown-it-container')
const ins = require('markdown-it-ins')

// plugins for markdown-it-container
import { youtube, embed } from './container'

// use plugins
markdown
  .use(mark)
  .use(container)
  .use(container, 'youtube', youtube)
  .use(container, 'embed', embed)
  .use(ins)


// override default renderer
import { a } from './plugin'

markdown
  .use(a)

export default markdown
