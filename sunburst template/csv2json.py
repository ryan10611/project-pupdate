import csv
import json
import sys

tree = {}

reader = csv.reader(open('sortdata.csv', "rt"))
next(reader) 
for row in reader:
    subtree = tree
    for i, cell in enumerate(row):
        if cell:
            if cell not in subtree:
                subtree[cell] = {} if i<len(row)-1 else 1
            subtree = subtree[cell]

print(json.dumps(tree, indent=3))