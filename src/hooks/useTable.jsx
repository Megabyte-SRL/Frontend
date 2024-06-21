import React, { useCallback, useEffect, useState } from 'react'

const useTable = (fetchData, initialOrder = 'asc', initialOrderBy = '', setFetchParams) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({});
  const [order, setOrder] = useState(initialOrder);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTableData = useCallback(async (params) => {
    setLoading(true);
    try {
      const result = await fetchData(params);
      setData(result.data);
      setTotalRows(result.meta.total);
    } catch (error) {
      console.error('Failed to fetch table data: ', error);
      setData([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    const params = {
      search: searchText,
      sortField: orderBy,
      sortDirection: order,
      perPage: rowsPerPage,
      page: page + 1, // Laravel pagination starts at 1
      ...filters
    };

    if (setFetchParams) {
      setFetchParams(params);
    }

    fetchTableData(params);
  },
  [fetchData, searchText, filters, order, orderBy, rowsPerPage, page, setFetchParams, fetchTableData]);

  const refreshData = (params) => {
    fetchTableData(params);
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property)
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    data,
    searchText,
    handleSearchChange,
    filters,
    handleFilterChange,
    order,
    orderBy,
    handleSort,
    rowsPerPage,
    page,
    handlePageChange,
    handleRowsPerPageChange,
    totalRows,
    loading,
    refreshData,
  };
}

export default useTable;
