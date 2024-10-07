import {createContext, ReactNode, useState} from 'react';
import {TaskModel} from '../models/task.model.ts';
import Nav from '../components/nav.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React from 'react';
import {UserModel} from '../models/user.model.ts';
const defaultValue = {
  users: [] as UserModel[],
  tasks: [] as TaskModel[],
  updateTasks: (task: TaskModel, id: string) => {},
  addTask: (task: TaskModel) => {},
  removeTask: (id: string) => {},
  initTasks: (tasks: TaskModel[]) => {},
  initUsers: (users: UserModel[]) => {}
}
export const Context = createContext(defaultValue);
const Layout = ({children}: {children: ReactNode}) => {
  const [tasks, setTasks] = useState(Array<TaskModel>);
  const [users, setUsers] = useState(Array<UserModel>);
  const initTasks= (newTasks: TaskModel[]) => {
    setTasks(newTasks);
  }
  const updateTasks = (task: TaskModel, id: string) => {
    const newTasks = [...tasks];
    const index = newTasks.findIndex(t => t.id === id);
    newTasks[index] = task;
    setTasks(newTasks);
  }
  const addTask = (task: TaskModel) => {
    setTasks([...tasks, task]);
  }
  const removeTask = (id: string) => {
    const index = tasks.findIndex(t => t.id === id);
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }
  const initUsers = (newUsers: UserModel[]) => {
    setUsers(newUsers);
  }
  const value = {
    tasks,
    users,
    updateTasks,
    addTask,
    removeTask,
    initTasks,
    initUsers
  }
  return (
    <Context.Provider value={value}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Nav></Nav>
        <div className="container mx-auto p-4">
          {children}
        </div>
      </LocalizationProvider>
    </Context.Provider>
  );
}
export default React.memo(Layout);
