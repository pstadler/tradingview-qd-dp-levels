# TradingView Quant Data Dark Pool Levels

TradingView script to print dark pool levels using data from Quant Data.

![screenshot](https://github.com/pstadler/tradingview-qd-dp-levels/blob/main/showcase.png?raw=true)

## Features

- Support for two configurable tickers
- Volume threshold for levels
- Varying degrees of opacity depending on volume relative to other levels
- Consolidate close by levels and highlight their range

## Setup & usage

### TradingView

1. Access the [QD DP Levels](https://www.tradingview.com/script/lK0NwIbe-QD-DP-Levels/) script on TradingView and add it to your favorites.
2. Add the indicator to your desired chart.

### Quant Data

1. Create a custom page on [Quant Data](https://v3.quantdata.us) two `Dark Pool Levels` tools.
2. Select the desired tickers (usually `SPY` and `QQQ`) and an appropriate date range of about 2-3 months.
3. Add the following bookmark to your browser: [Capture QD DP Levels]()
4. Edit the bookmark and replace the URL with the following string, turning it into a bookmarklet:

```js
javascript:(()=>{const{fetch:a}=window;window.fetch=async(...b)=>{const c=await a(...b);return c.clone().json().then(a=>{const b=a?.response?.priceInCentsToDarkPoolLevelDataSumModelMap;if(!b)return;let c=Object.entries(b).map(([a,{sizeSum:b}])=>({priceInCents:parseInt(a),volume:b}));c.sort((c,a)=>a.volume-c.volume),c=c.slice(0,80),c.sort((c,a)=>a.priceInCents-c.priceInCents),window.prompt("QD JSON",JSON.stringify(c))}).catch(a=>console.error(a)),c}})();
```

![screenshot](https://github.com/pstadler/tradingview-qd-dp-levels/blob/main/qd-custom-page.png?raw=true)

### Populating data

1. Open the QD DP Levels script settings in TradingView.
2. Open [Quant Data](https://v3.quantdata.us).
3. Click on the bookmarklet you've previously added. This must be done **before** the next step.
4. Access your custom dark pool levels page on Quant Data.
5. Two native browser prompts should appear sequentially. Copy the data presented to you and paste it to the according TradingView script settings.

<img src="https://github.com/pstadler/tradingview-qd-dp-levels/blob/main/tv-script-settings.png?raw=true" width="250"> <img src="https://github.com/pstadler/tradingview-qd-dp-levels/blob/main/qd-bookmarklet-prompt.png?raw=true" width="250">

### Tips & tricks

Hide the script on higher time frames by configuring its visibility - daily, weekly and monthly time frames get really busy otherwise.

Please consider boosting the script on TradingView 🚀.