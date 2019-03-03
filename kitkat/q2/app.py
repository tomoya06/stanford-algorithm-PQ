from itertools import combinations
from typing import List


class Bits:
    def __init__(self, bits: str):
        self.bits = tuple([int(bit) for bit in bits.split()])
        self.weight = self._cal_weight(self.bits)

    def __sub__(self, other: "Bits"):
        return sum([x != y for (x, y) in zip(self.bits, other.bits)])

    def weights(self, change: int) -> List[int]:
        weights = []
        for xs in combinations(range(len(self.bits)), change):
            tmp = list(self.bits)
            for i in xs:
                tmp[i] = 1 - tmp[i]
            weights.append(self._cal_weight(tmp))
        return weights

    @staticmethod
    def _cal_weight(bits: List[int]) -> int:
        weight = 0
        for idx, i in enumerate(bits[::-1]):
            weight += (2 ** idx) * i
        return weight


class Cluster:
    def __init__(self, path: str):
        self.node_cnt = 0
        self.bit_len = 0
        self.hummings = []
        self.weights = {}
        self.parents = []

        with open(path) as file:
            self.node_cnt, self.bit_len = [int(x) for x in file.readline().split()]
            self.parents = list(range(self.node_cnt))
            for idx in range(self.node_cnt):
                new_bits = Bits(file.readline())
                self.hummings.append(new_bits)
                if new_bits.weight in self.weights:
                    self.weights[new_bits.weight].append(idx)
                else:
                    self.weights[new_bits.weight] = [idx]

    def do_cluster(self) -> int:
        for index, bits in enumerate(self.hummings):
            if index % 1000 == 0:
                print(index)
            weights = self._collect_weights(bits)
            indexes = self._find_indexes(weights)
            self._union(index, indexes)
        return self._count_cluster()

    def _find_parent(self, x: int) -> int:
        stack = []
        while self.parents[x] != x:
            stack.append(x)
            x = self.parents[x]
        for y in stack:
            self.parents[y] = x
        return x

    def _union(self, x: int, indexes: List[int]):
        parent = self._find_parent(x)
        for index in indexes:
            if parent != self._find_parent(index):
                self.parents[index] = parent

    @staticmethod
    def _collect_weights(bits: Bits) -> List[int]:
        return bits.weights(0) + bits.weights(1) + bits.weights(2)

    def _find_indexes(self, weights: List[int]) -> List[int]:
        indexes = []
        for weight in weights:
            if weight in self.weights:
                indexes += self.weights[weight]
        return indexes

    def _count_cluster(self) -> int:
        parents = set()
        for i in range(self.node_cnt):
            parents.add(self._find_parent(i))
        return len(parents)


class App:
    def __init__(self):
        self.cluster = Cluster("./clustering_big.txt")
        print(self.cluster.do_cluster())


app = App()
print("ok")
