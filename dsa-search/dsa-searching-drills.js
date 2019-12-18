//--------------------------------------------------
// 1. How many searches?

function binarySearch(array, value, count = 0, start, end) {
    var start = start === undefined ? 0 : start;
    var end = end === undefined ? array.length : end;
    if (start > end) {
        return { result: -1, count }
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];
    console.log(index)
    console.log(start, end);
    if (item == value) {
        return index;
    }
    else if (item < value) {
        return binarySearch(array, value, count = count + 1, index + 1, end);
    }
    else if (item > value) {
        return binarySearch(array, value, count = count + 1, start, index - 1);
    }

};

// a.
binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 1)

// first it will check the middle of the list, 12. Then it will check halfway between 0 and 12, 6. Then it will check halfway between 6 and 12 to find the target, 8.
// [12, 6, 8]

// b.
// binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 16)
// first it will check the middle of the list, 12. Then it will check halfway between 12 and the end of the list, 17. Then it will check halfway between 17 and 12, 14. Then it will check halfway between 14 and 17, 15. Then the search will end because there are no more numbers to check and 16 is not in the list.
// [12, 17, 14, 15] *item not found


//--------------------------------------------------
// 3. Find a book

// function findBook(deweyIndex, title, ddsData) {
//     if (deweyIndex < 000 || deweyIndex > 1000) {
//         return 'index must be between 000 and 1000'
//     }
//     let section = binarySearch(ddsData, deweyIndex)
//     if (section.result < 0)
// }


