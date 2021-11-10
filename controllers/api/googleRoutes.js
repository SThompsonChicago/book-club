const router = require('express').Router();
const {Book} = require('../../models');
const axios = require('axios');

router.get('/:bookToSearch', async(req, res) => {
  let bookToSearch = req.params.bookToSearch;
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookToSearch}&key=AIzaSyA-hqQjqpuIodg2ouHkE0ZWaQehBv4DCF8`);
    console.log(response.data);
    res.json(response.data);
  

  } catch(err) {
    res.status(400).json(err);
  }
})

module.exports = router;