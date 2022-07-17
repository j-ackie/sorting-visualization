import Sort from "./Sort";

// function testSortingAlgorithm(algo) {
//     let arr = [2, 4, -1, 5, 8, 20, 0];
//     expect(arr.length).toBe(7);

//     algo(arr);

//     expect(arr.length).toBe(7);
//     expect(arr).toEqual([-1, 0, 2, 4, 5, 8, 20]);

//     arr = [];
//     expect(arr.length).toBe(0);

//     algo(arr);

//     expect(arr.length).toBe(0);
//     expect(arr).toEqual([]);

//     arr = [-4, -4, -4, -4, -4, -4];
//     expect(arr.length).toBe(6);
    
//     algo(arr);

//     expect(arr.length).toBe(6);
//     expect(arr).toEqual([-4, -4, -4, -4, -4, -4]);
// }

test("Bubble Sort", async() => {
    let array = [2, 4, -1, 5, 8, 20, 0];
    const setArray = (arr) => {
        array = arr;
    };

    let selectedElement = null;
    const setSelectedElement = (element) => {
        selectedElement = element;
    };

    let isSorted = false;
    const setIsSorted = (bool) => {
        isSorted = bool;
    };

    const isGreaterThan = (x, y) => {return x > y};

    let sortingAlgorithms = new Sort(array, setArray, setSelectedElement, setIsSorted, 4);

    await sortingAlgorithms.bubbleSort(isGreaterThan);

    expect(sortingAlgorithms.arr).toEqual([-1, 0, 2, 4, 5, 8, 20]);
});