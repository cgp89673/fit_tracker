import React from "react";
import UnauthHdr from "./components/UnauthHdr";
import SignUpPage from "./components/SignUpPage";
import Footer from "./components/Footer";

function SignUp() {
  return (
    <div>
      <UnauthHdr />
      <SignUpPage />
      <Footer />
    </div>
  );
}

export default SignUp;