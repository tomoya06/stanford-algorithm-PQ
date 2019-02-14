from models import Job, JobHeap
import os

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))


class Schedule:
    def __init__(self, path):
        self.heap = JobHeap()
        f = open(path, 'r')
        jobs_cnt = int(f.readline())
        for _ in range(jobs_cnt):
            li = f.readline()
            w, l = [int(x) for x in li.split()]
            self.heap.push(Job(w, l))
        print(self.heap.jobs.__len__())
    
    def cal_total_time(self):
        sum = 0
        lasttime = 0
        while self.heap.is_poppable:
            top = self.heap.pop()
            lasttime += top.length 
            sum += top.weight * lasttime
        return sum


path = os.path.join(__location__, 'jobs.txt')
schedule = Schedule(path)
print(schedule.cal_total_time())