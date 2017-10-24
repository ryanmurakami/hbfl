export default function (word) {
  if (!word) return word
  return word.slice(0, 1).toUpperCase() + word.slice(1)
}
