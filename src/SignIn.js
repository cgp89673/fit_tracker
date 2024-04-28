import React from "react";
import Hdr from "./components/Hdr";
import SignInPage from "./components/SignInPage";
import Footer from "./components/Footer";
import UnauthHdr from "./components/UnauthHdr";

function SignIn() {
  return (
    <div>
      <UnauthHdr />
      <SignInPage />
      <Footer />
    </div>
  );
}

export default SignIn;