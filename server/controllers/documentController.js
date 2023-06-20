const Document = require("../models/document");
const ExamPermit = require("../models/examPermit");

// Controller function to handle uploading a document for a student
const uploadDocument = async (req, res) => {
  try {
    // Extract student ID, document name, and file URL from the request body
    const { userId, name, file } = req.body;

    // Create a new document instance
    const document = new Document({
      userId,
      name,
      file,
      approved: false, // Set the approved status to false initially
    });

    // Save the document to the database
    const savedDocument = await document.save();

    // Check if the document has been approved
    if (savedDocument.approved) {
      // Create an exam permit for the student
      const examPermit = new ExamPermit({
        userId,
        documentId: savedDocument._id,
        seatNumber: "", // Set the seat number to an empty string initially
      });

      // Save the exam permit to the database
      await examPermit.save();
    }

    res.status(201).json({ message: "Document uploaded successfully" });
  } catch (error) {
    console.error("Error uploading document:", error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the document" });
  }
};

// Controller function to handle approving a document
const approveDocument = async (req, res) => {
  try {
    const documentId = req.params.id;

    // Find the document in the database based on the provided document ID
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Set the approved status of the document to true
    document.approved = true;

    // Save the updated document to the database
    const savedDocument = await document.save();

    // Check if the document has been approved
    if (savedDocument.approved) {
      // Get the number of approved documents for the user
      const approvedDocumentsCount = await Document.countDocuments({
        userId: savedDocument.userId,
        approved: true,
      });

      // Increment the approvedDocumentsCount by 1 to generate the seat number
      const seatNumber = (approvedDocumentsCount + 1).toString();

      // Create an exam permit for the student
      const examPermit = new ExamPermit({
        userId: savedDocument.userId,
        documentId: savedDocument._id,
        seatNumber, // Set the seat number
      });

      // Save the exam permit to the database
      await examPermit.save();
    }

    res.json({ message: "Document approved successfully" });
  } catch (error) {
    console.error("Error approving document:", error);
    res
      .status(500)
      .json({ error: "An error occurred while approving the document" });
  }
};

// Export the controller functions
module.exports = {
  uploadDocument,
  approveDocument,
};
