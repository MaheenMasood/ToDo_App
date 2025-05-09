import { useState, useEffect } from "react";
import ToDo from './components/ToDo';
import { getAllToDo, addToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  // Define the handleSubmit function outside the JSX return block
  const handleSubmit = () => {
    if (isUpdating) {
      updateToDo(toDoId, text, setToDo, setText, setIsUpdating);
    } else {
      addToDo(text, setText, setToDo);
    }
  };

  const handleUpdate = (_id, text) => {
    updateMode(_id, text);
  };
  
  const handleDelete = (_id) => {
    deleteToDo(_id, setToDo);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="add" onClick={handleSubmit}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>

        <div className="list">
          {toDo.length > 0 && toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => handleUpdate(item._id, item.text)}
              deleteToDo={() => handleDelete(item._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
