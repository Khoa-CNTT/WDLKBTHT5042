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
  const daysOfWeek = ["Thứ 6", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5","Thứ 6"];
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // setting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currenDate = new Date(today);
      currenDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(17, 0, 0, 0);

      // setting hours
      if (today.getDate() === currenDate.getDate()) {
        currenDate.setHours(
          currenDate.getHours() > 8 ? currenDate.getHours() + 1 : 8
        );
        currenDate.setMinutes(currenDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currenDate.setHours(8);
        currenDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currenDate < endTime) {
        let formattedTime = currenDate.toLocaleDateString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        });

        // add slot to array
        timeSlots.push({
          datetime: new Date(currenDate),
          time: formattedTime,
        });

        //  Increment current time by 30 minutes
        currenDate.setMinutes(currenDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Vui lòng đăng nhập để đặt lịch hẹn .')
      return navigate('/login')
    }
    if(!slotTime){
        toast.info('Vui lòng chọn khung giờ')
      }
    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      
      const slotDate = day + '/' + month + '/' + year
      const {data} = await axios.post(backendURL + '/api/user/book-appointment', {
        slotDate,
        docId,
        slotTime
      },{headers:{token}});

      if (data.success) {
        toast.success('Appointment booked successfully!');
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId, fetchDocInfo]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId, fetchDocInfo]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots); 
    console.log(docSlots[slotIndex]);
    
  }, [docSlots]);

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
            {/* -------------Doc Info : name, degree, experience-------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <p className="text-gray-600 font-medium mt-1">Bác Sĩ Chuyên Khoa {docInfo.speciality}</p>
            <div className="flex flex-col gap-2 ">
              <p className="flex items-center gap-1 font-medium text-gray-900 mt-3">Quá Trình Đào Tạo :</p>
              <p className="whitespace-pre-line text-sm text-gray-600">
                {docInfo.degree}
              </p>
            </div>

            {/* ---------Doctor About------- */}
            <div>
              <p className="flex items-center gap-1 font-medium text-gray-900 mt-3">
                Thông Tin :
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] whitespace-pre-line mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-900 font-medium mt-4">
              Giá khám:{" "}
              <span className="text-gray-600 text-red-500">
                {currencySymbol}
                {docInfo.fees.toLocaleString('vi-VN')}
              </span>
            </p>
            <div>
              <p className="text-gray-900 font-medium mt-4">
              Địa chỉ:{" "}
              <span className="text-cyan-500">
                Phòng Khám Nội Tổng Quát MediLink
              </span>
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
                // Skip weekends (Saturday = 6, Sunday = 0)
                if (item[0] && (item[0].datetime.getDay() === 6 || item[0].datetime.getDay() === 0)) {
                  return null;
                }
                return (
                  <div
                    onClick={() => setSlotIndex(index)} 
                    className={`text-center py-6 min-w-18 px-2 rounded-full cursor-pointer hover:border-2 hover:border-blue-400 ${slotIndex === index
                        ? "bg-primary text-white"
                        : "border border-gray-200"
                      }`}
                    key={index}
                  >
                    {
                      item[0] && item[0].datetime.getDate() === new Date().getDate() ? (
                        <p className="">Hôm Nay</p>
                      ) : (
                        <p>{item[0] && item[0].datetime.getDay() !== 6 && item[0].datetime.getDay() !== 0 && daysOfWeek[item[0].datetime.getDay()]}</p>
                      )
                    }
                    <p>{item[0] && item[0].datetime.getDay() !== 6 && item[0].datetime.getDay() !== 0 && item[0].datetime.getDate()}</p>
                  </div>
                );
              })}
          </div>

          <div className='flex items-center gap-3 w-full overflow-x-scroll scrollbar mt-4'>
            {docSlots.length && docSlots[slotIndex].map((item, index) => (
              <p onClick={() => setSlotTime(
                new Date(item.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false
                })
              )} className={`hover:border-2 hover:border-blue-400 text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${new Date(item.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                {/* set time ex : 9h30 - 10:00 */}
                {/* {`${new Date(item.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        })} - ${new Date(new Date(item.time).getTime() + 30 * 60000)
            .toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false
            })}`} */
                  new Date(item.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                  })
                }
              </p>
            ))}
          </div>
          <button onClick={bookAppointment} className='bg-primary text-white text-lg font-light px-14 py-3 rounded-full my-6'>Đặt lịch khám</button>
        </div>

        {/* Listing Related Doctor */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default AppointMent;
