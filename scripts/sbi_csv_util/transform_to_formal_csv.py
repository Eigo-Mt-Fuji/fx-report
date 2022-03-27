# -*- coding: utf-8 -*-

import csv

def transform_to_formal_csv(input_stream, output_stream):

    # see https://docs.python.org/3/library/csv.html#csv.reader
    reader = csv.reader(input_stream, delimiter=',')
    next(reader, None)

    # see https://docs.python.org/3/library/csv.html#csv.writer
    writer = csv.writer(output_stream, lineterminator='\n', delimiter=',')

    # formal header
    writer.writerow(
        [
            'order_no',
            'date',
            'lot_number',
            'currency',
            'buysell',
            'amount',
            'price',
            'rate',
            'fee',
            'swap',
            'pl',
            'total_pl'
        ]
    )

    rows = []
    for row in reader:
        rows.append(row)

    writer.writerows(rows)
    return len(rows)
