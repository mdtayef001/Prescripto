import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAppContext from "../../hooks/useAppContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  useDocumentTitle("Prescripto | My Appointments");
  const navigate = useNavigate();
  const { axiosUser, token } = useAppContext();
  const {
    data: appointments = [],
    isLoading,
    refetch,
  } = useQuery({
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

  const handleCancelAppointment = async (id) => {
    try {
      const { data } = await axiosUser.post(
        `/api/user/cancel-appointment/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        // refetch the appointments
        refetch();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  if (!token) return navigate("/auth");

  return isLoading ? (
    <div lassName="min-h-screen">
      <p>Loading....</p>
    </div>
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
              {!item.canaled ? (
                <>
                  <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                    Pay Online
                  </button>
                  <button
                    onClick={() => handleCancelAppointment(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Cancel Appointment
                  </button>
                </>
              ) : (
                <button
                  className="text-sm text-red-600 text-center sm:min-w-48 py-2 border border-red-500 rounded  "
                  disabled={true}
                >
                  Appointment Canalled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyAppointments;
