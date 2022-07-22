const CONTENT_HEIGHT = 625;

export default function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        let j = randomInt(0, array.length - 1);
        swap(array, i, j);
    }
}

export function generateOrderedArray(arrayLength) {
    let array = [];
    let slope = CONTENT_HEIGHT / arrayLength;
    for (let i = 0; i < arrayLength; i++) {
        array.push((i + 1) * slope);
    }
    return array;
}

export function generateUnorderedArray(arrayLength) {
    let array = generateOrderedArray(arrayLength);
    shuffle(array);
    return array;
}
