
import * as React from 'react';
import clsx from 'clsx';
//@material-ui/core -> @mui/material @material-ui/icons -> @mui/icons-material  https://zenn.dev/h_yoshikawa0724/articles/2021-09-26-material-ui-v5
// https://mui.com/guides/migration-v4/#mui-material-styles
import { withStyles, WithStyles } from '@mui/styles';
import { Theme, createTheme } from '@mui/material/styles';

import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import {
  AutoSizer,
  Column,
  Table,
  TableCellRenderer,
  TableHeaderProps
} from 'react-virtualized';

interface Data {
    id: string;
    time: string;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
}
interface ColumnData {
    dataKey: string;
    label: string;
    numeric?: boolean;
    width: number;
}
  
interface Row {
    index: number;
}
interface MuiVirtualizedTableProps extends WithStyles<typeof styles>{
    columns: readonly ColumnData[];
    headerHeight?: number;
    onRowClick?: () => void;
    rowCount: number;
    rowGetter: (row: Row) => Data;
    rowHeight?: number;
}
// TODO: 明度を調整するにはhsl値を使うのがgood
// https://www.w3schools.com/colors/colors_picker.asp
// https://htmlcss.jp/css/background-color.html
const styles = (theme: Theme) => ({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    table: {
      '& .ReactVirtualized__Table__headerRow': {
        ...(theme.direction === 'rtl' && {
          paddingLeft: '0 !important',
        }),
        ...(theme.direction !== 'rtl' && {
          paddingRight: undefined,
        }),
      },
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
    hoge: {
      flex: 1,
      backgroundColor: 'hsl(120, 100%, 95%)'
    },
} as const);

const MuiVirtualizedTable = (props: MuiVirtualizedTableProps) => {

    const getRowClassName = ({ index }: Row) => {
        const { classes, onRowClick } = props;
        return clsx(classes.tableRow, classes.flexContainer, {
          [classes.tableRowHover]: index !== -1 && onRowClick != null,
        });
    };
    
    const cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
        const { columns, classes, rowHeight, onRowClick } = props;
        
        const className = clsx(classes['hoge'], classes.flexContainer, {
            [classes.noClick]: onRowClick == null,
        });
        // TODO: セルの背景色を、値に応じて切り替える処理を実装
        // 1列目はヘッダなのでセルの背景色は白色固定でOK
        // 1列目の判定方法は、columnIndexが0の場合1列目とする(columnIndexは0始まりなので、1列目とはcolumnIndex=0であることと同義)
        // MuiVirtualizedTable-tableCell-49 MuiVirtualizedTable-flexContainer-45 MuiVirtualizedTable-noClick-50
        if (columnIndex == 0) {
            console.log(className);
            // console.log(`${classes['hoge']}`);
            // if (cellData >= 100) {
            //     console.log(`cellRenderer: ${columnIndex} ${classes.tableCell} ${cellData}`);
            //     console.log(`${classes.flexContainer}`);
            // }
        }
        return (
          <TableCell
            component="div"
            className={className}
            variant="body"
            style={{ height: rowHeight }}
            align={
              (columnIndex != null && columns[columnIndex].numeric) || false
                ? 'right'
                : 'left'
            }
          >
            {cellData}
          </TableCell>
        );
    };
    
    const headerRenderer = ({label, columnIndex}: TableHeaderProps & { columnIndex: number }) => {
        console.log(props);
        const { headerHeight, columns, classes } = props;

        // TODO: もしかしてヘッダ不要?
        return (
          <TableCell
            component="div"
            className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
            variant="head"
            style={{ height: headerHeight }}
            align={columns[columnIndex].numeric || false ? 'right' : 'left'}
          >
            <span>{label}</span>
          </TableCell>
        );
    };
 
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = props;
    console.log(rowHeight);
    return (
        <AutoSizer>
        {({ height, width }) => (
            <Table
            height={height}
            width={width}
            gridStyle={{
                direction: 'inherit',
            }}
            rowHeight={rowHeight!}
            headerHeight={headerHeight!}
            className={classes.table}
            {...tableProps}
            rowClassName={getRowClassName}
            >
            {columns.map(({ dataKey, ...other }, index) => {
                return (
                <Column
                    key={dataKey}
                    headerRenderer={
                        (headerProps) => headerRenderer({...headerProps, columnIndex: index,})
                    }
                    className={classes.flexContainer}
                    cellRenderer={cellRenderer}
                    dataKey={dataKey}
                    {...other}
                />
                );
            })}
            </Table>
        )}
        </AutoSizer>
    );
}

const defaultTheme = createTheme();
const StyledMuiVirtualizedTable = withStyles(styles, { defaultTheme })(MuiVirtualizedTable);
  
export default function FxAnalysisWeekHourTable({data}: any) {

    // TODO: この部分を取引実績データから算出した曜日別・時間帯別の配列で置き換え
    type Sample = [string, number, number, number, number, number];
    const sample: readonly Sample[] = [
        ['10:00', 159, 6.0, 24, 4.0, 10.0],
        ['11:00', 237, 9.0, 37, 4.3, 10.0],
        ['12:00', 262, 16.0, 24, 6.0, 10.0],
        ['13:00', 305, 3.7, 67, 4.3, 10.0],
        ['14:00', 356, 16.0, 49, 3.9, 10.0],
    ];
    const sampleColumns = [
        {
            width: 200,
            label: '',
            dataKey: 'time',
        },  
        {
          width: 200,
          label: '月',
          dataKey: 'monday',
        },
        {
          width: 120,
          label: '火',
          dataKey: 'tuesday',
          numeric: true,
        },
        {
          width: 120,
          label: '水',
          dataKey: 'wednesday',
          numeric: true,
        },
        {
          width: 120,
          label: '木',
          dataKey: 'thursday',
          numeric: true,
        },
        {
          width: 120,
          label: '金',
          dataKey: 'friday',
          numeric: true,
        },
      ];
    
    const rows: Data[] = sample.map( (d: any, index: number) => {

        return {
            id: `${index}`,
            time: d[0],
            monday: d[1],
            tuesday: d[2],
            wednesday: d[3],
            thursday: d[4],
            friday: d[5]
        } as Data
    })

    console.log(rows);
    return (
      <Paper style={{ height: 500, width: '100%' }}>
        <StyledMuiVirtualizedTable
          rowCount={rows.length}
          
          rowGetter={({ index }) => rows[index]}
          rowHeight={40}
          headerHeight={40}
          columns={sampleColumns}
        />
      </Paper>
    );
  }
  