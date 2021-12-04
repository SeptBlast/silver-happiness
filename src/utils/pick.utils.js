const Pick = (obj, keys) => {
	return keys.reduce((acc, key) => {
		if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
			acc[key] = obj[key];
		}
		return acc;
	}, {});
};

module.exports = Pick;
