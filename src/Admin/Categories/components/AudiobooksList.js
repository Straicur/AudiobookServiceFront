import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../../components/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../components/HandleFetch";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import { useCategoryListStore } from "../../../store";
import RenderList from "../components/RenderList";
import JsonModal from "../../../components/JsonModal";
import AddCategoryModal from "../components/AddCategoryModal";
import EditCategoryModal from "../components/EditCategoryModal";

export default function AudiobooksList(props) {
    //     


  const { t } = useTranslation();

  const [state, setState] = useState({
    jsonModal: false,
    json: null,
    addAudiobookModal: false,
    addAudiobookParent: null,
    editAudiobookModal: false,
    editAudiobookElement: null,
    refresh: false,
    error: null,
  });

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/category/audiobooks",
        "POST",
        {
            categoryKey:props.categoryKey,
            page: 0,
            limit: 10
        },
        props.token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        // props.setCategoiesState({
        //   ...props.categoiesState,
        //   error: e,
        // });
      },
      onSuccess: (data) => {
        console.log(data)
        // setState({ ...state, json: data.categories });

        // if (dateUpdate < Date.now() || state.refresh) {
        //   categoriesStore.removeCategories();

        //   for (const category of data.categories) {
        //     categoriesStore.addCategory(category);
        //   }
        //   if (state.refresh) {
        //     setState({ ...state, refresh: !state.refresh });
        //   }
        // }
      },
    }
  );

//   useEffect(() => {
//     if (state.refresh) {
//       refetch();
//     }
//   }, [state.refresh]);

//   useEffect(() => {
//     if (props.categoiesState.error != null) {
//       throw props.categoiesState.error;
//     }
//   }, [props.categoiesState.error]);

    //todobackend 2 endpointy które pobiorą mi wszystki kategorie dla audiobooka które nie są już używane i wszystkie audiobooki dla ktegorii które już w niej nie są
    //t odo najpierw raczej zrobiłbym dodawanie audiobooka w modalu i podepne go pod tą kategorie 
    // Modal tego audiobooka będzie miał listę kategorii, możliwość wybrania dodatkowej i jej dodania i te wszyustkie jego dane 
  return (
    <>

    </>
  )
}