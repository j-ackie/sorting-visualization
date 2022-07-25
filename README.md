# Sorting Visualization

![Gif of merge sort](https://i.imgur.com/Hx9KuH0.gif)

## About the Project

Inspired by Timo Bingmann's [YouTube video](https://www.youtube.com/watch?v=kPRA0W1kECga) on the "visualization and 'audibilization'" of sorting algorithms, this project aims to replicate exactly that and also add an interactive component to it in the form of a web application. I also undertook this project to gain more experience with something I was not too familiar with before - sorting algorithms - and visually understand the advantages of certain sorting algorithms over others.

This sorting visualization was made with React, JavaScript, and CSS. Here's the [link](https://j-ackie.github.io/sorting-visualization/) to it.

### Notable Features

- Slider to change size of array and generate an array of integers in random order
- Slider to change sorting speed
- Dropdown list to select which sorting algorithm to use
- Dropdown list to select whether to sort by ascending or descending
- Beeping sound played when an element is accessed; its frequency is based on its height

### Sorting Algorithms Used
- O(n^2)
    - Bubble Sort
    - Selection Sort
    - Insertion Sort
- O(n log n)
    - Merge Sort
    - Quick Sort
    - Heap Sort
- O((n+1)!)
    - Bogo Sort

## Next Steps
- Allowing users to input their own arrays and sorting based off that
- Adding more sorting algorithms

## References
- Timo Bingmann's ["15 Sorting Algorithms in 6 Minutes"](https://www.youtube.com/watch?v=kPRA0W1kECga)
- GeeksforGeeks [list of sorting algorithms](https://www.geeksforgeeks.org/sorting-algorithms/)