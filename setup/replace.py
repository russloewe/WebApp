#!/usr/bin/env python
import fileinput
import csv
import sys

csvfilename = sys.argv[1]
parsefilename = sys.argv[2]
strings = []
print("Parsing "+ parsefilename +" with "+csvfilename)

def replace_all(text, points):
    for point in points:
        text = text.replace(point['in'], point['out'])
    return text
    
with open(csvfilename, 'r') as csvfile:
         spamreader = csv.DictReader(csvfile, delimiter=',', quotechar='"')
         for line in spamreader:
             strings.append(line)

with open(parsefilename, 'r') as in_file:
    text = in_file.read()


for item in strings:
    with open(parsefilename, 'w+') as out_file:
        out_file.write(replace_all(text, strings))

