import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { AppContext } from "../context/AppContext";

const AppointMent = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, backendURL, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ["Thứ 6", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [bookedSlots, setBookedSlots] = useState({}); // Lưu trữ các khung giờ đã đặt theo ngày

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today = new Date();
    let slotsWithBooking = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Bỏ qua cuối tuần (Thứ 7 và Chủ nhật)
      if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
        slotsWithBooking.push([]);
        continue;
      }

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(17, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 8 ? currentDate.getHours() + 1 : 8
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(8);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      // Định dạng ngày để gửi lên server
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      const slotDate = `${day}/${month}/${year}`;

      // Gọi API để lấy các khung giờ đã đặt cho ngày hiện tại
      let bookedTimes = [];
      try {
        const { data } = await axios.post(
          `${backendURL}/api/user/get-booked-slots`,
          { docId, slotDate },
          { headers: { token } }
        );
        if (data.success) {
          bookedTimes = data.bookedTimes;
          setBookedSlots((prev) => ({ ...prev, [slotDate]: bookedTimes }));
        }
      } catch (error) {
        console.error('Lỗi khi lấy khung giờ đã đặt:', error);
      }

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        // Kiểm tra xem khung giờ này đã được đặt chưa
        const isBooked = bookedTimes.includes(formattedTime);

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
          booked: isBooked, // Thêm trạng thái booked
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsWithBooking.push(timeSlots);
    }

    setDocSlots(slotsWithBooking);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Vui lòng đăng nhập để đặt lịch hẹn.");
      return navigate("/login");
    }
    if (!slotTime) {
      toast.info("Vui lòng chọn khung giờ");
      return;
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = `${day}/${month}/${year}`;

      // Gọi API để đặt lịch
      const { data } = await axios.post(
        `${backendURL}/api/user/book-appointment`,
        {
          slotDate,
          docId,
          slotTime,
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Đặt lịch thành công!");
        getDoctorsData();
        navigate("/my-appointments");

        // Cập nhật lại danh sách khung giờ đã đặt
        setBookedSlots((prev) => ({
          ...prev,
          [slotDate]: [...(prev[slotDate] || []), slotTime],
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Lỗi khi đặt lịch.");
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* -----------------Doctor Details----------------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full h-90 sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <p className="text-gray-600 font-medium mt-1">Bác Sĩ Chuyên Khoa {docInfo.speciality}</p>
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-1 font-medium text-gray-900 mt-3">Quá Trình Đào Tạo :</p>
              <p className="whitespace-pre-line text-sm text-gray-600">{docInfo.degree}</p>
            </div>

            <div>
              <p className="flex items-center gap-1 font-medium text-gray-900 mt-3">Thông Tin :</p>
              <p className="text-sm text-gray-500 max-w-[700px] whitespace-pre-line mt-1">{docInfo.about}</p>
            </div>
            <p className="text-gray-900 font-medium mt-4">
              Giá khám:{" "}
              <span className="text-gray-600 text-red-500">
                {currencySymbol}
                {docInfo.fees.toLocaleString("vi-VN")}
              </span>
            </p>
            <div>
              <p className="text-gray-900 font-medium mt-4">
                Địa chỉ: <span className="text-cyan-500">Phòng Khám Nội Tổng Quát MediLink</span>
              </p>
              <p className="text-gray-600 font-medium mt-4">33 Nguyễn Văn Linh, Bình Hiên, Hải Châu, Đà Nẵng</p>
            </div>
          </div>
        </div>

        {/* ------Booking slots ------- */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Lịch khám</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => {
                if (!item.length || !item[0] || item[0].datetime.getDay() === 6 || item[0].datetime.getDay() === 0) {
                  return null;
                }
                return (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-18 px-2 rounded-full cursor-pointer hover:border-2 hover:border-blue-400 ${
                      slotIndex === index ? "bg-primary text-white" : "border border-gray-200"
                    }`}
                    key={index}
                  >
                    {item[0].datetime.getDate() === new Date().getDate() ? (
                      <p className="">Hôm Nay</p>
                    ) : (
                      <p>{daysOfWeek[item[0].datetime.getDay()]}</p>
                    )}
                    <p>{item[0].datetime.getDate()}</p>
                  </div>
                );
              })}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll scrollbar mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => {
                const formattedTime = new Date(item.datetime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                });
                return (
                  <p
                    onClick={() => {
                      if (!item.booked) {
                        setSlotTime(formattedTime);
                      }
                    }}
                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                      item.booked
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : formattedTime === slotTime
                        ? "bg-primary text-white"
                        : "text-gray-400 border border-gray-300 hover:border-2 hover:border-blue-400"
                    }`}
                    key={index}
                  >
                    {formattedTime}
                  </p>
                );
              })}
          </div>
          <button onClick={bookAppointment} className="bg-primary text-white text-lg font-light px-14 py-3 rounded-full my-6 cursor-pointer">
            Đặt lịch khám
          </button>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default AppointMent;