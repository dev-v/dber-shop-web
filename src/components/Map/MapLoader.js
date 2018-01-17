const DEFAULT_CONFIG = {
  v: '1.4.3',
  hostAndPath: 'webapi.amap.com/maps',
  key: '209dbd3505e1e82f15b4a6901e1123af',
  callback: '__amap_init_callback',
  useAMapUI: true
}

let mainPromise = null
let amapuiPromise = null
let amapuiInited = false

export default class MapLoader {
  constructor({useAMapUI}) {
    this.config = {...DEFAULT_CONFIG, useAMapUI}
  }

  buildScriptTag(src) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = src
    return script
  }

  getAmapuiPromise() {
    const script = this.buildScriptTag(`${window.location.protocol}//webapi.amap.com/ui/1.0/main-async.js`)
    const p = new Promise(resolve => {
      script.onload = () => {
        resolve()
      }
    })
    document.body.appendChild(script)
    return p
  }

  getMainPromise() {
    const cfg = this.config;
    const src = `${window.location.protocol}//${cfg.hostAndPath}?v=${cfg.v}&key=${cfg.key}&callback=${cfg.callback}`
    const script = this.buildScriptTag(src)
    const p = new Promise(resolve => {
      window[this.config.callback] = () => {
        resolve()
        delete window[this.config.callback]
      }
    })
    document.body.appendChild(script)
    return p
  }

  load() {
    if (typeof window === 'undefined') {
      return null
    }
    const {useAMapUI} = this.config
    mainPromise = mainPromise || this.getMainPromise()
    if (useAMapUI) {
      amapuiPromise = amapuiPromise || this.getAmapuiPromise()
    }
    return new Promise(resolve => {
      mainPromise.then(() => {
        if (useAMapUI && amapuiPromise) {
          amapuiPromise.then(() => {
            if (window.initAMapUI && !amapuiInited) {
              window.initAMapUI()
              amapuiInited = true
            }
            resolve()
          })
        } else {
          resolve()
        }
      })
    })
  }
}
