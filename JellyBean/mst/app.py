from model import Prim
import os

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
path = os.path.join(__location__, 'edges.txt')

prim = Prim(path)
print(prim.build())

