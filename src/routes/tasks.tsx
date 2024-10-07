import {useContext, useEffect} from 'react';
import {Context} from './layout.tsx';
import Table from '../components/table.tsx';
import {TaskModel} from '../models/task.model.ts';
import moment from 'moment';

const Tasks = () => {
  const {tasks, initTasks} = useContext(Context);
  const url = 'https://dummyjson.com/c/5647-88d9-4675-8c22';
  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data: TaskModel[]) => {
        console.log(data);
        data.forEach(item => {
          item.createdDate = moment(item.createdDate).toDate();
          item.dueDate = moment(item.dueDate).toDate();
        });
        initTasks(data);
      });
  }, []);
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
