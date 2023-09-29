"use client";

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [openaiKey, setOpenaiKey] = useState("");
  const [heliconeKey, setHeliconeKey] = useState("");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState({"输出":"暂无输出"});
  const [schema, setSchema] = useState(`{"pipes": []}`);
  const [stepOutput, setStepOutput] = useState([]);
  let sharedState = {
    openaiKey,
    setOpenaiKey,
    heliconeKey,
    setHeliconeKey,
    inputText,
    setInputText,
    outputText,
    setOutputText,
    schema,
    setSchema,
    stepOutput,
    setStepOutput
  }

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
