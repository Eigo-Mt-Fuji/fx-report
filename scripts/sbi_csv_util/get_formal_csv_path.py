# -*- coding: utf-8 -*-

import os
import re

def get_formal_csv_path(original_csv_file_path, dest_csv_dir):

    # https://docs.python.org/3/library/os.path.html#os.path.basename
    original_csv_base_name = os.path.basename(original_csv_file_path)

    # https://docs.python.org/3/library/re.html#search-vs-match
    match = re.search(r"^(kessai[0-9]{4})([0-9]{2})[0-9]{2}.csv$", original_csv_base_name)

    if match:
        year = match.group(0)
        month = match.group(1)

        return '{}/kessai{}{}.csv'.format(dest_csv_dir, year, month)
    else:
        # https://docs.python.org/3/tutorial/errors.html#raising-exceptions
        raise Exception("Original csv file name is illigal please re-check downloads/sbi/{}.".format(original_csv_file_path))

