const Blog = require('./blog');
const User = require('./user');
const Comment = require('./comment');

User.hasMany(Blog, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { Blog, User, Comment };