import React, { useState } from "react";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, Toaster } from "react-hot-toast";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import icon from './assets/otp-icon.png'
import "./Otp.css";
const Otp = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }
 
  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="section">
    
      <div className="container">
        <Toaster toastOptions={{ duration: 6000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="heading">👍Login Success</h2>
        ) : (
          <div className="container">
          <img className="icon" src={icon} alt=""/>
            <h1 className="heading">
               Generate OTP
            </h1>
            {showOTP ? (
              <>
                <div className="icon-container">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="sub-heading">
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="input-field"
                ></OtpInput>
                <button onClick={onOTPVerify} className="button">
                  {loading && <CgSpinner size={20} className="spinner" />}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="icon-container">
                  <BsTelephoneFill className="phone" size={30} />
                </div>
                <label htmlFor="" className="sub-heading">
                  Verify your phone number
                </label>
                <PhoneInput country={"pk"} value={ph} onChange={setPh} />
                <button onClick={onSignup} className="button">
                  {loading && <CgSpinner size={20} className="spinner" />}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
export default Otp;
