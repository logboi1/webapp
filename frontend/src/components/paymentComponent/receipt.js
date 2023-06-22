import React from "react";
import "./style.scss";
import ReceiptPDF from "./receiptPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ReceiptView = () => {
  // Dummy data for the receipt
  const receiptData = {
    schoolName: "ABC School",
    address: "123 Main St, City",
    studentName: "John Doe",
    level: "Level 2",
    section: "Section A",
    receiptDetails: [
      { description: "Tuition Fee", amount: 500 },
      { description: "Library Fee", amount: 50 },
      { description: "Laboratory Fee", amount: 100 },
      { description: "Miscellaneous Fee", amount: 30 },
    ],
  };

  return (
    <div id="receipt" className="receipt">
      {/* Receipt content */}
      <div className="receipt-header">
        {/* Header content */}
        <h2>{receiptData.schoolName}</h2>
        <p>{receiptData.address}</p>
      </div>
      <div className="receipt-body">
        {/* Body content */}
        <h3>Receipt</h3>
        <p>Student Name: {receiptData.studentName}</p>
        <p>Level: {receiptData.level}</p>
        <p>Section: {receiptData.section}</p>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {receiptData.receiptDetails.map((detail, index) => (
              <tr key={index}>
                <td>{detail.description}</td>
                <td>{detail.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="receipt-footer">
        {/* Footer content */}
        <PDFDownloadLink
          document={<ReceiptPDF receiptData={receiptData} />}
          fileName="receipt.pdf">
          {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ReceiptView;
