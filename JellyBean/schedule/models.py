class Job: 
    def __init__(self, w: int, l: int):
        self.weight = w
        self.length = l
        # self.gap = w - l
        self.gap = w/l
    
    def lgt(self, job2: 'Job'):
        return (self.gap > job2.gap or 
            self.gap == job2.gap and self.weight >= job2.weight)

class JobHeap: 
    def __init__(self):
        self.jobs = []
    
    def __is_right_position(self, idx: int) -> bool: 
        left_child_idx = idx * 2 + 1
        rigt_child_idx = idx * 2 + 2
        if (left_child_idx < len(self.jobs) and not self.jobs[idx].lgt(self.jobs[left_child_idx])):
            return False
        if (rigt_child_idx < len(self.jobs) and not self.jobs[idx].lgt(self.jobs[rigt_child_idx])):
            return False
        parent_idx = (idx-1) // 2
        if (idx != 0 and not self.jobs[parent_idx].lgt(self.jobs[idx])):
            return False
        return True
    
    def __bubble_up(self): 
        cur_idx = len(self.jobs) - 1
        while (not self.__is_right_position(cur_idx)):
            parent_idx = (cur_idx-1) // 2
            self.jobs[cur_idx], self.jobs[parent_idx] = self.jobs[parent_idx], self.jobs[cur_idx]
            cur_idx = parent_idx
        
    def __bubble_down(self):
        if (len(self.jobs) <= 0):
            return 
        self.jobs.insert(0, self.jobs.pop())
        cur_idx = 0
        while (not self.__is_right_position(cur_idx)):
            left_child_idx = cur_idx * 2 + 1
            rigt_child_idx = cur_idx * 2 + 2
            if (rigt_child_idx < len(self.jobs) and self.jobs[rigt_child_idx].lgt(self.jobs[left_child_idx])):
                self.jobs[cur_idx], self.jobs[rigt_child_idx] = self.jobs[rigt_child_idx], self.jobs[cur_idx]
                cur_idx = rigt_child_idx
            else:
                self.jobs[cur_idx], self.jobs[left_child_idx] = self.jobs[left_child_idx], self.jobs[cur_idx]
                cur_idx = left_child_idx

    def push(self, job: Job):
        self.jobs.append(job)
        self.__bubble_up()

    def pop(self) -> Job: 
        top = self.jobs.pop(0)
        self.__bubble_down()
        return top

    @property
    def is_poppable(self) -> bool:
        return len(self.jobs) > 0

    def print(self):
        for job in self.jobs:
            print(job.weight, job.length, job.gap)
