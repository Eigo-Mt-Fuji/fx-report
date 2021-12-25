import csv
import os

print("Begin.")
print("\033[0m")
last_buysell = None
counter = 1

with open(os.path.join(os.path.dirname(__file__), 'list.csv'), 'r') as f:
    reader = csv.reader(f, delimiter=',', quoting=csv.QUOTE_NONE)
    if reader is not None:
        headers = next(reader, None)

        for row in reader:
            date = row[0]
            buysell = row[1]

            # validate        
            if last_buysell == None:
                last_buysell = buysell
            elif (buysell.startswith("新規") and last_buysell.startswith("新規")) or (buysell.startswith("決済") and last_buysell.startswith("決済")):
                print("\033[93m[NG]Row number {} buysell is invalid row={}".format(counter, row))
                print("\033[0mDone.")
                exit(1)

            # update
            last_buysell = buysell
            counter += 1

print("\033[0m")
print("\033[92mRow count={}".format(counter))
print("\033[0mDone.")
