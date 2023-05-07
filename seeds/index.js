const sequelize = require('../config/connection');
const { Blog } = require('../models');
const { User } = require('../models');
const { Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData);
  await Blog.bulkCreate(blogData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();