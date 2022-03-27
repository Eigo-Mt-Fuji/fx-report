import csv
import os
import sys

csv_file_path = sys.argv[1]
if os.path.exists(csv_file_path) == False:
    print('File {} does not exists, skip.'.format(csv_file_path) )
    exit(1)

with open(csv_file_path, 'r') as f:
    reader = csv.reader(f, delimiter=',', quoting=csv.QUOTE_NONE)
    if reader is not None:
        headers = next(reader, None)

        counter = 0
        buffer = []

        for row in reader:
            if len(row) < 5:
                print('ERROR: File {} index={} row column length is {}. must larger than 5'.format(csv_file_path, counter, len(row)))
                print(row)
                exit(1)

            date = row[1]
            buysell = row[4]

            # update
            buffer.append(row)
            counter += 1

            if buysell == "新規売" or buysell == "新規買":
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
                buffer = []
                # 順番が不正
                if first_open_interest_index <= last_settlement:
                    print("\033[93m[NG]File {} Row number {} buysell is invalid(row order is invalid) row={}".format(csv_file_path, first_open_interest_index, first_open_interest_row))
                    print("\033[0mDone.")
                    exit(1)

        # 新規建玉注文が存在しない決済注文が存在する
        if len(buffer) >= 1:
            print("\033[93m[NG]File {} Row number {} buysell is invalid(no open interest found) row={}, buffer={}".format(csv_file_path, counter, row, buffer))
            print("\033[0mDone.")
            exit(1)

print("\033[92mFile {} Row count={}\033[0m".format(csv_file_path, counter))
