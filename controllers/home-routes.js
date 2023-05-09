const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth.js')

router.post('/login', async (req, res) => {
  try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      if (!userData) {
          res.redirect('/login');
          return;
      }

      const validPassword = await userData.checkPassword(req.body.password);
      if (!validPassword) {
          res.redirect('/login');
          return;
      }

      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          res.redirect('/homepage'); 
      });

  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
      const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.userId = userData.id;
        req.session.loggedIn = true;
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // render the login page
    res.render('login');
});

router.get('/', async (req, res) => {
  try {
    const blogsData = await Blog.findAll({
      include: [{ model: User }, { model: Comment, include: [{ model: User }] }]
    });
    const blogs = blogsData.map(blog => blog.get({ plain: true }));
    
    res.render('homepage', { blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', (req, res) => {
  res.render('homepage'); // render the homepage template
});

// GET dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Blog }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('dashboard', { user, logged_in: true });
  
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;