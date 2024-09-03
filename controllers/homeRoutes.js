const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username']}],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('home', { 
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve posts', error: err.message });
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve post', error: err.message });
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve dashboard posts', error: err.message });
    }
});

router.get('/dashboard/new', withAuth, (req, res) => {
    res.render('new-post', {
        logged_in: req.session.logged_in,
    });
});

router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('edit-post', {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve post for editing', error: err.message });
    }
});

module.exports = router;
