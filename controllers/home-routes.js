const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      if (!userData) {
        req.flash('error', 'Incorrect email or password');
        res.redirect('/login');
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
      if (!validPassword) {
        req.flash('error', 'Incorrect email or password');
        res.redirect('/login');
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.redirect('/');
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // GET all blogs
router.get('/', async (req, res) => {
    try {
      const blogsData = await Blog.findAll();
      const blogs = blogsData.map((blog) => blog.get({ plain: true }));
  
      res.render('homepage', { blogs });
    } catch (err) {
      res.status(500).json(err);
    }
  });