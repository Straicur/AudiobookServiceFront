import { useAudiobookMy } from "../../../Components/Providers/AudiobookProviders/AudiobookMyListProvider";

export default function RenderMyList(props) {
  const [audiobooks, loading, setAudiobooks, setRefetchState] =
    useAudiobookMy();
    // Tu też pobieranie teraz zdjęć i po tym render tych audiobooków 
    // I do tego tak samo jak szukanie i tyle w sumie 
  console.log(audiobooks);
  return <div></div>;
}
