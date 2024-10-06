import React, {ChangeEvent, useContext, useState} from 'react';
import {Context} from '../routes/layout.tsx';
import FormDialog from './dialog.tsx';
import {TaskModel, TaskPriority, TaskStatus} from '../models/task.model.ts';
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Popover,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Select from '@mui/material/Select';
import {visuallyHidden} from '@mui/utils';
import {Add, Delete, Edit, Search} from '@mui/icons-material';
import {v4 as uuid} from 'uuid';
import moment, {Moment} from 'moment';
import useDebounce from '../utilities/useDebounce.tsx';

export type TableProps = {
  data: Array<any>,
  headers: Array<{title: string, field: string, render?: string}>,
  title?: string;
}

export interface Header {
  title: string,
  field: string,
  render?: string
}

interface TaskFilter {
  status: string[],
  priority: string[],
  fromDate: Date,
  toDate: Date
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator<Key extends keyof any>(
  order: string,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: 'asc'|'desc';
  orderBy: string;
  rowCount: number;
  headers: Header[];
}
const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort, headers } =
    props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell
            key={header.field}
            align='center'
            padding='normal'
            sortDirection={orderBy === header.field ? order : false}
          >
            <TableSortLabel
              active={orderBy === header.field}
              direction={orderBy === header.field ? order : 'asc'}
              onClick={createSortHandler(header.field)}
            >
              {header.title}
              {orderBy === header.field ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align='right'>Action</TableCell>
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
  title?: string;
  onAdd: () => void;
  onFilter: (filter: TaskFilter) => void;
  onSearch: (search: string) => void;
}
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, title, onAdd, onFilter, onSearch } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<TaskFilter>({status: [], priority: [], fromDate: moment().startOf('month').toDate(), toDate: moment().endOf('month').toDate()});
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };
  const handleFromChange = (date: Moment | null) => {
    if (date) {
      setFilter({
        ...filter,
        fromDate: date.toDate()
      });
    }
  }
  const handleToChange = (date: Moment | null) => {
    if (date) {
      setFilter({
        ...filter,
        toDate: date.toDate()
      });
    }
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReset = () => {
    setFilter({status: [], priority: [], fromDate: moment().startOf('month').toDate(), toDate: moment().endOf('month').toDate()});
  }
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }
  useDebounce(() => {
    if (search.length > 2) {
      onSearch(search);
    }
  }, [search], 500);
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title ? title : 'Table'}
        </Typography>
      )}
      <FormControl sx={{ m: 1, width: '25ch' }} size="small" variant="outlined">
        <InputLabel htmlFor="search-input">Search</InputLabel>
        <OutlinedInput
          id="search-input"
          type='text'
          size="small"
          endAdornment={
            <InputAdornment position="end">
              <Search></Search>
            </InputAdornment>
          }
          value={search}
          onInput={handleSearchChange}
          label="Search"
        />
      </FormControl>
      <Tooltip title="Filter list" aria-describedby='filter'>
        <IconButton onClick={handleClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id='filter'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box className="p-2 grid grid-cols-1 gap-4">
          <DatePicker
            label='From'
            value={moment(filter.fromDate)}
            onChange={handleFromChange}
          />
          <DatePicker
            label='To'
            value={moment(filter.toDate)}
            onChange={handleToChange}
          />
          <FormControl>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              label="Status"
              variant='outlined'
              name='status'
              multiple
              value={filter.status}
              // @ts-expect-error Supported by lib but not by ts
              onChange={handleSelectChange}
              renderValue={(selected: string[]) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  { selected.length >= Object.keys(TaskStatus).length ? (
                    <Typography>All</Typography>
                  ) : (
                    <Typography>{selected.length} Selected</Typography>
                  )}
                </Box>
              )}
            >
              {Object.keys(TaskStatus).map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              label="Priority"
              variant='outlined'
              multiple
              value={filter.priority}
              name='priority'
              // @ts-expect-error Supported by lib but not by ts
              onChange={handleSelectChange}
              renderValue={(selected: string[]) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  { selected.length >= Object.keys(TaskPriority).length ? (
                    <Typography>All</Typography>
                  ) : (
                    <Typography>{selected.length} Selected</Typography>
                  )}
                </Box>
              )}
            >
              {Object.keys(TaskPriority).map(prio => (
                <MenuItem key={prio} value={prio}>{prio}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box className='grid grid-cols-2'>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={() => onFilter(filter)}>Apply</Button>
          </Box>
        </Box>

      </Popover>
      <Tooltip title={numSelected > 0 ? "Delete" : "Select item"}>
        <div>
          <IconButton disabled={numSelected <= 0}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Tooltip>
      <Tooltip title="Add New Item">
        <IconButton onClick={onAdd}>
          <Add />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
const ITable = ({data, headers, title}: TableProps) => {
  const {removeTask, addTask, updateTasks} = useContext(Context);
  const [dialog, setDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskModel>(new TaskModel());
  const [pagination, setPagination] = useState({page: 0, size: 10});
  const {page, size} = pagination;
  const [sort, setSort] = useState({
    field: 'createdDate',
    order: 'asc'
  });
  const [filter, setFilter] = useState<TaskFilter>({status: [], priority: [], fromDate: moment().startOf('month').toDate(), toDate: moment().endOf('month').toDate()});
  const [search, setSearch] = useState<string>('');
  const [formData, setFormData] = useState({
    taskName: '',
    priority: TaskPriority.Low,
    dueDate: new Date()
  });
  const onDelete = (id: string) => {
    removeTask(id);
  }
  const onEdit = (id: string) => {
    if (data) {
      const item = data.find(t => t.id === id);
      if (item) {
        setIsEdit(true);
        setSelectedTask(item);
        setFormData(item);
        setDialog(true);
      }
    }
  }

  const onAdd = () => {
    setSelectedTask(new TaskModel());
    setFormData(new TaskModel());
    setIsEdit(false);
    setDialog(true);
  }

  const closeDialog = () => {
    setDialog(false);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleDateChange = (date: Moment | null) => {
    if (date) {
      setFormData({
        ...formData,
        dueDate: date.toDate()
      });
    }
  }
  const handlePrioritySelect = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleSubmit = () => {
    const newTask: TaskModel = {
      ...formData,
      createdDate: isEdit ? selectedTask.createdDate : new Date(),
      status: TaskStatus.Open,
      id: uuid()
    };
    if (isEdit) {
      updateTasks(newTask, selectedTask.id);
    } else {
      addTask(newTask);
    }
    closeDialog();
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const asc = sort.field === property && sort.order === 'asc';
    setSort({field: property, order: asc ? 'desc' : 'asc'});
  };

  const handleChangePage = (event: unknown, page: number) => {
    setPagination({...pagination, page});
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({page: 0, size: parseInt(event.target.value, 10)});
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * size - data.length) : 0;
  const visibleRows = React.useMemo(
    () =>
      [...data]
        .filter((t: TaskModel) => t.taskName.toLowerCase().includes(search.toLowerCase()) &&
          (filter.status.length === 0 || filter.status.includes(t.status)) &&
          (filter.priority.length === 0 || filter.priority.includes(t.priority)) &&
          (t.dueDate >= filter.fromDate && t.dueDate <= filter.toDate))
        .sort(getComparator(sort.order, sort.field)).slice(page * size, page * size + size),
        [sort.order, sort.field, page, size, filter, search, data]
  );
  const onFilter = (filterInput: TaskFilter) => {
    setFilter(filterInput);
  }
  const onSearch = (searchInput: string) => {
    if (searchInput !== search) {
      setSearch(searchInput);
    }
  }
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={0} title={title} onSearch={onSearch}
                                onAdd={onAdd} onFilter={onFilter}/>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='medium'
            >
              <EnhancedTableHead
                headers={headers}
                order={sort.order as any}
                orderBy={sort.field}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {visibleRows.map((row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      {
                        headers.map((header, index) => {
                          return (
                            <TableCell key={index} align="center">
                              { header.render === 'date' ? new Date(row[header.field]).toLocaleDateString() : row[header.field]}
                            </TableCell>
                          )
                        })
                      }
                      <TableCell align="right">
                        <IconButton onClick={() => onEdit(row.id)}>
                          <Edit/>
                        </IconButton>
                        <IconButton onClick={() => onDelete(row.id)}>
                          <Delete/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={size}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <FormDialog open={dialog} title={ isEdit ? 'Edit Task' : 'Add Task'} onClose={closeDialog} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 my-4">
          <TextField label="Task Name" variant="outlined" name='taskName' value={formData.taskName}
                     placeholder={'Task Name'} onInput={handleChange}></TextField>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Priority"
              variant='outlined'
              value={formData.priority}
              name='priority'
              onChange={handlePrioritySelect}
            >
              {Object.keys(TaskPriority).map(prio => (
                <MenuItem key={prio} value={prio}>{prio}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <DatePicker label="Due Date" name='dueDate' value={moment(formData.dueDate)} onChange={handleDateChange}/>
        </div>
      </FormDialog>
    </>
  )
}
export default ITable;
