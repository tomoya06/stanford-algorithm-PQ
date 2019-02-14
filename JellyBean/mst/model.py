from heapq import heapify, heappop, heappush

class Edge:
    def __init__(self, left, rigt, wegt):
        self.left = left
        self.rigt = rigt
        self.wegt = wegt

    def __lt__(self, other):
        return self.wegt < other.wegt

class Prim:
    def __init__(self, filedir):
        f = open(filedir, 'r')
        self.vertex_cnt, self.edge_cnt = [int(x) for x in f.readline().split()]
        self.visited = []
        self.weights = []
        self.heap = []
        for _ in range(self.edge_cnt):
            l, r, w = [int(x) for x in f.readline().split()]
            heappush(self.heap, Edge(l, r, w))
        self.__visit(1)
    
    def __visit(self, nodeidx, wegt = 0):
        self.visited.append(nodeidx)
        self.weights.append(wegt)
    
    def __find_next(self):
        tmp_list = []
        while self.heap:
            top = heappop(self.heap)
            leftin = top.left in self.visited 
            rigtin = top.rigt in self.visited
            # This is what you're looking for
            if leftin and not rigtin:
                self.__visit(top.rigt, top.wegt)
                break
            elif rigtin and not leftin:
                self.__visit(top.left, top.wegt)
                break
            elif rigtin and leftin:
                pass
            else:
                tmp_list.append(top)
        for edge in tmp_list:
            heappush(self.heap, edge)

    def build(self):
        while len(self.visited) < self.vertex_cnt:
            self.__find_next()
        total_cost = 0
        for vst in self.weights:
            total_cost += vst
        return total_cost
