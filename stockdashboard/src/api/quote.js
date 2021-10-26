// (function (global, factory) {
//     typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//     typeof define === 'function' && define.amd ? define(factory) :
//     (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.getQuote = factory());
// }(this, (function () { 'use strict';

// function getQuote() {

    const QUOTE_DATA_BY_SYMBOL = {
        MSFT: {
            Name:'Microsoft Corp',
            Symbol:'MSFT',
            LastPrice:72.28,
            Change:0.519999999999996,
            ChangePercent:0.724637681159415,
            MSDate:42891,
            MarketCap:558038824200,
            Volume:33316760,
            ChangeYTD:62.14,
            ChangePercentYTD:16.3179916317992,
            High:72.89,
            Low:71.81,
            Open:71.97
        },
        BRKA: {
            Name:'Berkshire Hathaway Inc',
            Symbol:'BRK.A',
            LastPrice:249450,
            Change:-550,
            ChangePercent:-0.22,
            MSDate:42892.6520023148,
            MarketCap:191827050000,
            Volume:297,
            ChangeYTD:244121,
            ChangePercentYTD:2.18293387295644,
            High:250012,
            Low:248650,
            Open:249200.01
        },
        AAPL: {
            Name:'Apple Inc',
            Symbol:'AAPL',
            LastPrice:153.93,
            Change:-1.51999999999998,
            ChangePercent:-0.977806368607258,
            MSDate:42891,
            MarketCap:802566391200,
            Volume:25331662,
            ChangeYTD:115.82,
            ChangePercentYTD:32.9045069936108,
            High:154.45,
            Low:153.46,
            Open:154.34
        },
        INFO: {
            Name:'IHS Markit Ltd',
            Symbol:'INFO',
            LastPrice:46.8,
            Change:-0.260000000000005,
            ChangePercent:-0.552486187845315,
            MSDate:42891,
            MarketCap:19041750000,
            Volume:4082775,
            ChangeYTD:35.41,
            ChangePercentYTD:32.1660547867834,
            High:47.2,
            Low:46.71,
            Open:47.03
        },
        F: {
            Name:'Ford Motor Co',
            Symbol:'F',
            LastPrice:11.14,
            Change:-0.109999999999999,
            ChangePercent:-0.977777777777773,
            MSDate:42892.6552777808,
            MarketCap: null,
            Volume:40054809,
            ChangeYTD:12.13,
            ChangePercentYTD:-8.16158285243199,
            High:11.2,
            Low:11.05,
            Open:11.19
        },
        PLT: {
            Name:'Plantronics Inc',
            Symbol:'PLT',
            LastPrice:55.43,
            Change:-0.18,
            ChangePercent:-0.323682790864952,
            MSDate:42892.6617824084,
            MarketCap:1853412910,
            Volume:94192,
            ChangeYTD:54.76,
            ChangePercentYTD:1.22352081811542,
            High:55.94,
            Low:55.02,
            Open:55.44
        },
        BIG: {
            Name:'Big Lots Inc',
            Symbol:'BIG',
            LastPrice:48.28,
            Change:-1.36,
            ChangePercent:-2.73972602739726,
            MSDate:42892.6620949074,
            MarketCap:2162268080,
            Volume:1253948,
            ChangeYTD:50.21,
            ChangePercentYTD:-3.84385580561641,
            High:49.17,
            Low:47.99,
            Open:49.17
        },
        TWX: {
            Name:'Time Warner Inc',
            Symbol:'TWX',
            LastPrice:99.46,
            Change:-0.240000000000009,
            ChangePercent:-0.240722166499508,
            MSDate:42892.6622916667,
            MarketCap:77135009480,
            Volume:2953535,
            ChangeYTD:96.53,
            ChangePercentYTD:3.03532580544908,
            High:99.82,
            Low:99.44,
            Open:99.65
        },
        AME: {
            Name:'Ametek Inc',
            Symbol:'AME',
            LastPrice:61.53,
            Change:-0.269999999999996,
            ChangePercent:-0.436893203883489,
            MSDate:42892.6622569544,
            MarketCap:14158545240,
            Volume:601580,
            ChangeYTD:48.6,
            ChangePercentYTD:26.6049382716049,
            High:61.76,
            Low:61.25,
            Open:61.38
        },
        JWN: {
            Name:'Nordstrom Inc',
            Symbol:'JWN',
            LastPrice:40.085,
            Change:-1.565,
            ChangePercent:-3.75750300120047,
            MSDate:42892.6625810225,
            MarketCap:6656194420,
            Volume:4133041,
            ChangeYTD:47.93,
            ChangePercentYTD:-16.367619445024,
            High:41.66,
            Low:39.715,
            Open:41.51
        },
        CVS: {
            Name:'CVS Health Corp',
            Symbol:'CVS',
            LastPrice:77.805,
            Change:-0.984999999999999,
            ChangePercent:-1.25015864957482,
            MSDate:42892.6627199094,
            MarketCap:79267344975,
            Volume:3812490,
            ChangeYTD:78.91,
            ChangePercentYTD:-1.40032948929159,
            High:78.52,
            Low:77.64,
            Open:78.41
        },
        MS: {
            Name:'Morgan Stanley',
            Symbol:'MS',
            LastPrice:42.995,
            Change:0.104999999999997,
            ChangePercent:0.244812310561895,
            MSDate:42892.6628587963,
            MarketCap:79531377090,
            Volume:5471583,
            ChangeYTD:42.25,
            ChangePercentYTD:1.76331360946745,
            High:43.07,
            Low:42.21,
            Open:42.44
        },
        MET: {
            Name:'Metlife Inc',
            Symbol:'MET',
            LastPrice:50.425,
            Change:-0.705000000000005,
            ChangePercent:-1.37883825542735,
            MSDate:42892.6630324074,
            MarketCap:54253921525,
            Volume:3751545,
            ChangeYTD:53.89,
            ChangePercentYTD:-6.42976433475599,
            High:50.83,
            Low:50.13,
            Open:50.7
        }
    };

    const getQuote = async function (symbol) {
        symbol = String(symbol).toUpperCase();
        let data = QUOTE_DATA_BY_SYMBOL[symbol];
        let response;
        if (data) {
            response = {
                Status: 'SUCCESS',
                data: { ...data, Timestamp: new Date() }
            };
        } else {
            response = {
                Status: 'FAILED',
                Message: `No symbol matches found for ${symbol}. Try another symbol such as MSFT or AAPL, or use the Lookup API.`
            };
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                data ? resolve(response) : reject(response);
            }, 500);
        })

    };

    export {getQuote};
// }

// }
// )));