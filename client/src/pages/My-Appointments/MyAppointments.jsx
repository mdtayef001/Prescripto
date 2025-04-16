import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAppContext from "../../hooks/useAppContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const MyAppointments = () => {
  useDocumentTitle("Prescripto | My Appointments");
  const { axiosUser, token } = useAppContext();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["my-appointments"],
    enabled: !!token,
    queryFn: async () => {
      try {
        const { data } = await axiosUser.get("/api/user/appointments");
        if (data.success) {
          return data.appointmentsData.reverse();
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  return isLoading ? (
    <p>Loading....</p>
  ) : (
    <section className="min-h-screen">
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {appointments.map((item, i) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={i}
          >
            <div>
              <img
                className="w-32 bg-indigo-50 rounded"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-neutral-600 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {item.slotDate} | {item.slotTime}
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
