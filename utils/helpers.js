const dayjs = require('dayjs');

module.exports = {
  date_created: (date) => {
    return dayjs(date).format('MM-DD-YYYY')
  }
};
