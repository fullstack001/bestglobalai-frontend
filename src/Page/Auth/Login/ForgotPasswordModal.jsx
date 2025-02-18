import React, { useState } from "react";
import { Modal, Button, Label, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure styles are imported

import { forgotPassword } from "../../../lib/api/auth";

const ForgotPasswordModal = ({ show, handleClose, handleSuccessSend }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email", {
        className: "bg-red-600 text-white",
      });
      return;
    }
    setIsLoading(true);
    try {
      const res = await forgotPassword(email);
      if (res.status === 200) {
        toast.success(
          "Reset password request sent successfully. Please check your email.",
          {
            autoClose: 3000,
            hideProgressBar: true,
            className: "bg-green-600 text-white",
          }
        );
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        toast.error(res.msg, {
          className: "bg-red-600 text-white",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        className: "bg-red-600 text-white",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} onClose={() => handleClose()}>
        <Modal.Header>Forgot Password Request</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "...loading" : "Send Reset Link"}
          </Button>
          <Button color="gray" onClick={() => handleClose()}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordModal;
