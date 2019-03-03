class Knapsack:
    def __init__(self, path: str):
        with open(path) as f:
            self.max_weight, self.cnt_of_items = [int(x) for x in f.readline().split()]
            self.items = []
            for _ in range(self.cnt_of_items):
                self.items.append(tuple([int(x) for x in f.readline().split()]))

    def calc(self) -> int:
        ax = [[x for x in range(self.max_weight + 1)], [0 for _ in range(self.max_weight + 1)]]
        for i in range(self.cnt_of_items):
            ax[0], ax[1] = ax[1], ax[0]
            for x in range(self.max_weight+1):
                # for wi item, wi[0] is its value, wi[1] is weight
                wi = self.items[i]
                sub_value = 0 if x - wi[1] <= 0 else ax[0][x - wi[1]] + wi[0]
                ax[1][x] = max(ax[0][x], sub_value)
            ax[0] = [0 for _ in range(self.max_weight + 1)]
        return ax[1][self.max_weight]


class App:
    def __init__(self):
        knapsack = Knapsack("knapsack1.txt")
        print(knapsack.calc())


App()
