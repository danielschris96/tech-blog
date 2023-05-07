


router.post('/blog/:id/comments', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        text: req.body.text,
        blog_id: req.params.id,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });