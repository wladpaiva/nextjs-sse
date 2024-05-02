"use client";

import { useEffect } from "react";

const SSEComponent = () => {
  useEffect(() => {
    // Initiate the first call to connect to SSE API
    const eventSource = new EventSource("/api/update");

    eventSource.addEventListener("message", (event) => {
      console.log("🔥 ~ ", event.data);
    });

    // As the component unmounts, close listener to SSE API
    return () => {
      eventSource.close();
    };
  }, []);

  return null;
};

export default SSEComponent;
