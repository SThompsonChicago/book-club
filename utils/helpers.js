const dayjs = require('dayjs');

module.exports = {
  format_current_date: () => {
    return dayjs().format('MM-DD-YYYY')
  },

format_created_date: (date) => {
  return date.toLocaleDateString();
  },
};
