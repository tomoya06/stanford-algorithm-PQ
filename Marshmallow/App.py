import math


class Floyd:
    def __init__(self, path: str):
        with open(path) as f:
            self.vertex_cnt, self.edge_cnt = [int(x) for x in f.readline().split()]
            self.edges = []
            self.dist = [
                [math.inf for _ in range(self.vertex_cnt)]
                for _ in range(self.vertex_cnt)
            ]
            for i in range(self.vertex_cnt):
                self.dist[i][i] = 0
            for i in range(self.edge_cnt):
                _head, _tail, _weight = [int(x) for x in f.readline().split()]
                self.edges.append((_head, _tail, _weight))
                self.dist[_head - 1][_tail - 1] = _weight

    def run(self):
        for k in range(self.vertex_cnt):
            for i in range(self.vertex_cnt):
                for j in range(self.vertex_cnt):
                    if self.dist[i][j] > self.dist[i][k] + self.dist[k][j]:
                        self.dist[i][j] = self.dist[i][k] + self.dist[k][j]

        for k in range(self.vertex_cnt):
            if self.dist[k][k] < 0:
                print("THERE IS NEGATIVE CYCLE")
                return math.inf

        _shortest_path = math.inf
        for k in range(self.vertex_cnt):
            for i in range(self.vertex_cnt):
                if self.dist[k][i] < _shortest_path:
                    _shortest_path = self.dist[k][i]

        return _shortest_path


class App:
    def __init__(self):
        # floyd0 = Floyd('g0.txt')
        # print(floyd0.run())
        floyd = Floyd('g1.txt')
        print(floyd.run())
        floyd2 = Floyd('g2.txt')
        print(floyd2.run())
        floyd3 = Floyd('g3.txt')
        print(floyd3.run())


App()
