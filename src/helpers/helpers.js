const CONTENT_HEIGHT = 625;
const AUDIO_CONTEXT = new AudioContext();

export default function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export function beep(value) {
    let oscillator = new OscillatorNode(AUDIO_CONTEXT);
    let gain = new GainNode(AUDIO_CONTEXT);

    oscillator.type = "square";
    oscillator.frequency.value = value;
    gain.gain.value = 0.005;
    oscillator.connect(gain).connect(AUDIO_CONTEXT.destination);
    oscillator.start()

    setTimeout(() => {
        oscillator.stop()
    }, 50);
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
