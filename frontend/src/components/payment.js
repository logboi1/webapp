import React, { useState, useEffect } from "react";
import axios from "axios";
import paymentApi from "../API/paymentApi";
import useStore from "../store";
import { PaystackButton } from "react-paystack";
import SuccessToast from "./toast/successtoast";
import ErrorToast from "./toast/errortoast";

const config = {
  reference: new Date().getTime().toString(),
  email: "user@example.com",
  amount: 200000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: "pk_test_4a9a3f6b23362918bbe4cbaadb3860d7b96f6553",
};

const PaymentPage = () => {
  const userProfile = useStore((state) => state.userProfile);
  const [hasPayment, setHasPayment] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);
  //   const [paymentReference, setPaymentReference] = useState("");
  //   const [payStackDetail, setPayStackDetails] = useState([]);

  const userId = userProfile._id;

  // Define the hardcoded payment details
  const paymentDetails = [
    { description: "Tuition Fee", amount: 500 },
    { description: "Library Fee", amount: 50 },
    { description: "Laboratory Fee", amount: 100 },
    { description: "Miscellaneous Fee", amount: 30 },
  ];

  const checkPaymentStatus = async () => {
    try {
      const response = await paymentApi.getPayment(userId);
      for (let i = 0; i < response.length; i++) {
        const paymentStatus = response[i].status;
        if (paymentStatus === "Approved") {
          setHasPayment(true);
        }
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };

  // Calculate the total amount
  const getTotalAmount = () => {
    return paymentDetails.reduce((total, detail) => total + detail.amount, 0);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "NGN",
    });
  };

  const handlePaystackSuccessAction = async (reference) => {
    try {
      // Implementation for whatever you want to do with reference and after success call.
      //   setPayStackDetails(reference);
      //   setPaymentReference(reference.trxref);
      //   setPaymentStatus(reference.message);

      const paymentData = {
        userId,
        referencId: reference.trxref,
        amount: getTotalAmount(),
        date: new Date(),
        status: reference.message,
        section: userProfile.section,
        level: userProfile.level,
      };

      if (reference.status === "Approved") {
        setHasPayment(true);
      }

      try {
        const response = await paymentApi.savePayment(paymentData);
        console.debug(response);
        SuccessToast(response.message);
      } catch (error) {
        console.debug("Error saving payment:", error);
        ErrorToast("Error saving payment");
      }
    } catch (error) {
      console.debug("Error processing payment:", error);
      ErrorToast("Error processing payment");
    }
  };

  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Proceed to Paystack",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const handleVerificationStart = () => {
    // Redirect or perform other actions to start the verification process
  };

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  return (
    <div>
      {hasPayment ? (
        <div>
          <p>You have already made a payment.</p>
          <button onClick={handleVerificationStart}>
            Start Verification for Other Fees
          </button>
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {paymentDetails &&
                paymentDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.description}</td>
                    <td>{formatCurrency(detail.amount)}</td>
                  </tr>
                ))}
              <tr>
                <td>Total</td>
                <td>{formatCurrency(getTotalAmount())}</td>
              </tr>
            </tbody>
          </table>
          <p>
            You have not made any payment. Press the button below to start the
            verification for other fees uploading.
          </p>

          <PaystackButton {...componentProps} />
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
