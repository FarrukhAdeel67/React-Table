import { useTable, useSortBy, usePagination } from "react-table";
import { data } from "./assets/data.json";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Salary",
    accessor: "salary",
  },
];
const App = () => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
    canPreviousPage,
    canNextPage,
    state:{pageIndex},//index no of the page 
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState:{
        pageSize:5,
        // pageIndex: 3 , //optional if want to start from specific page.
      }
    },
    useSortBy,
    usePagination
  );
  const props = getTableProps();
  return (
    <div className="container">
      <table {...props}>
        <thead>
          {headerGroups.map((hg) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted && (
                    <span>{column.isSortedDesc ? " V " : "A"}</span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  // eslint-disable-next-line react/jsx-key
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="buttonBar">
        <button disabled={pageIndex===0 } onClick={()=>gotoPage(0)}>First Page</button>
        <button disabled={!canPreviousPage} onClick={previousPage}>
          Prev Page
        </button>
        <span>{pageIndex+1} of {pageCount}</span>
        <button disabled={!canNextPage} onClick={nextPage}>
          Next Page
        </button>
        <button disabled={pageIndex===pageCount-1} onClick={()=>gotoPage(pageCount-1)}>Last Page</button>
      </div>
    </div>
  );
};

export default App;
