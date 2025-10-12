import React from 'react';
import styles from './styles.module.scss';

export interface DatagridColumn<T = any> {
  key: string;
  header: string;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DatagridProps<T = any> {
  columns: DatagridColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
}

export function Datagrid<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  striped = false,
  hoverable = true,
  className = ''
}: DatagridProps<T>) {
  return (
    <div className={`${styles.datagridWrapper} ${className}`}>
      <table className={styles.datagrid}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={styles.th}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`
                ${styles.tr}
                ${striped && rowIndex % 2 === 1 ? styles.striped : ''}
                ${hoverable ? styles.hoverable : ''}
                ${onRowClick ? styles.clickable : ''}
              `}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={column.key} className={styles.td}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
