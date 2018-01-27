class ScriptLoader {

  buildScriptTag(src) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = src
    return script
  }

  load(src, fn) {
    const script = this.buildScriptTag(`${window.location.protocol}${src}`)
    const p = new Promise(resolve => {
      script.onload = () => {
        fn ? fn(resolve) : resolve();
      }
    });
    document.body.appendChild(script)
    return p
  }
}

export default new ScriptLoader();
