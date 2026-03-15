import React, { useEffect } from 'react';
import Geolocation from "react-native-geolocation-service";
import io from "socket.io-client";

const socket = io('https://socket-server-3kjo.onrender.com', {
  transports: ['websocket'],
  secure: true,
  reconnection: true,
});

export default function DriverTracking() {

  useEffect(() => {

    Geolocation.watchPosition(position => {

      const { latitude, longitude } = position.coords;

      socket.emit("driver-location", {
        driverId: "driver123",
        latitude,
        longitude
      });

    });

    socket.on("ride-request", data => {

      console.log("Ride Request Received", data);

      socket.emit("accept-ride", {
        driverId: "driver123",
        passengerSocketId: data.passengerSocketId
      });

    });

  }, []);

  return null;
}