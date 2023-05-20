import React, { useState } from "react";
import { useAudiobookUserProposed } from "../../../Components/Providers/AudiobookProviders/AudiobookUserProposedProvider";

export default function RenderProposedList(props) {
  const [audiobookProposed, setAudiobookProposed, setRefetchState] =
    useAudiobookUserProposed();

  const renderColumns = () => {
    if (audiobookProposed != null && audiobookProposed.length > 0) {
      return [];
    } else {
      return null;
    }
  };

  return renderColumns();
}
