import sys
sys.setrecursionlimit(2000000)


class Values:
    def __init__(self, w: int):
        self.store = [[] for _ in range(w)]

    def save(self, i: int, w: int, val: int):
        if i in [x for (x, y) in self.store[w - 1]]:
            return
        self.store[w - 1].append((i, val))

    def get(self, i: int, w: int) -> int:
        result = [y for (x, y) in self.store[w - 1] if x == i]
        if len(result):
            return result[0]
        return 0


class BigKnapsack:
    def __init__(self, path: str):
        with open(path) as file:
            self.max_weight, self.items_cnt = [int(x) for x in file.readline().split()]
            self.values = Values(self.max_weight)
            self.items = []
            for _ in range(self.items_cnt):
                self.items.append(tuple([int(x) for x in file.readline().split()]))

    def _store_weight(self, i: int, w: int):
        pass

    def _calc(self, i: int, w: int) -> int:
        if i == 0 or w == 0:
            return 0
        stored_value = self.values.get(i, w)
        if stored_value != 0:
            return stored_value
        # item[0] is value, item[1] is weight
        cur_item = self.items[i - 1]
        if cur_item[1] > w:
            return self._calc(i - 1, w)
        val1 = self._calc(i - 1, w)
        val2 = self._calc(i - 1, w - cur_item[1]) + cur_item[0]
        val = val1 if val1 > val2 else val2
        self.values.save(i, w, val)
        return val

    def calc(self) -> int:
        return self._calc(self.items_cnt, self.max_weight)


class App:
    def __init__(self):
        knapsack = BigKnapsack("knapsack_big.txt")
        print(knapsack.calc())


App()
