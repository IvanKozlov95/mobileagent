class MyError extends Error {}

class NotFoundError extends MyError {
	constructor(message) {
		super(message);
		this.status = 404;
	}
}

class ObjectNotFoundError extends MyError {
	constructor(object) {
		super(`${object} not found.`);
		this.status = 404;
	}
}

class BadRequestError extends MyError {
	constructor(message) {
		message = message || 'Bad Request';
		super(message);
		this.status = 400;
	}
}

class UnauthorizedAcsessError extends MyError {
	constructor(message) {
		message = message || 'Unauthorized Acsess';
		super(message);
		this.status = 401;
	}
}

module.exports.NotFound		= NotFoundError;
module.exports.MyError		= MyError;
module.exports.BadRequest	= BadRequestError;
module.exports.ObjectNotFound	= ObjectNotFoundError;
module.exports.UnauthorizedAcsess	= UnauthorizedAcsessError;