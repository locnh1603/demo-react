import Table from '../components/table.tsx';
import React from 'react';
import useFetch from '../utilities/useFetch.tsx';
import {useParams} from 'react-router-dom';
const Tasks = () => {
  const {userId} = useParams();
  const {data} = useFetch(`https://dummyjson.com/c/${userId}`);
  const headers = [
    {title: 'Task Name', field: 'taskName'},
    {title: 'Created Date', field: 'createdDate', render: 'date'},
    {title: 'Status', field: 'status'},
    {title: 'Due Date', field: 'dueDate', render: 'date'},
    {title: 'Priority', field: 'priority'}
  ];
  return (
    <>
      {data ? <Table title={'Tasks'} headers={headers} data={data}></Table> : null}
    </>
  )
}
export default React.memo(Tasks);
