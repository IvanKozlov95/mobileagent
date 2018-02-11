const util	= require('../lib/util');

class CommonMiddleware {
	static fieldIsNotEmptyStringOrUndefined(fields) {
		return (req, res, next) => {
			let queryParams = req.method === 'POST' ? req.body : req.query;
			try {
				for (let field of fields) {
					util.checkText(queryParams[field]);
				}
			} catch (e) {
				next(e);
			}
			next();
		}
	}

	static fieldIsValidObjectId(fields) {
		return (req, res, next) => {
			let queryParams = req.method === 'POST' ? req.body : req.query;
			try {
				for (let field of fields) {
					util.checkObjectId(queryParams[field]);
				}
				next();
			} catch (e) {
				next(e);
			}
		}
	}
}

module.exports = CommonMiddleware;