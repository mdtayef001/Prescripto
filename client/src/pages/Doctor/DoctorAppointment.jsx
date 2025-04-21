import { MdOutlineCancel } from "react-icons/md";
import UseDoctorContext from "../../hooks/UseDoctorContext";
import { FaCheck } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorAppointment = () => {
  const {
    appointments,
    appointmentsRefetch,
    appointmentsLoading,
    calculateAge,
    dToken,
    secureDoc,
  } = UseDoctorContext();

  const navigate = useNavigate();

  const handleCancel = async (id) => {
    try {
      const { data } = await secureDoc.post(`/api/doctor/cancel-appointment`, {
        appointmentID: id,
      });
      if (data.success) {
        toast.success(data.message);
        appointmentsRefetch();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleComplete = async (id) => {
    try {
      const { data } = await secureDoc.post(
        `/api/doctor/complete-appointment`,
        {
          appointmentID: id,
        }
      );
      if (data.success) {
        toast.success(data.message);
        appointmentsRefetch();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  if (!dToken) return navigate("/admin");

  return appointmentsLoading ? (
    <p>Loading....</p>
  ) : (
    <section className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        <div>
          {[...appointments].reverse().map((item, i) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={item._id}
            >
              <p className="max-sm:hidden">{i + 1}</p>
              <div className="flex items-center gap-2 ">
                <img
                  className="w-8 rounded-full"
                  src={item.userData.image}
                  alt=""
                />{" "}
                <p>{item.userData.name}</p>
              </div>
              <button className="text-xs border border-primary px-2 rounded-full">
                {item.payment ? "Online" : "CASH"}
              </button>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>
                {item.slotDate}, {item.slotTime}
              </p>
              <p>$ {item.amount}</p>

              {item.canaled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-400 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex gap-2">
                  <MdOutlineCancel
                    onClick={() => handleCancel(item._id)}
                    className="text-3xl cursor-pointer text-red-400"
                  />
                  <FaCheck
                    onClick={() => handleComplete(item._id)}
                    className="text-3xl cursor-pointer text-green-400"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorAppointment;
