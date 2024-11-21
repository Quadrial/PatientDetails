import React from "react";
import PatientList from "./components/PatientList";
import History from "./components/History";

const HomePage = () => {
  return (
    <div className ="mt-10 flex gap-10">
      <PatientList />
     
    </div>
  );
};

export default HomePage;
