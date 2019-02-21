from itertools import combinations


class Bits:
    def __init__(self, bits: str):
        self._bits = tuple([int(bit) for bit in bits.split()])

    def __sub__(self, other: "Bits"):
        assert len(self._bits) == len(other._bits)
        return sum([x != y for (x, y) in zip(self._bits, other._bits)])


class ClusterLarge:
    def __init__(self, path: str):
        self._node_cnt = 0
        self._bit_cnt = 0
        self._cluster_cnt = 0
        self._bits = []
        self._parents = []

        with open(path) as file:
            self._node_cnt, self._bit_cnt = [int(x) for x in file.readline().split()]
            self._cluster_cnt = self._node_cnt
            self._parents = list(range(self._node_cnt))
            for num in range(self._node_cnt):
                self._bits.append(Bits(file.readline()))

    def do_cluster(self) -> int:
        for (x, y) in combinations(range(self._node_cnt), 2):
            dist = self._bits[x] - self._bits[y]
            if dist < 3:
                if self._find(x) != self._find(y):
                    self._union(x, y)
        return self._cluster_cnt

    def _find(self, x: int) -> int:
        stack = []
        while self._parents[x] != x:
            stack.append(x)
            x = self._parents[x]
        for i in stack:
            self._parents[i] = x
        return x

    def _union(self, x: int, y: int):
        x_height = 0
        y_height = 0
        while self._parents[x] != x:
            x_height += 1
            x = self._parents[x]
        while self._parents[y] != y:
            y_height += 1
            y = self._parents[y]
        if x_height > y_height:
            self._parents[y] = x
        else:
            self._parents[x] = y
        self._cluster_cnt -= 1


class App:
    def __init__(self):
        clus = ClusterLarge("./clustering_big.txt")
        cnt = clus.do_cluster()
        print(cnt)


App()