var counter = 0;
const getNumberOfBinaryOnesRecursive = number => {
    if (number > 0) {
        let newNumber = number & (number - 1);
        counter++;
        return getNumberOfBinaryOnesRecursive(newNumber);
    }
    return counter;
};

console.log(getNumberOfBinaryOnesRecursive(93)); // (5) Binary Number: 1011101
