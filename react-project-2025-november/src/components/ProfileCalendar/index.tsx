/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import ProfileCard from "../Profile"; // dosya yolu projene göre değişebilir
import CalendarContainer from "../Calendar";

import { useSelector } from "react-redux";
import { getAuthUser } from "../../store/auth/selector";
import { getSchedule } from "../../store/schedule/selector";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSchedule } from "../../store/schedule/actions";
import { setProfile } from "../../store/auth/actions";

import "../profileCalendar.scss";

const ProfileCalendar = () => {
  const dispatch = useDispatch();

  const auth = useSelector(getAuthUser);
  const schedule = useSelector(getSchedule);

  // 1. profile gelmemişse fallback olarak localStorage
  const safeAuth = auth || { role: localStorage.getItem("role") || "" };

  useEffect(() => {
    dispatch(setProfile() as any);
    dispatch(fetchSchedule() as any);
  }, []);

  return (
    <div className="profile-calendar-container">
      <ProfileCard profile={safeAuth} />
      <CalendarContainer schedule={schedule} auth={safeAuth} />
    </div>
  );
};

export default ProfileCalendar;
