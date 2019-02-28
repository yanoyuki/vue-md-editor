export default function(tokens, idx, _options, _env) {
  let embedToken = tokens[idx]

  let service = embedToken.info.service
  let reference = embedToken.info.reference
  let serviceName = embedToken.info.serviceName

  // className
  let containerClassNames = []
  if (this.options.containerClassName) {
    containerClassNames.push(this.options.containerClassName)
  }
  containerClassNames.push(
    this.options.serviceClassPrefix + this.md.utils.escapeHtml(serviceName)
  )

  return (
    `<div class="${containerClassNames.join(' ')}">` +
    service.getEmbedCode(reference) +
    `</div>\n`
  )
}
