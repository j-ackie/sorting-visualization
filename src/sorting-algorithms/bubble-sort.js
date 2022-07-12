export default function bubbleSort(arr, setArray, setSelectedElement, setIsSorted, gt, time_ms) {
    const delay = time_ms => new Promise((resolve) => setTimeout(resolve, time_ms));

    const sort = async() => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                setSelectedElement(j + 1);
                if (gt(arr[j], arr[j + 1])) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    setArray([...arr]);
                }
                await delay(time_ms);
            }
        }
        setSelectedElement(null);
        setIsSorted(true);
    }

    const sortCompleted = async() => {
        for (let i = 0; i < arr.length; i++) {
            setSelectedElement(i);
            await delay(10);
        }
    }

    sort().then(sortCompleted);
}