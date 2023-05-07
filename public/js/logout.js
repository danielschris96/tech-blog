const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error logging out" });
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;