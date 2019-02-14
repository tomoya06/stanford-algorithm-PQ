class Edge: 
    def __init__(self, left, rigt, wei):
        self.left = left
        self.rigt = rigt
        self.wegt = wei

    def __lt__(self, other):
        return self.wegt > other.wegt


class Vertex: 
    def __init__(self, idx, edges = []):
        self.index = idx
        self.edges = []
        self.__min_edge = None
        for edge in edges:
            self.edges.append(edge)
            if self.__min_edge is None or edge < self.__min_edge:
                self.__min_edge = edge
    
    @property
    def min(self):
        return self.__min_edge.wegt

    def update_min(self, visited_set):
        self.edges = [edge for edge in self.edges if edge.rigt not in visited_set]


class VTHeap:
    def __init__(self):
        self.list = []

    def __position_relation(self, idx: int) -> int:
        left_child_idx = idx * 2 + 1
        rigt_child_idx = idx * 2 + 2
        if (left_child_idx < len(self.list) and self.list[idx] < self.list[left_child_idx]):
            return 1
        if (rigt_child_idx < len(self.list) and self.list[idx] < self.list[rigt_child_idx]):
            return 2
        parent_idx = (idx-1) // 2
        if (idx != 0 and self.list[parent_idx] < self.list[idx]):
            return 3
        return 0

    def __is_right_position(self, idx: int) -> bool: 
        return True if self.__position_relation(idx) == 0 else False

    def __bubble_up(self, idx): 
        cur_idx = idx
        while (not self.__is_right_position(cur_idx)):
            parent_idx = (cur_idx-1) // 2
            self.list[cur_idx], self.list[parent_idx] = self.list[parent_idx], self.list[cur_idx]
            cur_idx = parent_idx

    def __bubble_down(self, idx):
        if (len(self.list) <= 0):
            return 
        self.list.insert(0, self.list.pop(idx))
        cur_idx = 0
        while (not self.__is_right_position(cur_idx)):
            left_child_idx = cur_idx * 2 + 1
            rigt_child_idx = cur_idx * 2 + 2
            if (rigt_child_idx < len(self.list) and self.list[rigt_child_idx].lgt(self.list[left_child_idx])):
                self.list[cur_idx], self.list[rigt_child_idx] = self.list[rigt_child_idx], self.list[cur_idx]
                cur_idx = rigt_child_idx
            else:
                self.list[cur_idx], self.list[left_child_idx] = self.list[left_child_idx], self.list[cur_idx]
                cur_idx = left_child_idx

    def update_visited(self, visited: set): 
        for node in self.list:
            node.update_min(visited)

    def push(self, vertex):
        self.list.append(vertex)
        self.__bubble_up(len(self.list) - 1)

    def pop(self, nodeidx):
        listidx = self.list.index({ 'index': nodeidx })
        end_node = self.list[-1]
        return_node = self.list[listidx]
        self.list[listidx] = end_node
        self.list.pop()
        pos_res = self.__position_relation(listidx)
        if pos_res == 0:
            pass
        elif pos_res == 3:
            self.__bubble_up(listidx)
        else:
            self.__bubble_down(listidx)
        return return_node


