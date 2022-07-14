export default class BubbleSort {
    constructor(arr, setArray, setSelectedElement, setIsSorted, time_ms) {
        this.arr = arr;
        this.setArray = setArray;
        this.setSelectedElement = setSelectedElement;
        this.setIsSorted = setIsSorted;
        this.gt = null;
        this.time_ms = time_ms;
        this.isSorting = false;
        this.delay = time_ms => new Promise((resolve) => {
            setTimeout(resolve, time_ms);
        });
    }
    
    async beginSort() {
        this.isSorting = true;
        for (let i = 0; i < this.arr.length; i++) {
            for (let j = 0; j < this.arr.length - i - 1; j++) {
                if (!this.isSorting) {
                    this.setSelectedElement(null);
                    return;
                }
                this.setSelectedElement(j + 1);
                if (this.gt(this.arr[j], this.arr[j + 1])) {
                    let temp = this.arr[j];
                    this.arr[j] = this.arr[j + 1];
                    this.arr[j + 1] = temp;
                    this.setArray([...this.arr]);
                }
                await this.delay(this.time_ms);
            }
        }
        this.setIsSorted(true);
    }

    async sortCompleted() {
        for (let i = 0; i < this.arr.length; i++) {
            this.setSelectedElement(i);
            await this.delay(10);
        }
        this.endSort();
    }

    endSort() {
        this.isSorting = false;
    }

    sort(isGreaterThan) {
        if (!this.isSorting) {
            this.gt = isGreaterThan;
            this.beginSort().then(() => {
                this.sortCompleted();
            });
        }
    }
}