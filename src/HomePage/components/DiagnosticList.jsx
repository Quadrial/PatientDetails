import { useState, useEffect } from "react";

const DiagnosticList = ({ diagnosticList }) => {
  const [isLoading, setIsLoading] = useState(
    !diagnosticList || diagnosticList.length === 0
  );

  useEffect(() => {
    if (diagnosticList && diagnosticList.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [diagnosticList]); // Trigger when diagnosticList prop changes

  if (isLoading) {
    return <div>Loading diagnostics...</div>; // Loading state
  }

  return (
    <section className="bg-white rounded-lg p-4 w-[50vw] h-[30vh] mt-5 overflow-y-scroll">
      <h2 className="text-[22px] font-semibold">Diagnostic List</h2>
      <div className="sticky top-0 z-10 mt-6 px-16 flex flex-row justify-between rounded-[50px] p-4 bg-custom-light-gray">
        <h2 className="text-[18px]">Problem/Diagnosis</h2>
        <h2 className="text-[18px]">Description</h2>
        <h2 className="text-[18px]">Status</h2>
      </div>

      {/* Render diagnostics */}
      <main className="mt-6 px-16">
        {diagnosticList.length > 0 ? (
          diagnosticList.map((diagnostic, index) => (
            <div
              key={index}
              className="flex flex-row gap-5 justify-between py-2 border-b border-gray-200"
            >
              <h2 className="text-[16px]">{diagnostic.name || "N/A"}</h2>
              <h2 className="text-[16px]">{diagnostic.description || "N/A"}</h2>
              <h2 className="text-[16px]">{diagnostic.status || "N/A"}</h2>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No diagnostics available.</p>
        )}
      </main>
    </section>
  );
};

export default DiagnosticList;
