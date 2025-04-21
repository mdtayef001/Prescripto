import { toast } from "react-toastify";
import useAdminContext from "../../hooks/useAdminContext";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const AllAppointments = () => {
  const {
    aToken,
    appointments,
    loadingAppointments,
    refetchAppointments,
    calculateAge,
    axiosSecure,
  } = useAdminContext();

  const navigate = useNavigate();

  const handleCancelAppointment = async (id) => {
    try {
      const { data } = await axiosSecure.post(`/api/admin/cancel-appointment`, {
        appointmentID: id,
      });
      if (data.success) {
        toast.success(data.message);
        // refetch the appointments
        refetchAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  if (!aToken) return navigate("/auth");
  return loadingAppointments ? (
    <p>Loading....</p>
  ) : (
    <section className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
        <div className="hidden sm:grid grid-cols-[0.5fr_4fr_3fr_5fr_5fr_3fr_2fr] gap-2 grid-flow-col py-3 px-2 border-b ">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor Name</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, i) => (
          <div
            className="flex flex-wrap-reverse justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_4fr_3fr_5fr_5fr_3fr_2fr] gap-2 items-center text-gray-500 py-3 px-2 border-b hover:bg-gray-50"
            key={item._id}
          >
            <p className="max-sm:hidden">{i + 1}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.userData.image}
                alt=""
              />{" "}
              <p>{item.userData.name}</p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {item.slotDate}, {item.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                src={item.docData.image}
                alt=""
              />{" "}
              <p>{item.docData.name}</p>
            </div>
            <p>${item.docData.fees}</p>
            {item.canaled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-400 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex gap-2">
                <MdOutlineCancel
                  onClick={() => handleCancelAppointment(item._id)}
                  className="text-3xl cursor-pointer text-red-400 "
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllAppointments;
