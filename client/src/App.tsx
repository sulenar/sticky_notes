import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const url = "http://localhost:5000/notes";
  const [items, setItems] = useState([
    { id: 0, note_name: "", note_description: "" },
  ]);
  const [name, setNoteName] = useState("");
  const [description, setNoteDescription] = useState("");
  const [newName, setChangeName] = useState("");
  const [newDescription, setChangeDescription] = useState("");
  const [newId, setChangeId] = useState(0);

  useEffect(() => {
    axios.get(url).then(
      (result) => {
        setItems(result.data);
      },
      (error) => {
        setItems(error);
      }
    );
  }, []);

  const content = items.map((item, index) => {
    const { id, note_name, note_description } = item as {
      id: number;
      note_name: string;
      note_description: string;
    };

    return (
      <div key={id} id={`${id}`} className="AppNote">
        <div className="form-popup" id="myForm">
          <form
            className="form-container"
            onSubmit={(event) => {
              event.preventDefault();
              handleChangeSubmit(newId);
            }}
          >
            <input
              id="change_note_name"
              type="text/plain"
              value={newName}
              onChange={(e) => setChangeName(e.target.value)}
              placeholder="Имя заметки"
            />
            <textarea
              id="change_note_description"
              placeholder="описание"
              value={newDescription}
              onChange={(e) => setChangeDescription(e.target.value)}
            />
            <button type="submit" className="btn">
              Изменить
            </button>
            <button
              type="reset"
              onClick={() => {
                const form = document.getElementById("myForm");
                if (form) form.style.display = "none";
              }}
            >
              Закрыть
            </button>
          </form>
        </div>
        <img
          onClick={() => {
            console.log("Это заметка под номером " + id);
            setChangeId(id);
            const form = document.getElementById("myForm");
            if (form) form.style.display = "block";
          }}
          src={"./img/pencil.png"}
          alt="Edit"
          title="Изменить"
          className="AppEdit"
        ></img>
        <img
          onClick={() => {
            remItem(index, id);
          }}
          src={"./img/bucket.png"}
          alt="Remove"
          title="Удалить"
          className="AppRemove"
        ></img>
        <div className="text AppHeader">{note_name}</div>
        <div className="text AppDescription">{note_description}</div>
      </div>
    );
  });

  function remItem(index: number, id: number): void {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        setItems([...items.slice(0, index), ...items.slice(index + 1)]);
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    axios
      .post(url, {
        note_name: name,
        note_description: description,
      })
      .then((res) => {
        setItems([...items, res.data]);
        setNoteDescription("");
        setNoteName("");
      });
  }

  function handleChangeSubmit(id: number): void {
    const data = {
      id,
      note_name: newName,
      note_description: newDescription,
    };
    console.log("будем менять id " + id);
    axios.patch(`${url}/${id}`, data).then(() => {
      const newList = items.map((item) => {
        return item.id === id ? data : item;
      });
      console.log(newList);
      setItems(newList);
      setChangeDescription("");
      setChangeName("");
    });
  }

  return (
    <div>
      <div className="myForm">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="note_name">Название заметки</label>
            <input
              id="note_name"
              type="text/plain"
              value={name}
              onChange={(e) => setNoteName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="note_description">Описание</label>
            <textarea
              id="note_description"
              value={description}
              onChange={(e) => setNoteDescription(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <button className="field" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
      <div className="AppBoard">{content}</div>
    </div>
  );
}

export default App;
