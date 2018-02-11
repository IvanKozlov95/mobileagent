class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.status = 404;
	}
}

class ObjectNotFoundError extends Error {
	constructor(object) {
		super(`${object} not found.`);
		this.status = 404;
	}
}

class BadRequestError extends Error {
	constructor(message) {
		message = message || 'Bad Request';
		super(message);
		this.status = 400;
	}
}

module.exports.NotFound		= NotFoundError;
module.exports.BadRequest	= BadRequestError;
module.exports.ObjectNotFound	= ObjectNotFoundError;