import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './DischargeSummary.css'; // Import your custom CSS file for styling

const DischargeSummary = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    admissionReason: Yup.string().required('Admission reason is required'),
    hospitalCourse: Yup.string().required('Hospital course is required'),
    dischargeCondition: Yup.string().required('Discharge condition is required'),
    medications: Yup.string().required('Medications are required'),
    followUpCare: Yup.string().required('Follow-up care is required'),
    patientInstructions: Yup.string().required('Patient instructions are required'),
    contactInformation: Yup.string().required('Contact information is required'),
    diagnosis: Yup.string(), // Additional field, not required
    patientIpNumber: Yup.string().required('Patient IP number is required'),
    address: Yup.string().required('Address is required'),
    emergencyContact: Yup.string().required('Emergency contact is required'),
    bedNumber: Yup.string().required('Bed number is required'),
    daysStayed: Yup.number().required('Number of days stayed is required'),
    dischargedStatus: Yup.string().required('Discharged status is required'),
    transferHospital: Yup.string(), // Additional field, not required
    guardianAccompanying: Yup.string(), // Additional field, not required
    reasonForTransfer: Yup.string(), // Additional field, not required
  });

  // Initial form values
  const initialValues = {
    admissionReason: '',
    hospitalCourse: '',
    dischargeCondition: '',
    medications: '',
    followUpCare: '',
    patientInstructions: '',
    contactInformation: '',
    diagnosis: '',
    patientIpNumber: '',
    address: '',
    emergencyContact: '',
    bedNumber: '',
    daysStayed: '',
    dischargedStatus: '',
    transferHospital: '',
    guardianAccompanying: '',
    reasonForTransfer: '',
  };

  // Handle form submission
  const onSubmit = (values, { resetForm }) => {
    // Submit logic here (e.g., sending data to server)
    console.log(values);
    // Reset form after submission
    resetForm();
  };

  return (
    <div className="discharge-summary-container">
      <h2 className="discharge-summary-title">Discharge Summary</h2>
      {/* Additional Details */}
      <div className="additional-details">
        <h3>Address Information</h3>
        <div className="address-block">
          <div className="address-line">
            <span className="label">Patient IP Number:</span>
            <span className="value">{initialValues.patientIpNumber}</span>
          </div>
          <div className="address-line">
            <span className="label">Address:</span>
            <span className="value">{initialValues.address}</span>
          </div>
          <div className="address-line">
            <span className="label">Emergency Contact:</span>
            <span className="value">{initialValues.emergencyContact}</span>
          </div>
          <div className="address-line">
            <span className="label">Bed Number:</span>
            <span className="value">{initialValues.bedNumber}</span>
          </div>
          <div className="address-line">
            <span className="label">Number of Days Stayed:</span>
            <span className="value">{initialValues.daysStayed}</span>
          </div>
          <div className="address-line">
            <span className="label">Discharged Status:</span>
            <span className="value">{initialValues.dischargedStatus}</span>
          </div>
          <div className="address-line">
            <span className="label">Transfer Hospital:</span>
            <span className="value">{initialValues.transferHospital}</span>
          </div>
          <div className="address-line">
            <span className="label">Guardian Accompanying:</span>
            <span className="value">{initialValues.guardianAccompanying}</span>
          </div>
          <div className="address-line">
            <span className="label">Reason for Transfer:</span>
            <span className="value">{initialValues.reasonForTransfer}</span>
          </div>
        </div>
      </div>
      {/* Main Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className="discharge-summary-form">
            {/* Admission Reason */}
            <div className="form-group">
              <label htmlFor="admissionReason">Admission Reason:</label>
              <Field type="text" id="admissionReason" name="admissionReason" className="form-control" />
              <ErrorMessage name="admissionReason" component="div" className="error-message" />
            </div>
            {/* Hospital Course */}
            <div className="form-group">
              <label htmlFor="hospitalCourse">Hospital Course:</label>
              <Field as="textarea" id="hospitalCourse" name="hospitalCourse" className="form-control" />
              <ErrorMessage name="hospitalCourse" component="div" className="error-message" />
            </div>
            {/* Discharge Condition */}
            <div className="form-group">
              <label htmlFor="dischargeCondition">Discharge Condition:</label>
              <Field as="textarea" id="dischargeCondition" name="dischargeCondition" className="form-control" />
              <ErrorMessage name="dischargeCondition" component="div" className="error-message" />
            </div>
            {/* Medications */}
            <div className="form-group">
              <label htmlFor="medications">Medications:</label>
              <Field as="textarea" id="medications" name="medications" className="form-control" />
              <ErrorMessage name="medications" component="div" className="error-message" />
            </div>
            {/* Follow-up Care */}
            <div className="form-group">
              <label htmlFor="followUpCare">Follow-up Care:</label>
              <Field as="textarea" id="followUpCare" name="followUpCare" className="form-control" />
              <ErrorMessage name="followUpCare" component="div" className="error-message" />
            </div>
            {/* Patient Instructions */}
            <div className="form-group">
              <label htmlFor="patientInstructions">Patient Instructions:</label>
              <Field as="textarea" id="patientInstructions" name="patientInstructions" className="form-control" />
              <ErrorMessage name="patientInstructions" component="div" className="error-message" />
            </div>
            {/* Contact Information */}
            <div className="form-group">
              <label htmlFor="contactInformation">Contact Information:</label>
              <Field as="textarea" id="contactInformation" name="contactInformation" className="form-control" />
              <ErrorMessage name="contactInformation" component="div" className="error-message" />
            </div>
            {/* Submit button */}
            <button type="submit" className="btn btn-primary submit-btn" disabled={!formik.isValid || formik.isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DischargeSummary;
