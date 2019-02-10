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

## Homework 3

<s>Minimum Cut problem. Cope with Force and Randomized Contractions. But it might take some time to find out the minimum one. Currently my code, with both strateges, can only find the 20 cuts as minimum within an acceptable time, while the answer is 17.

Since there are totally $2^{200}$ solutions, I decide to skip the *loooong* waiting time.</s>

I AM TOTALLY WRONG IN LAST VERSION. 

IT IS THE EDGES that should be randomly chosen, rather than simply nodes. 
And I got the answer correctly. 

Code's in `eclair` folder. 

## Homework 4

Computing Strong Components problem. Current code takes a long time, due to the large data set. This also causes recursive call stack overflow, if using traditional recursive DFS algorithm. Therefore a stack is used in my code. 

There may still be some improvements on running speed. 

Code's in `Froyo` folder. `recursive_stack_check.js` is used to find the maximum recursive call stack depth. 

## Homework 5

Find shortest path with Dijktra Algorithm. Used both naive and with-heap ways. Heap is provided by NPM Heap. To run it, run `npm install` first.

Code's in `Ginderbread` folder.

## Homework 6.1

2-SUM Algorithm with hash table. The variant of 2sum is inspired by [sestus's](https://github.com/sestus/algorithms-stanford/blob/master/part_1/assignment_6_1_2sum/app/two_sum_finder.py) code. But he wierd part is, there is always out-of-border error with my bisect algorith, so I had to add a boundery check before adding a new number into the set. 

Code's in `honeycomb` folder.

## More Homework

To be continued...
