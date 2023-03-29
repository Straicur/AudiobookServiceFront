import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { HandleFetch } from "../../../../Components/HandleFetch";

export default function RenderAudiobooksList(props) {
  const createTable = () => {
    let renderArray = [];

    if (props.state.json != null) {
      props.state.json.forEach((element) => {
        renderArray.push(createColumn(element));
      });
    }

    return renderArray;
  };
  //todo niech zapisze wysyłane dane do pamięci podręcznej żeby następnym razem szukać z tego co było wcześniej i niech to też ustawia w state od razu
  // Ma mieć dane jego i można przejść od detali od razu lub zobaczyć komentarze
  // W liście oprócz tytułu, autora i tego czy aktywny niech jesszcze będzie rok, ilość partów, age
  // wyszukiwarka ma być z boku i to jest Offcanvas. W nim mam mieć ten formularz i w sumie ma on być na state żeby mi się przy powrocie od razu ustawiał

  // Po przejściu do detali ma mieć Oprócz tego co ma w modalu dodatkowo pod listą kategorii powinien mieć jeszcze oddzielny modal z możliwiścią przypisania do kategorii
  // Render niech będzie tak jak w drzewie oraz obok każdej kategorii do której należy niech ma przycisk usuwający z niej 

  const activeteAudiobook = (element, selectedAudiobook) => {
    element.target.classList.add("disabled");
    console.log(selectedAudiobook)
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
        let newJson = props.state.json.map((audiobook) => {
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

        props.setState({ ...props.state, json: newJson });
      })
      .catch((e) => {
        props.setState({
          ...props.state,
          error: e,
        });
      });
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
        <td className="table_buttons_with">
          <div className="d-grid gap-2 d-md-block">
            <Button
              name="en"
              variant="dark"
              size="sm"
              className="btn button mx-2"
              onClick={() =>
                props.setState({
                  ...props.state,
                  detailAudiobookModal: !props.state.detailAudiobookModal,
                  detailAudiobookElement: element,
                })
              }
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
            
              {element.active ?props.t("deActivate"):props.t("activate")}
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
          <th scope="col">{props.t("active")}</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>{createTable()}</tbody>
    </table>
  );
}