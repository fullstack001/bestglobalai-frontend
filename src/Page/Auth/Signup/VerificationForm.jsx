import React, { useState, useEffect } from "react";
import { verifyCode, resendVerificationCode } from "../../../lib/api/auth";

const VerificationForm = ({ email, onSubmit }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect((email, onSubmit) => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (verificationCode.length !== 6) {
      setVerificationError("Verification code must be 6 digits");
      return;
    }
    setIsLoading(true);
    try {
      const result = await verifyCode(email, verificationCode);
      if (result.status === 200) {
        await onSubmit(
          result.data.token,
          result.data.user,
          result.data.subscription
        );
      } else {
        setVerificationError(result.msg);
      }
    } catch (error) {
      console.error("Error during verification:", error);
      setVerificationError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await resendVerificationCode(email);
      setTimeLeft(600);
      setCanResend(false);
    } catch (error) {
      console.error("Error resending verification code:", error);
      setVerificationError("Failed to resend verification code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <p className="text-sm text-gray-300 dark:text-gray-400">
          A verification code has been sent to your email: {email}
        </p>
      </div>

      <div className="mb-8">
        <label
          htmlFor="verificationCode"
          className="mb-3 flex justify-between text-sm text-white"
        >
          Verification
          <div>
            <p className="text-sm text-gray-300 dark:text-gray-400">
              Time remaining: {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </p>
          </div>
        </label>
        <input
          type="text"
          name="verificationCode"
          value={verificationCode}
          onChange={(e) =>
            setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          placeholder="Enter 6-digit verification code"
          className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
          maxLength={6}
        />
        {verificationError && (
          <p className="mt-1 text-xs text-red-500">{verificationError}</p>
        )}
      </div>

      <div className="mb-6">
        <button
          type="submit"
          disabled={isLoading || verificationCode.length !== 6}
          className="flex w-full items-center justify-center rounded-sm bg-green-500 px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-green-300 disabled:opacity-50 dark:shadow-submit-dark"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </div>

      <div className="mb-6">
        <button
          type="button"
          onClick={handleResend}
          disabled={isLoading || !canResend}
          className="flex w-full items-center justify-center rounded-sm bg-gray-200 px-9 py-4 text-base font-medium text-gray-700 shadow-submit duration-300 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:shadow-submit-dark dark:hover:bg-gray-600"
        >
          {isLoading ? "Resending..." : "Resend Code"}
        </button>
      </div>
    </form>
  );
};

export default VerificationForm;
