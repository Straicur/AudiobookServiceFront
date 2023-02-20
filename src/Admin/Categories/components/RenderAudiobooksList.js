import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function RenderAudiobooksList(props) {
  const navigate = useNavigate();

  const createTable = () => {
    let renderArray = [];

    if(props.state.json != null){
        props.state.json.forEach((element) => {
            renderArray.push(createColumn(element));
          });
    }

    return renderArray;
  };

  const createColumn = (element) => {
   
    return (
      <tr key={uuidv4()}>
        <th scope="row">{element.title}</th>
        <td>{element.author}</td>
        <td>
          {element.active ? (
            <i className="bi bi-bookmark-check-fill"></i>
          ) : (
            <i className="bi bi-bookmark-dash"></i>
          )}
        </td>
        <td>
          <div className="bd-highlight">
            <Button
              name="en"
              variant="dark"
              size="sm"
              className="btn button"
              onClick={() => {}}
            >
              Detail
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <table className="table">
      <thead className="">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Active</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
