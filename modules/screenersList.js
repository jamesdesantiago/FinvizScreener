// screenersList.js
module.exports = [
    {
      name: 'R/S S&P 500',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500%2Cind_stocksonly%2Csh_avgvol_o300%2Csh_curvol_o300%2Csh_price_o10%2Cta_change_u5&ft=4&o=-change&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: 'R/S NASDAQ',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_ndx%2Cind_stocksonly%2Csh_avgvol_o300%2Csh_curvol_o300%2Csh_price_o10%2Cta_change_u5&ft=4&o=-change&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: 'R/S Russell 2000',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_rut%2Cind_stocksonly%2Csh_avgvol_o300%2Csh_curvol_o300%2Csh_price_o10%2Cta_change_u5&ft=4&o=-change&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: '100% YTD',
      url: 'https://finviz.com/screener.ashx?v=152&f=geo_usa,ind_stocksonly,sh_avgvol_o300,sh_curvol_o300,sh_price_o20,ta_perf_ytd100o&ft=4&o=sector&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: '52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=geo_usa%2Cind_stocksonly%2Csh_avgvol_o1000%2Csh_price_o20%2Cta_beta_o1%2Cta_change_u3%2Cta_highlow52w_nh&ft=4&o=-change&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: '300% Up',
      url: 'https://finviz.com/screener.ashx?v=152&f=geo_usa%2Cind_stocksonly%2Csh_avgvol_o400%2Csh_price_o10%2Csh_relvol_o3%2Cta_perf_dup&ft=4&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: '300% Down',
      url: 'https://finviz.com/screener.ashx?v=152&f=geo_usa%2Cind_stocksonly%2Csh_avgvol_o400%2Csh_price_o10%2Csh_relvol_o3%2Cta_perf_ddown&ft=4&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: '3% Gap Ups',
      url: 'https://finviz.com/screener.ashx?v=152&f=fa_epsqoq_o20%2Cfa_salesqoq_o20%2Cgeo_usa%2Cind_stocksonly%2Csh_curvol_o300%2Csh_price_o20%2Cta_gap_u3&ft=4&o=-change4&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: '1.5 under 100 m',
      url: 'https://finviz.com/screener.ashx?v=152&f=fa_epsqoq_o20,fa_grossmargin_o20,fa_roe_o5,fa_salesqoq_o20,sh_avgvol_o400,sh_outstanding_u100,sh_price_o10,sh_relvol_o1.5,ta_perf_dup&ft=4&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: '1.5 above 100m',
      url: 'https://finviz.com/screener.ashx?v=152&f=fa_epsqoq_o20%2Cfa_grossmargin_o20%2Cfa_roe_o5%2Cfa_salesqoq_o20%2Csh_avgvol_o400%2Csh_outstanding_o100%2Csh_price_o10%2Csh_relvol_o1.5%2Cta_perf_dup&ft=4&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: 'volume 1 with stocks over 100m',
      url: 'https://finviz.com/screener.ashx?v=152&f=fa_epsqoq_o20%2Cfa_grossmargin_o20%2Cfa_roe_o5%2Cfa_salesqoq_o20%2Csh_avgvol_o400%2Csh_outstanding_o100%2Csh_price_o10%2Csh_relvol_o1%2Cta_perf_dup&ft=4&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: 'volume 1 with stocks under 100m',
      url: 'https://finviz.com/screener.ashx?v=152&f=fa_epsqoq_o20%2Cfa_grossmargin_o20%2Cfa_roe_o5%2Cfa_salesqoq_o20%2Csh_avgvol_o400%2Csh_outstanding_u100%2Csh_price_o10%2Csh_relvol_o1%2Cta_perf_dup&ft=4&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {
      name: 'Basic Materials 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500,sec_basicmaterials,ta_highlow52w_b0to10h&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
    {   
      name: 'Communication Services 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500%2Csec_communicationservices%2Cta_highlow52w_b0to10h&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },    
    {
      name: 'Consumer Cyclical 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500%2Csec_consumercyclical%2Cta_highlow52w_b0to10h&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },    
    {
      name: 'Consumer Defensive 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500%2Csec_consumerdefensive%2Cta_highlow52w_b0to10h&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },    
    {
      name: 'Energy 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500%2Csec_energy%2Cta_highlow52w_b0to10h&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },    
    {
      name: 'Financial 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500%2Csec_financial%2Cta_highlow52w_b0to10h&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },    
    {
      name: 'Healthcare 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500,sec_healthcare,ta_highlow52w_b0to10h&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },    
    {
      name: 'Industrials 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500%2Csec_industrials%2Cta_highlow52w_b0to10h&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },    
    {
      name: 'Real Estate 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500%2Csec_realestate%2Cta_highlow52w_b0to10h&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },    
    {
      name: 'Technology 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500%2Csec_technology%2Cta_highlow52w_b0to10h&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },    
    {
      name: 'Utilities 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500%2Csec_utilities%2Cta_highlow52w_b0to10h&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },    
    {
      name: 'Foreign 52w High',
      url: 'https://finviz.com/screener.ashx?v=152&f=cap_midover%2Cgeo_notusa%2Cind_stocksonly%2Csh_avgvol_o500%2Csh_curvol_o500%2Csh_price_o10%2Cta_highlow52w_b0to10h%2Cta_sma20_pa%2Cta_sma200_pa%2Cta_sma50_pa&ft=4&o=-perfytd&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
      requiresAdvancedLogic: false,
    },
   // {
      //name: 'S&P 500 Stocks',
      //url: 'https://finviz.com/screener.ashx?v=152&f=idx_sp500&c=0,1,2,3,4,5,6,7,127,128,24,25,26,27,28,29,30,31,42,43,44,45,46,47,50,51,68,62,63,64,67,65,66',
     // requiresAdvancedLogic: false,
    //},      
    // Add more screeners as needed...
  ];
  
