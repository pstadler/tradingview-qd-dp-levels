;(() => {
  const processData = (data) => {
    const obj = data?.response?.priceInCentsToDarkPoolLevelDataSumModelMap
    if (!obj) {
      return
    }

    let entries = Object.entries(obj).map(([priceInCents, { sizeSum }]) => {
      return { priceInCents: parseInt(priceInCents), volume: sizeSum }
    })

    entries.sort((a, b) => b.volume - a.volume)
    entries = entries.slice(0, 80)
    entries.sort((a, b) => b.priceInCents - a.priceInCents)

    window.prompt('QD JSON', JSON.stringify(entries))
  }

  const processResponse = (response) => {
    if (typeof response === 'string') {
      try {
        processData(JSON.parse(response))
      } catch (err) {
        console.error(err)
      }
      return
    }

    processData(response)
  }

  const { fetch: _fetch } = window

  window.fetch = async (...args) => {
    const response = await _fetch(...args)

    response.clone().json().then(processData)
      .catch((err) => console.error(err))

    return response
  }

  const { send: _send } = XMLHttpRequest.prototype

  XMLHttpRequest.prototype.send = function (...args) {
    this.addEventListener('load', () => {
      if (this.responseType === 'json') {
        processResponse(this.response)
      } else if (this.responseType === '' || this.responseType === 'text') {
        processResponse(this.responseText)
      }
    })

    return _send.apply(this, args)
  }
})()
