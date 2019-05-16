#!/usr/bin/env python
'''
Filename: getparam.py
Date: March 2019
Auther: Russell Loewe
Purpose: Simple way to pull a value from a csv file.
         Print value to STDOUT so shell script can read result
Use:  ./getparam.py {csvfilename} {value to lookfor} {parameter field name} {output fieldname}
'''
import csv
import sys

filename = sys.argv[1]
param = sys.argv[2]
paramField = sys.argv[3]
outField = sys.argv[4]


with open(filename, 'r') as csvFile:
    reader = csv.DictReader(csvFile, delimiter=',', quotechar='"')
    for row in reader:
        if row[paramField] == param:
            print(row[outField])
            break
