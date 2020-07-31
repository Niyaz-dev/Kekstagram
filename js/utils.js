function getRandomWholeNumber(from, till) {
    return Math.round(from - 0.5 + Math.random() * (till - from + 1));
}