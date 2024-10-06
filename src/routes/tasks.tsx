import {useContext} from 'react';
import {Context} from './layout.tsx';
import Table from '../components/table.tsx';

const Tasks = () => {
  const {tasks} = useContext(Context);
  const headers = [
    {title: 'Task Name', field: 'taskName'},
    {title: 'Created Date', field: 'createdDate', render: 'date'},
    {title: 'Status', field: 'status'},
    {title: 'Due Date', field: 'dueDate', render: 'date'},
    {title: 'Priority', field: 'priority'}
  ];
  return (
    <>
      <Table title={'Tasks'} headers={headers} data={tasks}></Table>
    </>
  )
}
export default Tasks;
