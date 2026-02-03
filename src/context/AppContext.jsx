import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

import axios from "../axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // Send fcm to backend:
  // const fetchToken = async () => {
  //   const token = await getFCMToken();
  //   const authToken = Cookies.get("token");
  //   if (!authToken) {
  //     ErrorToast("Un authorized | Please relogin.");
  //     navigate("/login");
  //   } else if (authToken && token) {
  //     const response = await axios.post(`/auth/updateFCM`, {
  //       fcmToken: token,
  //     });
  //   }

  // You can send this token to your server or use it as needed

  // onMessageListener()
  //   .then((payload) => {
  //     const data = JSON.parse(payload?.data?.data);
  //     let route = null;
  //     if (data?.type == "booking") {
  //       route = `/rental-tracking/${data?.booking?._id}`;
  //     } else if (data?.type == "product") {
  //       route = `/products/${data?.product?._id}`;
  //     } else if (data?.type == "chat") {
  //       route = `/messages/${data?.chatUser?.chatId}`;
  //     } else {
  //       // WarningToast("Can't route. Something went wrong.");
  //       return;
  //     }
  //     NotificationToast({
  //       title: payload.notification.title,
  //       message: payload.notification.body,
  //       route: route,
  //     });
  //   })
  //   .catch((err) => console.log("failed: ", err));


    const [requestslength, setRequestslength] = useState([]);

      useEffect(() => {
    const fetchPendingRequests = async () => {

      try {
        const response = await axios.get(
          "/admin/reservations?status=pending"
        );

        if (response.data.success && Array.isArray(response.data.data)) {
          setRequestslength(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
        
      }
    };

    fetchPendingRequests();
  }, []);
    

  const dummyVar = null;

  return (
    <AppContext.Provider
      value={{
        dummyVar,
        requestslength,
        setRequestslength,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;
