import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

const getAllToDo = (setToDo) => {
    axios.get('/api/todos')
        .then(({ data }) => {
            console.log('data--->', data);
            setToDo(data);
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        });
};

const addToDo = (text, setText, setToDo) => {
    axios.post('/api/todos/save', { text })
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
    axios.post('/api/todos/update', { _id: toDoId, text })
        .then(({ data }) => {
            console.log(data);
            setText('');
            setIsUpdating(false)
            getAllToDo(setToDo);
        })
        .catch((error) => {
            console.error('Error updating todo: ', error);
        });

};

const deleteToDo = (_id, setToDo) => {
    axios.post('/api/todos/delete', { _id })
        .then(({ data }) => {
            console.log(data);
            getAllToDo(setToDo);
        })
        .catch((error) => {
            console.error('Error deleting todo: ', error);
        });

};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
