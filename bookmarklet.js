(() => {
  const { fetch: _fetch } = window

  window.fetch = async (...args) => {
    const response = await _fetch(...args)

    response
      .clone()
      .json()
      .then(data => {
        const obj = data?.response?.priceInCentsToDarkPoolLevelDataSumModelMap
        if (!obj) {
          return
        }

        let entries = Object.entries(obj).map(([priceInCents, { sizeSum }]) => {
          return { priceInCents: parseInt(priceInCents), volume: sizeSum }
        });

        entries.sort((a, b) => b.volume - a.volume)
        entries = entries.slice(0, 80)
        entries.sort((a, b) => b.priceInCents - a.priceInCents)

        window.prompt('QD JSON', JSON.stringify(entries));
      })
      .catch(err => console.error(err))

    return response
  }
})();