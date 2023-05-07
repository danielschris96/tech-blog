const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE a blog
router.post('/blogs', withAuth, async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // UPDATE a blog
  router.put('/blogs/:id', withAuth, async (req, res) => {
    try {
      const blog = await Blog.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blog) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blog);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE a blog
  router.delete('/blogs/:id', withAuth, async (req, res) => {
    try {
      const blog = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blog) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blog);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;