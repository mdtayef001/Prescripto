import { MdOutlineCancel } from "react-icons/md";
import { assets } from "../../assets/assets_admin/assets";
import UseDoctorContext from "../../hooks/UseDoctorContext";
import { FaCheck } from "react-icons/fa6";

const DoctorDashboard = () => {
  const { dashData, dashDataLoading } = UseDoctorContext();

  return dashDataLoading ? (
    <p>Loading....</p>
  ) : (
    <section className="m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-200">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              $ {dashData.earnings}
            </p>
            <p className="text-gray-400 ">Earings</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-200">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.appointments}
            </p>
            <p className="text-gray-400 ">Appointments</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-200">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.patients}
            </p>
            <p className="text-gray-400 ">Patients</p>
          </div>
        </div>
      </div>
      <div className="bg-white ">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-100">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Least Appointment</p>
        </div>
        <div className="pt-4 border border-t-0 border-gray-200">
          {dashData?.latestAppointments.map((item, i) => (
            <div
              className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 "
              key={i}
            >
              <img
                className="rounded-full w-10"
                src={item.userData.image}
                alt=""
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">
                  {item.userData.name}
                </p>
                <p className="text-gray-600 ">{item.slotDate}</p>
              </div>
              {item.canaled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-400 text-xs font-medium">Completed</p>
              ) : (
                <p className="text-xs font-medium">Pending</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorDashboard;
