import React from "react";
import useAdminContext from "../../hooks/useAdminContext";
import { toast } from "react-toastify";

const DoctorsList = () => {
  const { doctors, loadingDoctors, refetchDoctors, axiosSecure } =
    useAdminContext();

  const changeAvailability = async (docID) => {
    try {
      const { data } = await axiosSecure.patch(
        `/api/admin/change-availability/${docID}`
      );
      if (data.success) {
        toast.success(data.message);
        refetchDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>

      {loadingDoctors ? (
        <p>Loading....</p>
      ) : (
        <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            >
              <img
                className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
                src={doctor.image}
                alt={doctor.name}
              />
              <div className="p-4 ">
                <p className="text-neutral-800 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-zinc-600 text-sm ">{doctor.speciality}</p>
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <input
                    onChange={() => changeAvailability(doctor._id)}
                    type="checkbox"
                    checked={doctor.available}
                    className="cursor-pointer"
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DoctorsList;
