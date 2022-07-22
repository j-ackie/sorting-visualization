import swap, { beep, randomInt } from "../helpers/helpers"


export default class Sort {
    constructor(arr, setArray, setSelectedElement, setIsSorted, time_ms) {
        this.arr = arr;
        this.setArray = setArray;
        this.setIsSorted = setIsSorted;
        this.time_ms = time_ms;
        this.isSorting = false;
        this.abort = false;
        this.isSoundOn = true;
        this.setSelectedElement = (index) => {
            setSelectedElement(index);
            if (index != null && this.isSoundOn) {
                beep(this.arr[index]);
            }
        };
        this.delay = time_ms => new Promise((resolve) => {
            setTimeout(resolve, time_ms);
        });
    }

    bubbleSort(isGreaterThan) {
        const beginSort = async() => {
            this.isSorting = true;
            for (let i = 0; i < this.arr.length; i++) {
                for (let j = 0; j < this.arr.length - i - 1; j++) {
                    if (!this.isSorting) {
                        this.setSelectedElement(null);
                        return;
                    }
                    this.setSelectedElement(j + 1);
                    if (isGreaterThan(this.arr[j], this.arr[j + 1])) {
                        swap(this.arr, j, j + 1);
                        this.setArray([...this.arr]);
                    }
                    await this.delay(this.time_ms);
                }
            }
        }

        const sort = () => {
            if (!this.isSorting) {
                beginSort().then(() => {
                    this.sortCompleted();
                });
            }
        }

        sort();
    }

    selectionSort(isGreaterThan) {
        const beginSort = async() => {
            this.isSorting = true;
            for (let i = 0; i < this.arr.length - 1; i++) {
                let min = i;
                for (let j = i + 1; j < this.arr.length; j++) {
                    if (!this.isSorting) {
                        this.setSelectedElement(null);
                        return;
                    }
                    this.setSelectedElement(j);
                    if (isGreaterThan(this.arr[min], this.arr[j])) {
                        min = j;
                    }
                    await this.delay(this.time_ms);
                }
                if (min !== i) {
                    swap(this.arr, min, i);
                    this.setArray([...this.arr]);
                }
            }
        }

        const sort = () => {
            if (!this.isSorting) {
                beginSort().then(() => {
                    this.sortCompleted();
                });
            }
        }

        sort();
    }

    insertionSort(isGreaterThan) {
        const beginSort = async() => {
            this.isSorting = true;
            for (let i = 1; i < this.arr.length; i++) {
                let key = this.arr[i];
                let j = i - 1;
                while (j >= 0 && isGreaterThan(this.arr[j], key)) {
                    if (!this.isSorting) {
                        this.setSelectedElement(null);
                        return;
                    }
                    this.setSelectedElement(j);
                    this.arr[j + 1] = this.arr[j];
                    j--;

                    this.setArray([...this.arr]);
                    await this.delay(this.time_ms);
                }
                this.arr[j + 1] = key;
            }
        }

        const sort = () => {
            if (!this.isSorting) {
                beginSort().then(() => {
                    this.sortCompleted();
                });
            }
        }

        sort();
    }

    mergeSort(isGreaterThan) {
        const merge = async(left, mid, right) => {
            let size1 = mid - left + 1;
            let size2 = right - mid;

            let L = new Array(size1);
            let R = new Array(size2);

            for (let i = 0; i < size1; i++) {
                L[i] = this.arr[left + i];
            }
            for (let i = 0; i < size2; i++) {
                R[i] = this.arr[mid + 1 + i];
            }

            let i = 0;
            let j = 0;
            let k = left;

            while (i < size1 && j < size2) {
                if (!this.isSorting) {
                    this.setSelectedElement(null);
                    return;
                }
                if (isGreaterThan(R[j], L[i])) {
                    this.arr[k] = L[i];
                    i++;
                }
                else {
                    this.arr[k] = R[j];
                    j++;
                }
                this.setSelectedElement(k);
                k++;

                await this.delay(this.time_ms);
            }

            while (i < size1) {
                if (!this.isSorting) {
                    this.setSelectedElement(null);
                    return;
                }
                this.arr[k] = L[i];
                this.setSelectedElement(k);
                i++;
                k++;

                await this.delay(this.time_ms);
            }

            while (j < size2) {
                if (!this.isSorting) {
                    this.setSelectedElement(null);
                    return;
                }
                this.arr[k] = R[j];
                this.setSelectedElement(k);
                j++;
                k++;

                await this.delay(this.time_ms);
            }
        }

        const beginSort = async(left, right) => {
            if (left >= right) {
                return;
            }
            let mid = left + parseInt((right - left) / 2);
            await beginSort(left, mid);
            await beginSort(mid + 1, right);
            await merge(left, mid, right);

        }

        const sort = () => {
            if (!this.isSorting) {
                this.isSorting = true;
                beginSort(0, this.arr.length - 1).then(() => {
                    this.sortCompleted();
                });
            }
        }

        sort();
    }

    quickSort(isGreaterThan) {
        const partition = async(low, high) => {
            let pivot = this.arr[high];
            let i = (low - 1);
            for (let j = low; j < high; j++) {
                if (!this.isSorting) {
                    this.setSelectedElement(null);
                    return;
                }
                if (isGreaterThan(pivot, this.arr[j])) {
                    i++;
                    swap(this.arr, i, j);
                    this.setSelectedElement(j);
                    await this.delay(this.time_ms);
                }
            }
            swap(this.arr, i + 1, high);
            return i + 1;
        }

        const beginSort = async(low, high) => {
            if (low >= high) {
                return;
            }

            let partition_index = await partition(low, high);
            if (!this.isSorting) {
                this.setSelectedElement(null);
                return;
            }
            
            await beginSort(low, partition_index - 1);
            await beginSort(partition_index + 1, high);
        }

        const sort = () => {
            if (!this.isSorting) {
                this.isSorting = true;
                beginSort(0, this.arr.length - 1).then(() => {
                    this.sortCompleted();
                });
            }
        }

        sort();
    }

    heapSort(isGreaterThan) {
        const heapify = async(n, i) => {
            if (!this.isSorting) {
                this.setSelectedElement(null);
                return;
            }
            let largest = i;
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (left < n && isGreaterThan(this.arr[left], this.arr[largest])) {
                largest = left;
            }
            if (right < n && isGreaterThan(this.arr[right], this.arr[largest])) {
                largest = right;
            }
            if (largest !== i) {
                swap(this.arr, i, largest);

                this.setSelectedElement(largest);
                await this.delay(this.time_ms);

                await heapify(n, largest);
            }
        }

        const beginSort = async() => {
            for (let i = Math.floor(this.arr.length / 2) - 1; i >= 0; i--) {
                if (!this.isSorting) {
                    this.setSelectedElement(null);
                    return;
                }
                await heapify(this.arr.length, i);
            }
            for (let i = this.arr.length - 1; i > 0; i--) {
                if (!this.isSorting) {
                    this.setSelectedElement(null);
                    return;
                }
                swap(this.arr, 0, i);
                this.setSelectedElement(i);
                await this.delay(this.time_ms);
                await heapify(i, 0);
            }
        }

        const sort = () => {
            this.isSorting = true;
            beginSort().then(() => {
                this.sortCompleted();
            })
        }

        sort();
    }

    bogoSort(isGreaterThan) {
        const shuffle = async() => {
            for (let i = 0; i < this.arr.length; i++) {
                if (!this.isSorting) {
                    this.setSelectedElement(null);
                    return;
                }
                let r = randomInt(0, this.arr.length - 1);
                swap(this.arr, i, r);
                this.setSelectedElement(r);

            }
            await this.delay(this.time_ms);
        }

        const isSorted = () => {
            for (let i = 0; i < this.arr.length - 1; i++) {
                if (isGreaterThan(this.arr[i], this.arr[i + 1])) {
                    return false;
                }
            }
            return true;
        }

        const beginSort = async() => {
            this.isSorting = true;
            while (!isSorted()) {
                if (!this.isSorting) {
                    this.setSelectedElement(null);
                    return;
                }
                await shuffle();
            }
            this.setIsSorted(true);
        }

        const sort = () => {
            if (!this.isSorting) {
                beginSort().then(() => {
                    this.sortCompleted();
                });
            }
        }

        sort();
    }

    async sortCompleted() {
        if (!this.isSorting) {
            return;
        }
        this.setIsSorted(true);
        for (let i = 0; i < this.arr.length; i++) {
            this.setSelectedElement(i);
            await this.delay(10);
        }
        this.endSort();
    }

    endSort() {
        this.isSorting = false;
    }
    
}