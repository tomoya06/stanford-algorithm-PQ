from heapq import heapify, heappop


class Distance:
    def __init__(self, a: int, b: int, dis: int):
        self.left = a
        self.rigt = b
        self.dist = dis

    def __lt__(self, other: "Distance"):
        return self.dist < other.dist


class Cluster:
    def __init__(self, path: str, k: int):
        self.target_k = k
        self.node_cnt = 0
        self.cluster_cnt = 0
        self.distances = []
        self.parent = []
        f = open(path)
        self.node_cnt = self.cluster_cnt = int(f.readline())
        self.parent = list(range(self.node_cnt))
        for li in f:
            _a, _b, _dis = [int(x) for x in li.split()]
            self.distances.append(Distance(_a - 1, _b - 1, _dis))
        heapify(self.distances)

    def do_cluster(self):
        while self.cluster_cnt != self.target_k:
            _left, _rigt, _ = self.__find_min()
            if _left is None:
                print("Heap Error")
                raise SystemExit
            self.__union(_left, _rigt)

    def __find_min(self) -> [int, int, int]:
        _left: int = None
        _rigt: int = None
        _dist: int = None
        while self.distances:
            _dis: Distance = heappop(self.distances)
            _left = _dis.left
            _rigt = _dis.rigt
            if self.__find(_left) != self.__find(_rigt):
                _dist = _dis.dist
                break
        return [_left, _rigt, _dist]

    def __find(self, x: int) -> int:
        stack = []
        while self.parent[x] != x:
            stack.append(x)
            x = self.parent[x]
        for i in stack:
            self.parent[i] = x
        return x

    def __union(self, x: int, y: int):
        x_height = 0
        y_height = 0
        while self.parent[x] != x:
            x_height += 1
            x = self.parent[x]
        while self.parent[y] != y:
            y_height += 1
            y = self.parent[y]
        if x_height > y_height:
            self.parent[y] = x
        else:
            self.parent[x] = y
        self.cluster_cnt -= 1

    def cal_spacing(self) -> int:
        _left: int = None
        _rigt: int = None
        _dist: int = None
        while self.distances:
            _dis: Distance = heappop(self.distances)
            _left = _dis.left
            _rigt = _dis.rigt
            if self.__find(_left) != self.__find(_rigt):
                _dist = _dis.dist
                break
        return _dist


class App:
    def __init__(self):
        clus = Cluster("clustering1.txt", 4)
        clus.do_cluster()
        spac = clus.cal_spacing()
        print(spac)


App()
