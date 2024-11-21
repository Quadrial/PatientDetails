const PatientDetails = ({ patient, resetSelection }) => {
  if (!patient) return null; // Return nothing if no patient is selected

  return (
    <section className="flex flex-col bg-white rounded-lg p-5 w-[22vw] h-[78vh]">
      <div className="flex flex-col items-center">
        <img
          src={patient.profile_picture || "fallback-image.png"}
          alt={patient.name}
          className="w-40 h-40 rounded-full object-cover mb-4"
        />
        <h2 className="font-semibold text-lg">{patient.name}</h2>
      </div>
      <figure className="flex flex-col items-start gap-5 mt-10">
        <main className="flex items-center gap-3">
          <img src="images/BirthIcon.svg" alt="More" />
          <div className="flex flex-col">
            <p>Date of Birth</p>
            <p className="text-gray-500">{patient.date_of_birth}</p>
          </div>
        </main>
        <main className="flex items-center gap-3">
          <img
            src={
              patient.gender === "Male"
                ? "/images/MaleIcon.svg"
                : "/images/FemaleIcon.svg"
            }
            alt={patient.gender}
            className="w-6 h-6"
          />
          <div className="flex flex-col">
            <p>Gender</p>
            <p className="text-gray-500">{patient.gender}</p>
          </div>
        </main>
        <main className="flex items-center gap-3">
          <img src="images/PhoneIcon.svg" alt="More" />
          <div className="flex flex-col">
            <p>Contact Info.</p>
            <p className="text-gray-500">{patient.phone_number}</p>
          </div>
        </main>
        <main className="flex items-center gap-3">
          <img src="images/PhoneIcon.svg" alt="More" />
          <div className="flex flex-col">
            <p>Emergency Contact</p>
            <p className="text-gray-500">{patient.emergency_contact}</p>
          </div>
        </main>
        <main className="flex items-center gap-3">
          <img src="images/InsuranceIcon.svg" alt="More" />
          <div className="flex flex-col">
            <p>Insurance Provider</p>
            <p className="text-gray-500">{patient.insurance_type}</p>
          </div>
        </main>
      </figure>
      <div className = "mt-5 flex flex-col items-center">
      <button
        onClick={resetSelection}
        className="mt-5 bg-custom-cyan text-black px-4 py-2 rounded-[50px] hover:bg-blue-600"
      >
        Show All Information
      </button></div>
    </section>
  );
};

export default PatientDetails;
