import { createContext, useState } from "react";

export const SubmissionDataContext = createContext(undefined);

export const SubmissionDataProvider = (props) => {
  const [SubmissionItems, setSubmissionItems] = useState([]);
  return (
    <SubmissionDataContext.Provider value={{ SubmissionItems, setSubmissionItems }}>
      {props.children}
    </SubmissionDataContext.Provider>
  );
};