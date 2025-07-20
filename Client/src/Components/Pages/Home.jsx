import React, { useEffect } from "react";
import { toast } from "react-toastify";

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 996 && window.scrollX == 0) {
        toast.info("Calling api");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <h3>Home page</h3>
    </>
  );
}

export default Home;
