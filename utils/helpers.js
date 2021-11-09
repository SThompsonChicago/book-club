const dayjs = require('dayjs');

module.exports = {
date_created: function (date) {return dayjs(new Date(date)).format('MM-DD-YYYY')}

};
