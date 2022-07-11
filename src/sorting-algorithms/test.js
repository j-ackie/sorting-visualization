import bubbleSort from "./bubble-sort"

function testSortingAlgorithm(algo) {
    let arr = [2, 4, -1, 5, 8, 20, 0];
    expect(arr.length).toBe(7);

    algo(arr);

    expect(arr.length).toBe(7);
    expect(arr).toEqual([-1, 0, 2, 4, 5, 8, 20]);

    arr = [];
    expect(arr.length).toBe(0);

    algo(arr);

    expect(arr.length).toBe(0);
    expect(arr).toEqual([]);

    arr = [-4, -4, -4, -4, -4, -4];
    expect(arr.length).toBe(6);
    
    algo(arr);

    expect(arr.length).toBe(6);
    expect(arr).toEqual([-4, -4, -4, -4, -4, -4]);
}

test("Bubble Sort", () => {
    testSortingAlgorithm(bubbleSort);
});