# -*- coding: utf-8 -*-

import sys

# https://docs.python.org/3/tutorial/modules.html
import sbi_csv_util

if len(sys.argv) != 3:
    # https://gist.github.com/JBlond/2fea43a3049b38287e5e9cefc87b2124
    print("\033[91mERROR: Command-line args invalid {}\033[0m".format(sys.argv))
    exit(1)

try:
    original_csv_file_path = sys.argv[1]
    dest_csv_dir = sys.argv[2]

    dest_file_path = sbi_csv_util.get_formal_csv_path(original_csv_file_path, dest_csv_dir)

    with open(original_csv_file_path, 'r', encoding='shift_jis') as input_stream:
        with open(dest_file_path, 'w', encoding='utf-8') as output_stream:

            row_count = sbi_csv_util.transform_to_formal_csv(input_stream, output_stream)

            print("\033[92mFile {} Row count={}\033[0m".format(original_csv_file_path, row_count))

except Exception as e:
    print('Handling run-time error:', e)
    exit(1)
