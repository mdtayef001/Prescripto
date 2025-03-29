import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAppContext from "../../hooks/useAppContext";

const MyAppointments = () => {
  useDocumentTitle("Prescripto | My Appointments");
  const { doctors } = useAppContext();
  return (
    <section className="min-h-screen">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {doctors.slice(0, 3).map((doc, i) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={i}
          >
            <div>
              <img
                className="w-32 bg-indigo-50 rounded"
                src={doc.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{doc.name}</p>
              <p>{doc.speciality}</p>
              <p className="text-neutral-600 font-medium mt-1">Address:</p>
              <p className="text-xs">{doc.address.line1}</p>
              <p className="text-xs">{doc.address.line1}</p>
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                25, March, 2025 | 8:30
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                Pay Online
              </button>
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyAppointments;
