const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const userData = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!userData[0]) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.status(200).json({ message: 'User updated successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.status(200).json({ message: 'User deleted successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;