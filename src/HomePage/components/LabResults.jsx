import { useState, useEffect } from "react";

const LabResults = ({ patient }) => {
  const [labResults, setLabResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch lab results when the patient changes
  useEffect(() => {
    if (!patient) return; // If no patient selected, do not fetch lab results

    // Assuming the patient data contains a 'lab_results' field directly
    const labResults = patient.lab_results || [];
    setLabResults(labResults);
    setIsLoading(false);
  }, [patient]); // Re-run the effect when patient changes

  if (isLoading) {
    return <div>Loading lab results...</div>;
  }

  return (
    <section className="bg-white rounded-lg p-4 w-[22vw] h-[25vh] mt-5 overflow-y-scroll">
      <h2 className="text-[22px] font-semibold sticky top-0 bg-white">Lab Results</h2>

      {/* Render lab results */}
      <main className="mt-6 px-10 flex flex-col gap-5">
        {labResults.length > 0 ? (
          labResults.map((testName, index) => (
            <div key={index} className="flex justify-between">
              <h2 className="text-[16px]">{testName || "N/A"}</h2>
              <img src="images/download.svg" alt="" />
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No lab results available.</p>
        )}
      </main>
    </section>
  );
};

export default LabResults;
