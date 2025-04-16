import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import { MdVerified } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import RelatedDoctors from "../../components/RelatedDoctors";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { toast } from "react-toastify";
import { VscLoading } from "react-icons/vsc";

const Appointment = () => {
  const { docID } = useParams();
  const { doctors, token, axiosUser, doctorDataLoading, doctorRefetch } =
    useAppContext();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [adding, setAdding] = useState(false);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const navigate = useNavigate();

  // set document title
  useDocumentTitle("Prescripto | Appointment");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docID);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      // end time
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      //hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(10);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDay();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        let slotDate = `${day}-${month}-${year}`;
        const slotTime = `${formattedTime}`;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;
        if (isSlotAvailable) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book an appointment");
      return navigate("/auth");
    }
    setAdding(true);
    try {
      const date = docSlots[slotIndex][0].dateTime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let slotDate = `${day}-${month}-${year}`;

      const { data } = await axiosUser.post("/api/user/book-appointment", {
        docID,
        slotDate,
        slotTime,
      });

      if (data.success) {
        toast.success(data.message);
        doctorRefetch();
        navigate("/my-appointments");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docID]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  if (!docInfo || doctorDataLoading)
    return <section className="min-h-screen">Loading...</section>;

  return (
    <section className="min-h-screen">
      {/* DOC DETAILS */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* doc img */}
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg "
            src={docInfo.image}
            alt=""
          />
        </div>
        {/* doc info */}
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name} <MdVerified className="text-[#0016E1] text-xl" />
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <p>
              {docInfo.speciality} - {docInfo.degree}
            </p>
            <span className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </span>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <IoMdInformationCircleOutline />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">${docInfo.fees}</span>
            </p>
          </div>
        </div>
      </div>

      {/* booking Slots */}
      <div className="sm:ml-52 sm:pl-24 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots.map((item, i) => (
              <button
                onClick={() => setSlotIndex(i)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === i
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
                key={i}
              >
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </button>
            ))}
        </div>
        <div className="flex in-checked: gap-3 w-full overflow-x-scroll mt-4 pb-6">
          {docSlots.length &&
            docSlots[slotIndex].map((item, i) => (
              <button
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-primary text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
                key={i}
              >
                {item.time.toLowerCase()}
              </button>
            ))}
        </div>
        <button
          onClick={bookAppointment}
          className="bg-primary px-14 py-3 rounded-full text-white text-sm font-light cursor-pointer my-6 flex items-center gap-2 "
        >
          Book an appointment{" "}
          {adding ? (
            <span>
              <VscLoading className="animate-spin" />
            </span>
          ) : (
            ""
          )}
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docID={docID} speciality={docInfo.speciality} />
    </section>
  );
};

export default Appointment;
