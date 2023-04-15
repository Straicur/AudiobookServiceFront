import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { HandleFetch } from "../../../../Components/HandleFetch";
import { useNavigate } from "react-router-dom";
import { CreateDate } from "../../../../Components/CrateDate";

export default function RenderAudiobooksList(props) {
  const navigate = useNavigate();

  const createTable = () => {
    let renderArray = [];

    if (props.state.json != null) {
      props.state.json.audiobooks.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };

  const activeteAudiobook = (element, selectedAudiobook) => {
    element.target.classList.add("disabled");

    HandleFetch(
      "http://127.0.0.1:8000/api/admin/audiobook/active",
      "PATCH",
      {
        audiobookId: selectedAudiobook.id,
        active: !selectedAudiobook.active,
      },
      props.token
    )
      .then(() => {
        element.target.classList.remove("disabled");

        let newAudiobookList = props.state.json.audiobooks.map((audiobook) => {
          if (audiobook.id == selectedAudiobook.id) {
            return {
              id: audiobook.id,
              title: audiobook.title,
              author: audiobook.author,
              year: audiobook.year,
              duration: audiobook.duration,
              size: audiobook.size,
              parts: audiobook.parts,
              age: audiobook.age,
              active: !audiobook.active,
            };
          } else {
            return audiobook;
          }
        });

        const newJson = {
          audiobooks: newAudiobookList,
          page: 0,
          limit: 15,
          maxPage: 1,
        };

        props.setState({ ...props.state, json: newJson });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
  };

  const getAge = (element) => {
    switch (element.age) {
      case 1:
        return "3-7";
        break;
      case 2:
        return "7-12";
        break;
      case 3:
        return "12-16";
        break;
      case 4:
        return "16-18";
        break;
      case 5:
        return "18+";
        break;
    }
  };

  const createColumn = (element) => {
    return (
      <tr key={uuidv4()}>
        <th scope="row">{element.title}</th>
        <td>{element.author}</td>
        <td>{CreateDate(element.year)}</td>
        <td>{element.parts}</td>
        <td>{getAge(element)}</td>
        <td>
          {element.active ? (
            <i className="bi bi-bookmark-check-fill"></i>
          ) : (
            <i className="bi bi-bookmark-dash"></i>
          )}
        </td>
        <td className="table_buttons_with">
          <div className="d-grid gap-2 d-md-block">
            <Button
              name="en"
              variant="dark"
              size="sm"
              className="btn button mx-2"
              onClick={() => navigate("/admin/audiobook/" + element.id)}
            >
              {props.t("details")}
            </Button>

            <Button
              name="en"
              variant="dark"
              size="sm"
              className="btn button mx-2"
              onClick={() =>
                props.setState({
                  ...props.state,
                  detailCommentsAudiobookModal:
                    !props.state.detailCommentsAudiobookModal,
                  detailAudiobookElement: element,
                })
              }
            >
              {props.t("comments")}
            </Button>

            <Button
              name="en"
              variant="dark"
              size="sm"
              className="btn button mx-2"
              onClick={(e) => {
                activeteAudiobook(e, element);
              }}
            >
              {element.active ? props.t("deActivate") : props.t("activate")}
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
          <th scope="col">{props.t("title")}</th>
          <th scope="col">{props.t("author")}</th>
          <th scope="col">{props.t("year")}</th>
          <th scope="col">{props.t("parts")}</th>
          <th scope="col">{props.t("age")}</th>
          <th scope="col">{props.t("active")}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}
