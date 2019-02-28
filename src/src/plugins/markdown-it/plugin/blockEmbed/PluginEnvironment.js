import { YouTubeService } from './services'

export default class PluginEnvironment {
  constructor(md, options) {
    this.md = md
    this.options = Object.assign(this.getDefaultOptions(), options)

    this._initServices()
  }

  _initServices() {
    let defaultServiceBindings = {
      youtube: YouTubeService,
    }

    let serviceBindings = Object.assign(
      {},
      defaultServiceBindings,
      this.options.services
    )
    let services = {}
    for (let serviceName of Object.keys(serviceBindings)) {
      let _serviceClass = serviceBindings[serviceName]
      services[serviceName] = new _serviceClass(
        serviceName,
        this.options[serviceName],
        this
      )
    }

    this.services = services
  }

  getDefaultOptions() {
    return {
      containerClassName: 'block-embed',
      serviceClassPrefix: 'block-embed-service-',
      outputPlayerSize: true,
      allowFullScreen: true,
      filterUrl: null,
    }
  }
}
