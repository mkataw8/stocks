"use client";
import React, { useEffect, useState } from "react";

const ArmyClock: React.FC = () => {
  const [time, setTime] = useState<string>("Loading...");

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // 24-hour clock format
        timeZone: "America/New_York", // Eastern Time
      });

      setTime(formatter.format(now));
    };

    // Update time immediately and then every second
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return <p className="text-lg justify-center">{time} EST</p>;
};

export default ArmyClock;
