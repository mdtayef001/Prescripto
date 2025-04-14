import { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useAppContext from "../../hooks/useAppContext";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets_frontend/assets";
import { VscLoading } from "react-icons/vsc";
import { imgUpload } from "../../hooks/utils";
import { Navigate } from "react-router-dom";

const MyProfile = () => {
  useDocumentTitle("Prescripto | My-Profile");
  const { userData, setUserData, userDataLoading, axiosUser, userRefetch } =
    useAppContext();

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleUpdate = async () => {
    // updating image to cloudinary
    const imageURL = image ? await imgUpload(image) : userData.image;
    setAdding(true);
    const fromData = {
      imageURL,
      name: userData.name,
      address: JSON.stringify({
        line1: userData.address.line1,
        line2: userData.address.line2,
      }),
      gender: userData.gender,
      phone: userData.phone,
      dob: userData.dob,
    };

    try {
      // set data to server
      const { data } = await axiosUser.post(
        "/api/user/update-profile",
        fromData
      );
      if (data.success) {
        toast.success(data.message);
        userRefetch();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setAdding(false);
    }
  };

  if (!userData) return <Navigate to={"/auth"} />;

  return userDataLoading ? (
    <p>Loading....</p>
  ) : (
    <section className=" max-w-lg  flex flex-col gap-2 text-sm">
      {isEdit ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              className="w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=""
            />
            <img
              className="w-10 absolute bottom-12 right-12"
              src={image ? "" : assets.upload_icon}
              alt=""
            />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img className="w-36 rounded  " src={userData.image} alt="" />
      )}

      {isEdit ? (
        <input
          className="bg-gray-100 text-3xl font-medium max-w-60 mt-4 p-1 rounded"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}
      <hr className="bg-zinc-300 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52 p-1 rounded"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input
                className="bg-gray-100 max-w-52 p-1 rounded"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
                type="text"
              />
              <br className="my-3" />
              <input
                className="bg-gray-100 max-w-52 p-1 rounded "
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
                type="text"
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender: </p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100 p-1 rounded"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-20 bg-gray-100 p-1 rounded"
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all duration-300  flex items-center gap-2"
            onClick={handleUpdate}
          >
            Save Information{" "}
            {adding ? (
              <span>
                <VscLoading className="animate-spin" />
              </span>
            ) : (
              ""
            )}
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </section>
  );
};

export default MyProfile;
