# Stanford Algorithm Programming Assignment

Online Course Website: [Part 1](https://lagunita.stanford.edu/courses/course-v1:Engineering+Algorithms1+SelfPaced/course/) and [Part 2](https://lagunita.stanford.edu/courses/course-v1:Engineering+Algorithms2+SelfPaced/course/)

Work in NodeJS. 

## Homework 1

Programming assignment is an implement of "Divide and Conquer". Find inversion amount among 100000 non-sorted-and-non-repeated numbers. See `cupcake` folder. 

## Homework 2

The assignment is about Quick Sort. It's a lot different from CN textbook. 

* Both algorithms use two pointers for scanning a sub-array, and use the first item as pivot. If necessary swap the wanted one with it.
* In CN textbook, pivot will be picked out of the array, whose position remains to be sit. One pointer points at the first item of array initially, which is empty now, and the other points at the end. They move towards each other. The right one always find if current item is larger than the pivot, move first, and the left one find if smaller, stand by. Once a misplaced item is found, swap it with the item pointed by the other pointer, and wake up the other pointer to work, stand by itself. Until they come to meet, where's the correct position for pivot, and just bring in it. 
* However in Stanford's, it changes a lot. The major difference is they move the same direction. 

As I didn't read through the whole Quick Sort slides, that difference cost me some time, and, of course, some attempts. 

Nevertheless, code's in `donut` folder.

## More Homework

To be continued...