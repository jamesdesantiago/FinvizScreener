// screenersList.js
module.exports = [
    {
      name: 'R/S S&P 500',
      url: 'https://finviz.com/screener.ashx?v=111&f=idx_sp500%2Cind_stocksonly%2Csh_avgvol_o300%2Csh_curvol_o300%2Csh_price_o10%2Cta_change_u5&ft=4&o=-change',
      requiresAdvancedLogic: false,
    },
    {
      name: 'R/S NASDAQ',
      url: 'https://finviz.com/screener.ashx?v=111&f=idx_ndx%2Cind_stocksonly%2Csh_avgvol_o300%2Csh_curvol_o300%2Csh_price_o10%2Cta_change_u5&ft=4&o=-change',
      requiresAdvancedLogic: false,
    },
    {
      name: 'R/S Russell 2000',
      url: 'https://finviz.com/screener.ashx?v=111&f=idx_rut%2Cind_stocksonly%2Csh_avgvol_o300%2Csh_curvol_o300%2Csh_price_o10%2Cta_change_u5&ft=4&o=-change',
      requiresAdvancedLogic: false,
    },
    {
      name: '100% YTD',
      url: 'https://finviz.com/screener.ashx?v=111&f=geo_usa,ind_stocksonly,sh_avgvol_o300,sh_curvol_o300,sh_price_o20,ta_perf_ytd100o&ft=4&o=sector',
      requiresAdvancedLogic: false,
    },
    {
      name: '52w High',
      url: 'https://finviz.com/screener.ashx?v=111&f=geo_usa%2Cind_stocksonly%2Csh_avgvol_o1000%2Csh_price_o20%2Cta_beta_o1%2Cta_change_u3%2Cta_highlow52w_nh&ft=4&o=-change',
      requiresAdvancedLogic: false,
    },
    {
      name: '300% Up',
      url: 'https://finviz.com/screener.ashx?v=111&f=geo_usa%2Cind_stocksonly%2Csh_avgvol_o400%2Csh_price_o10%2Csh_relvol_o3%2Cta_perf_dup&ft=4',
      requiresAdvancedLogic: false,
    },
    {
      name: '300% Down',
      url: 'https://finviz.com/screener.ashx?v=111&f=geo_usa%2Cind_stocksonly%2Csh_avgvol_o400%2Csh_price_o10%2Csh_relvol_o3%2Cta_perf_ddown&ft=4',
      requiresAdvancedLogic: false,
    },
    {
      name: '3% Gap Ups',
      url: 'https://finviz.com/screener.ashx?v=111&f=fa_epsqoq_o20%2Cfa_salesqoq_o20%2Cgeo_usa%2Cind_stocksonly%2Csh_curvol_o300%2Csh_price_o20%2Cta_gap_u3&ft=4&o=-change4',
      requiresAdvancedLogic: false,
    },  
    // Add more screeners as needed...
  ];
  