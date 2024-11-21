import { useState, useEffect } from "react";
import PatientDetails from "./PatientDetails";
import History from "./History";
import DiagnosticList from "./DiagnosticList";
import LabResults from "./LabResults";

const PatientList = () => {
  const username = "coalition";
  const password = "skills-test";
  const auth = btoa(`${username}:${password}`);

  const [patients, setPatients] = useState([]); // Array to store all patient data
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [selectedPatient, setSelectedPatient] = useState(null); // Track the selected patient

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${auth}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://fedskillstest.coalitiontechnologies.workers.dev",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        setPatients(result);
        setIsLoading(false);
        console.log("API Response:", result);

        // Set the first patient as the default selected patient if result is not empty
        if (result.length > 0) {
          setSelectedPatient(result[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state until data is fetched
  }

  return (
    <>
      <section className="bg-white rounded-lg p-5 w-[23vw] h-[105vh] overflow-y-scroll">
        <figure className="flex justify-between items-center sticky top-0 bg-white z-10 p-2">
          <h2 className="text-[22px] font-semibold">Patients</h2>
          <img src="images/search.svg" alt="Search" />
        </figure>
        <main className="mt-10 flex flex-col gap-10">
          {patients.map((patient, index) => (
            <figure
              key={index}
              className={`flex items-center justify-between gap-3 mb-4 cursor-pointer p-3 rounded-lg transition duration-200 ${
                selectedPatient?.name === patient.name
                  ? "bg-blue-100" // Apply blue background if this patient is selected
                  : "bg-white" // Default background
              }`}
              onClick={() => setSelectedPatient(patient)} // Update selected patient
            >
              <main className="flex items-center gap-4">
                <img
                  src={patient.profile_picture || "fallback-image.png"}
                  alt={patient.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h2 className="font-semibold text-sm">
                    {patient.name || "No Name"}
                  </h2>
                  <h2 className="text-sm text-gray-500">
                    {patient.gender || "Unknown"}, {patient.age || "Unknown"}
                  </h2>
                </div>
              </main>
              <img src="images/more.svg" alt="More" />
            </figure>
          ))}
        </main>
      </section>

      <section className="flex gap-10">
        <main className="flex flex-col">
          {/* Patient History and Details */}
          <div>
            <History
              diagnosisHistory={selectedPatient?.diagnosis_history || []}
            />
          </div>
          <div>
            {/* Pass the selected patient's diagnostic list to DiagnosticList */}
            <DiagnosticList
              diagnosticList={selectedPatient?.diagnostic_list || []}
            />
          </div>
        </main>

        <div className="flex flex-col">
          <PatientDetails
            patient={selectedPatient}
            resetSelection={() => setSelectedPatient(null)} // Reset the selected patient
          />
          <section>
            <LabResults patient={selectedPatient} />
          </section>
        </div>
      </section>
    </>
  );
};

export default PatientList;
