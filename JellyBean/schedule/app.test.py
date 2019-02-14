from models import Job, JobHeap
import os

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

heap = JobHeap()
f = open(os.path.join(__location__, 'jobs.test.txt'), 'r')
for li in f:
    w, l = [int(x) for x in li.split()]
    heap.push(Job(w, l))

heap.print()

print('---')

sum = 0
lasttime = 0

while (len(heap.jobs) > 0):
    top = heap.pop()
    lasttime += top.length 
    sum += top.weight * lasttime
    print(top.weight, top.length, top.gap)

print(sum)