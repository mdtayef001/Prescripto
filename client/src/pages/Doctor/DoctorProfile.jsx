import { useState } from "react";
import UseDoctorContext from "../../hooks/UseDoctorContext";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { docDetails, docLoading, docRefetch, setDocDetails, secureDoc } =
    UseDoctorContext();

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updatedData = {
        address: docDetails.address,
        fees: docDetails.fees,
        available: docDetails.available,
      };

      const { data } = await secureDoc.post(
        "/api/doctor/profile-update",
        updatedData
      );

      if (data.success) {
        setIsEdit(false);
        toast.success(data.message);
        docRefetch();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return docLoading ? (
    <p>Loading....</p>
  ) : (
    <section>
      <div className="flex flex-col gap-4 m-5">
        <div>
          <img
            className="bg-primary/80 w-full sm:max-w-64 rounded-lg "
            src={docDetails.image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-stone-100 bg-white rounded-lg p-8 py-7 ">
          {/* doc info */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {docDetails.name}
          </p>
          <div className="flex items-center mt-1 gap-2 text-gray-600">
            <p>
              {docDetails.degree} - {docDetails.speciality}
            </p>
            <button className="py-0.5 px-5 text-xs border rounded-full">
              {docDetails.experience}
            </button>
          </div>
          {/* doc about */}
          <div>
            <p className="font-medium text-sm text-neutral-800 mt-3">About:</p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {docDetails.about}
            </p>
          </div>
          <p className="text-gray-600 mt-4 font-medium">
            Appointment fee:{" "}
            <span className="text-gray-800">
              ${" "}
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setDocDetails((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={docDetails.fees}
                  className="bg-gray-100"
                />
              ) : (
                docDetails.fees
              )}
            </span>
          </p>
          <div className="flex gap-2 py-2">
            <p>Address:</p>
            <p className="text-sm">
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setDocDetails((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={docDetails.address.line1}
                  className="bg-gray-100"
                />
              ) : (
                docDetails.address.line1
              )}
              <br />
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setDocDetails((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={docDetails.address.line2}
                  className="bg-gray-100"
                />
              ) : (
                docDetails.address.line2
              )}
            </p>
          </div>
          <div className="flex gap-1 pt-2">
            <input
              onChange={() =>
                isEdit &&
                setDocDetails((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              checked={docDetails.available}
              type="checkbox"
              className="hover:cursor-pointer"
            />
            <label htmlFor="">Available</label>
          </div>

          {isEdit ? (
            <button
              onClick={updateProfile}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
