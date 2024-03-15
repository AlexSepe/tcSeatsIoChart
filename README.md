
## TcSeatsioChart
[My widget description]

## Features
[feature highlights]

## Usage
[step by step instructions]

## Demo project
[link to sandbox]

## Issues, suggestions and feature requests
[link to GitHub issues]

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.



## Workarounb seats io
* adicionar "https://cdn-sa.seatsio.net/chart.js" no index.html
* index.js e embeddable.js do pacote seats io, precisei remover o lazy load do chart.js para funcionar
*   mx por alguma razão ainda desconhecida, não carregava o DOM do seatsio e gera erro no widget

    
    loadSeatsio() {
        const chartUrl = this.getChartUrl();
        if (!_Embeddable.seatsioBundles[chartUrl]) {
          _Embeddable.seatsioBundles[chartUrl] = window.seatsio;   <<<<< trecho ajustado >>>
        }
        return _Embeddable.seatsioBundles[chartUrl];
      }
      render() {
        return /* @__PURE__ */ React.createElement("div", { ref: this.container, style: { "height": "100%", "width": "100%" } });
      }
