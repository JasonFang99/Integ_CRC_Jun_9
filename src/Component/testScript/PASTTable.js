import {DataGrid, GridToolbar, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector} from "@mui/x-data-grid";
import {LinearProgress} from "@mui/material";
import {useMemo, useState} from "react";
import {enslaved_default_list} from "../PAST/vars";
import * as options_flat from "../util/enslaved_options.json";
import Cell from "./Cell";
import Pagination from "@mui/material/Pagination";


function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

export default function PASTTable(props) {
  const {dataList,totalRows, pagination, setPagination, isLoading, set_search_object} = props.state
  const defaultColumns = useMemo(()=>{
    const result = []
    enslaved_default_list.forEach((column)=>{
      result.push({field: column, headerName: options_flat[column].flatlabel, renderCell: Cell,
        flex:options_flat[column].flatlabel.length*6, minWidth: options_flat[column].flatlabel.length*6+100})
    })
    return result;
  }, [enslaved_default_list])
  const [columns, setColumns] = useState(defaultColumns)

  return (
    <DataGrid
      columns={columns}
      rows={dataList}
      rowCount={totalRows}
      loading={isLoading}
      components={{
        LoadingOverlay: LinearProgress,
        Toolbar: GridToolbar,
        Pagination: CustomPagination
      }}
      // componentsProps={{}}
      pagination
      paginationMode="server"
      // rowsPerPageOptions={[10, 20, 50]}
      page={pagination.currPage}
      pageSize={pagination.rowsPerPage}
      onPageChange={(newPage) => {
        setPagination({...pagination, currPage: newPage})
      }}
      onPageSizeChange={(newPageSize) => {
        setPagination({...pagination, rowsPerPage: newPageSize})
      }}

      // sortingMode="server"
      // onSortModelChange={(sortModel)=>{
      //   console.log(sortModel)}}
    />
  )
}