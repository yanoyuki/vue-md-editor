function defaultUrlFilter(url, _videoID, _serviceName, _options) {
  return url
}

export default class {
  constructor(name, options, env) {
    this.name = name
    this.options = Object.assign(this.getDefaultOptions(), options)
    this.env = env
  }

  getDefaultOptions() {
    return {}
  }

  extractVideoID(reference) {
    return reference
  }

  getVideoUrl(_videoID) {
    throw new Error('not implemented')
  }

  getFilteredVideoUrl(videoID) {
    let filterUrlDelegate =
      typeof this.env.options.filterUrl === 'function'
        ? this.env.options.filterUrl
        : defaultUrlFilter
    let videoUrl = this.getVideoUrl(videoID)
    return filterUrlDelegate(videoUrl, this.name, videoID, this.env.options)
  }

  getEmbedCode(reference) {
    const videoID = this.extractVideoID(reference)

    // iframe options
    let iframeAttributeList = []
    iframeAttributeList.push(['type', 'text/html'])
    iframeAttributeList.push(['src', this.getFilteredVideoUrl(videoID)])
    iframeAttributeList.push(['frameborder', 0])

    if (this.env.options.outputPlayerSize === true) {
      if (this.options.width !== undefined && this.options.width !== null) {
        iframeAttributeList.push(['width', this.options.width])
      }
      if (this.options.height !== undefined && this.options.height !== null) {
        iframeAttributeList.push(['height', this.options.height])
      }
    }

    if (this.env.options.allowFullScreen === true) {
      iframeAttributeList.push(['allow', 'fullscreen'])
    }

    let iframeAttributes = iframeAttributeList
      .map(pair =>
        pair[1] !== undefined ? `${pair[0]}="${pair[1]}"` : pair[0]
      )
      .join(' ')

    return (
      `<iframe ${iframeAttributes}></iframe>`
    )
  }
}
