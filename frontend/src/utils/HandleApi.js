import axios from 'axios';
import { API_ENDPOINTS } from './constants';

axios.defaults.baseURL = 'http://localhost:5000';

const getAllToDo = (setToDo) => {
  axios.get(API_ENDPOINTS.GET)
    .then(({ data }) => {
      console.log('data--->', data);
      setToDo(data);
    })
    .catch((error) => {
      console.error('Error fetching data: ', error);
    });
};

const addToDo = (text, setText, setToDo) => {
  axios.post(API_ENDPOINTS.SAVE, { text })
    .then(({ data }) => {
      console.log(data);
      setText('');
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.error('Error adding todo: ', error);
    });
};

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
  axios.post(API_ENDPOINTS.UPDATE, { _id: toDoId, text })
    .then(({ data }) => {
      console.log(data);
      setText('');
      setIsUpdating(false);
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.error('Error updating todo: ', error);
    });
};

const deleteToDo = (_id, setToDo) => {
  axios.post(API_ENDPOINTS.DELETE, { _id })
    .then(({ data }) => {
      console.log(data);
      getAllToDo(setToDo);
    })
    .catch((error) => {
      console.error('Error deleting todo: ', error);
    });
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
