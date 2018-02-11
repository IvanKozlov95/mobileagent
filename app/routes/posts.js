const router		= require('express').Router();
const Middlewares	= require('../middleware');

router.post('/create', Middlewares.Auth.isAdmin
					, Middlewares.Common.fieldIsNotEmptyStringOrUndefined(['text'])
					, Middlewares.Post.create);

router.post('/like', Middlewares.Auth.isAuthenticated
					, Middlewares.Common.fieldIsValidObjectId(['post'])
					, Middlewares.Post.like);

router.post('/edit', Middlewares.Auth.isAdmin
					, Middlewares.Common.fieldIsValidObjectId(['post'])
					, Middlewares.Common.fieldIsNotEmptyStringOrUndefined(['text'])
					, Middlewares.Post.update);

router.get('/list', Middlewares.Post.getList);

router.get('/info', Middlewares.Common.fieldIsValidObjectId(['id'])
					, Middlewares.Post.fetch);

module.exports = router;