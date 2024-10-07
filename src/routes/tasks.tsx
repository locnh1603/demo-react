import {useContext} from 'react';
import {Context} from './layout.tsx';
import Table from '../components/table.tsx';
import React from 'react';
import useFetch from '../utilities/useFetch.tsx';
const Tasks = () => {
  const {tasks, initTasks} = useContext(Context);
  // const { userId } = useParams();
  const {data} = useFetch(`https://dummyjson.com/c/5647-88d9-4675-8c22`);
  initTasks(data || []);
  const headers = [
    {title: 'Task Name', field: 'taskName'},
    {title: 'Created Date', field: 'createdDate', render: 'date'},
    {title: 'Status', field: 'status'},
    {title: 'Due Date', field: 'dueDate', render: 'date'},
    {title: 'Priority', field: 'priority'}
  ];
  return (
    <>
      {data ? <Table title={'Tasks'} headers={headers} data={tasks}></Table> : null}
    </>
  )
}
export default React.memo(Tasks);