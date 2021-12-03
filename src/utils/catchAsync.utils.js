const catchAsync = (fn) => {
	Promise.resolve(fn(req, res, next)).catch((err) => {
		next(err);
	});
};

module.exports = catchAsync;
