import csv
import os

print("Begin.")
print("\033[0m")
last_buysell = None

with open(os.path.join(os.path.dirname(__file__), 'list.csv'), 'r') as f:
    reader = csv.reader(f, delimiter=',', quoting=csv.QUOTE_NONE)
    if reader is not None:
        headers = next(reader, None)

        counter = 0
        buffer = []

        for row in reader:

            # update
            buffer.append(row)
            counter += 1

            date = row[1]
            if row[4] == "新規売" or row[4] == "新規買":
                index = counter - len(buffer) - 1
                last_settlement = 0
                first_open_interest_index = 0
                first_open_interest_row = 0
                for transaction in buffer:
                    index = index + 1
                    if transaction[4] == "決済売" or transaction[4] == "決済買":
                        last_settlement = index

                    elif (transaction[4] == "新規売" or transaction[4] == "新規買"):
                        first_open_interest_index = index
                        first_open_interest_row = row
                        break
                # 順番が不正
                if first_open_interest_index <= last_settlement:
                    print("\033[93m[NG]Row number {} buysell is invalid(row order is invalid) row={}".format(first_open_interest_index, first_open_interest_row))
                    print("\033[0mDone.")
                    exit(1)
                buffer = []

        # 新規建玉注文が存在しない決済注文が存在する
        if len(buffer) >= 1:
            print("\033[93m[NG]Row number {} buysell is invalid(no open interest found) row={}".format(counter, row))
            print("\033[0mDone.")
            exit(1)

print("\033[0m")
print("\033[92mRow count={}".format(counter))
print("\033[0mDone.")
