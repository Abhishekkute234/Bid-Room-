import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Preloader = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    // Trigger the `onDone` callback after 4 seconds
    const timer = setTimeout(() => {
      onDone();
    }, 2250);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0C1222",
      }}
    >
      <DotLottieReact
        src="https://lottie.host/50a856c6-1ba7-4aa3-8ed1-cfc6bd65adc0/sl0HuC2AJY.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default Preloader;
