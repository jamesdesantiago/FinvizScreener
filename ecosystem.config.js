// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'FinvizScrapper',
      script: './index.js',     // Adjust to your main script
      // This will automatically restart the app at 6 PM every weekday (Mon–Fri)
      cron_restart: '0 18 * * 1-5',

      // Set where logs go. Make sure these directories exist or adjust them.
      out_file: '/var/log/my_screener_out.log',
      error_file: '/var/log/my_screener_err.log',

      // (Optional) Merge logs for simplicity:
      merge_logs: true,
    }
  ]
};
