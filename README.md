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

1. Create a custom page on [Quant Data](https://v3.quantdata.us) with two `Dark Pool Levels` tools.
2. Select the desired tickers (usually `SPY` and `QQQ`) and an appropriate date range of about 2-3 months.
3. Create a browser bookmark named `Capture QD DP Levels`.
4. Edit the bookmark and replace its URL with the following string:

```js
javascript:(()=>{const p=a=>{const b=a?.response?.priceInCentsToDarkPoolLevelDataSumModelMap;if(!b)return;let c=Object.entries(b).map(([a,{sizeSum:b}])=>({priceInCents:parseInt(a),volume:b}));c.sort((a,b)=>b.volume-a.volume),c=c.slice(0,80),c.sort((a,b)=>b.priceInCents-a.priceInCents),window.prompt("QD JSON",JSON.stringify(c))},r=a=>{if(typeof a==="string")try{p(JSON.parse(a))}catch(b){console.error(b)}else p(a)},{fetch:f}=window;window.fetch=async(...a)=>{const b=await f(...a);return b.clone().json().then(p).catch(a=>console.error(a)),b};const{send:s}=XMLHttpRequest.prototype;XMLHttpRequest.prototype.send=function(...a){return this.addEventListener("load",()=>{this.responseType==="json"?r(this.response):this.responseType===""||this.responseType==="text"?r(this.responseText):void 0}),s.apply(this,a)}})();
```

The bookmarklet captures matching responses made with either `fetch` or `XMLHttpRequest`.

![screenshot](https://github.com/pstadler/tradingview-qd-dp-levels/blob/main/qd-custom-page.png?raw=true)

### Populating data

1. Open the QD DP Levels script settings in TradingView.
2. Open [Quant Data](https://v3.quantdata.us).
3. Access your custom dark pool levels page on Quant Data.
4. Click on the bookmarklet you've previously added. This must be done **before** the next step.
5. Change the date range for your widget.
6. A native browser prompt should appear. Copy the data presented to you and paste it to the according TradingView script settings. If you selected only one date, ignore the prompt until you entered the end (or start) date to complete the range.

<img src="https://github.com/pstadler/tradingview-qd-dp-levels/blob/main/tv-script-settings.png?raw=true" width="250"> <img src="https://github.com/pstadler/tradingview-qd-dp-levels/blob/main/qd-bookmarklet-prompt.png?raw=true" width="250">

### Tips & tricks

Hide the script on higher time frames by configuring its visibility - daily, weekly and monthly time frames get really busy otherwise.

Please consider boosting the script on TradingView 🚀.
