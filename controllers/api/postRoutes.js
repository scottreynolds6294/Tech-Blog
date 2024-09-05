const router = require('express').Router();
const { Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create post', error: err.message });
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            }
        );

        if (affectedRows === 0) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update post', error: err.message });
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        await Comment.destroy({
            where: {
                post_id: req.params.id,
            },
        });

        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete post', error: err.message });
    }
});


module.exports = router;
