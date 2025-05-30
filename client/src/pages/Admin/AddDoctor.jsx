import React, { useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import useAdminContext from "../../hooks/useAdminContext";
import { toast } from "react-toastify";
import { imgUpload } from "../../hooks/utils";
import { VscLoading } from "react-icons/vsc";
const AddDoctor = () => {
  const [image, setImage] = useState(false);
  const { axiosSecure } = useAdminContext();
  const [adding, setAdding] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    const initialData = new FormData(e.target).entries();
    const data = Object.fromEntries(initialData);
    const imageURL = await imgUpload(image);
    const fromData = {
      imageURL,
      email: data.email,
      name: data.name,
      password: data.password,
      fees: parseInt(data.fees),
      experience: data.experience,
      speciality: data.speciality,
      degree: data.degree,
      address: JSON.stringify({
        line1: data.address1,
        line2: data.address2,
      }),
      about: data.about,
    };
    console.log(fromData);
    try {
      if (!image) return toast.error("Image is not selected");

      const { data } = await axiosSecure.post(
        `/api/admin/add-doctor`,
        fromData
      );

      if (!data.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        e.target.reset();
        setImage(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleUpload} className="m-5 w-full">
        <p className="mb-3 text-lg font-medium">Add Doctor</p>
        <div className="bg-white p-8 border rounded w-full max-w-4xl max-h-full ">
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="doc-img">
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="doc-img"
              hidden
            />
            <p>
              Upload Doctor <br /> Picture
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            {/*  */}
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="w-full space-y-1">
                <p>Doctor Name</p>
                <input
                  className="w-full border rounded px-3 py-2"
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                />
              </div>
              <div className="w-full space-y-1">
                <p>Doctor Email</p>
                <input
                  className="w-full border rounded px-3 py-2"
                  type="email"
                  placeholder="example@gmail.com"
                  name="email"
                  required
                />
              </div>
              <div className="w-full space-y-1">
                <p>Doctor Password</p>
                <input
                  className="w-full border rounded px-3 py-2"
                  type="password"
                  placeholder="password"
                  name="password"
                  required
                />
              </div>
              <div className="w-full space-y-1">
                <p>Experience</p>
                <select
                  className="w-full border rounded px-3 py-2"
                  name="experience"
                  id=""
                >
                  <option value="1 year">1 Year</option>
                  <option value="2 years">2 Years</option>
                  <option value="3 years">3 Years</option>
                  <option value="4 years">4 Years</option>
                  <option value="5 years">5 Years</option>
                  <option value="6 years">6 Years</option>
                  <option value="7 years">7 Years</option>
                  <option value="8 years">8 Years</option>
                  <option value="9 years">9 Years</option>
                  <option value="10 years">10 Years</option>
                </select>
              </div>
              <div className="w-full space-y-1">
                <p>Fees</p>
                <input
                  className="w-full border rounded px-3 py-2"
                  type="number"
                  name="fees"
                  placeholder="fees"
                  required
                />
              </div>
            </div>
            {/*  */}
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="w-full space-y-1">
                <p>Specialty</p>
                <select
                  className="w-full border rounded px-3 py-2"
                  name="speciality"
                  id=""
                >
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div className="w-full space-y-1">
                <p>Education</p>
                <input
                  className="w-full border rounded px-3 py-2"
                  type="text"
                  placeholder="Education"
                  name="degree"
                  required
                />
              </div>
              <div className="w-full space-y-1">
                <p>Address</p>
                <input
                  className="w-full border rounded px-3 py-2"
                  type="text"
                  placeholder="address 1"
                  name="address1"
                  required
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  type="text"
                  placeholder="address 2"
                  name="address2"
                  required
                />
              </div>
            </div>
            {/*  */}
          </div>
          <div>
            <p className="mt-4 mb-2">About</p>
            <textarea
              className="w-full border rounded px-4 py-2"
              placeholder="Write about doctor"
              name="about"
              rows={5}
              required
            />
          </div>
          <button
            onClick={() => setAdding(true)}
            className="bg-primary text-white px-10 py-3 mt-4 rounded-full cursor-pointer flex items-center gap-2"
          >
            Add Doctor
            {adding ? (
              <span>
                <VscLoading className="animate-spin" />
              </span>
            ) : (
              ""
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddDoctor;
