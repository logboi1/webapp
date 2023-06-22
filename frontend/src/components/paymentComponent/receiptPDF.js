import React from "react";
import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";

const ReceiptPDF = ({ receiptData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* PDF receipt content */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{receiptData.schoolName}</Text>
        <Text style={styles.subText}>{receiptData.address}</Text>
      </View>

      <View style={styles.subHead}>
        <Text style={styles.text}>Student Name: {receiptData.studentName}</Text>
        <Text style={styles.text}>Level: {receiptData.level}</Text>
        <Text style={styles.text}>Section: {receiptData.section}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableHeader, styles.tableCell]}>
            Description
          </Text>
          <Text style={[styles.tableHeader, styles.tableCell]}>Amount</Text>
        </View>
        {receiptData.receiptDetails.map((detail, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.text, styles.tableCell]}>
              {detail.description}
            </Text>
            <Text style={[styles.text, styles.tableCell]}>{detail.amount}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  subHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
    padding: 5,
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  tableCell: {
    flexBasis: "70%",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "lightgray",
  },
  headerText: {
    fontSize: 24,
    color: "black",
  },
  subText: {
    fontSize: 14,
    color: "gray",
  },
  text: {
    fontSize: 12,
    color: "black",
  },
});

export default ReceiptPDF;
