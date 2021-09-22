// from https://github.com/sindresorhus/array-shuffle

module.exports = function arrayShuffle (array) {
	if (!Array.isArray(array)) {
		throw new TypeError(`Expected an array, got ${typeof array}`)
	}

	let newIndex

	array = [...array]

	for (let index = array.length - 1; index > 0; index--) {
		newIndex = Math.floor(Math.random() * (index + 1))
		[array[index], array[newIndex]] = [array[newIndex], array[index]]
	}

	return array
}