const dayjs = require('dayjs');

module.exports = {
format_date: () => {
  return dayjs().format('MM-DD-YYYY')
}
};
