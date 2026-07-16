import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';

const heroBg = 'https://www.google.com/maps/place/ROYAL+BLUE+PG/@18.6253126,73.8199264,3a,75y/data=!3m8!1e2!3m6!1sCIABIhA_f3ehOY-bHFnkJnPHeuHm!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWlKlZ6Uu2Q38VB-36pUg5biIYDijQcPisEuSSoP9RS0DvkuzRFylCXUQrL3dFyAjl6GXaElogajgDVxwfUuFWwI_Y9_IDfaHoIqxA_d0gP8RCr9GYhci0BT6QqYC6I_3sXramrW9LueNaaz%3Dw114-h86-k-no!7i1600!8i1200!4m7!3m6!1s0x3bc2b9f402e75e0d:0x1fe78662262b1b16!8m2!3d18.6253126!4d73.8199264!10e5!16s%2Fg%2F11zgs9w46g?entry=ttu&g_ep=EgoyMDI2MDcxMi4wIKXMDSoASAFQAw%3D%3D';
import { enquiryAPI } from '../services/api';

const enquirySchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  college: Yup.string(),
  occupation: Yup.string().required('Please select occupation'),
  message: Yup.string(),
  privacyPolicy: Yup.boolean().oneOf([true], 'You must accept the privacy policy'),
});

const Enquiry = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '', phone: '', email: '', college: '',
      occupation: 'Student', message: '', privacyPolicy: false
    },
    validationSchema: enquirySchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await enquiryAPI.submit(values);
        setIsSuccess(true);
        resetForm();
      } catch (error) {
        const message = error?.response?.data?.message || 'Failed to submit enquiry. Please try again. Our team will contact you directly if the form is unavailable.';
        toast.error(message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="pt-20 min-h-screen bg-light-bg dark:bg-dark-bg">
      <Toaster position="top-right" />
      
      {/* Header Banner */}
      <div 
        className="h-64 relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="overlay-gradient" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Make an Enquiry</h1>
          <p className="text-gray-200">Fill out the form below to secure your spot at Royal Blue PG.</p>
        </div>
      </div>

      <div className="container-custom py-12 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto glass-card shadow-premium overflow-hidden">
          
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12 text-center"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-6xl text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Submission Successful!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                Thank you for choosing Royal Blue PG. We have received your enquiry and our team will contact you shortly on your provided phone number.
              </p>
              <button onClick={() => setIsSuccess(false)} className="btn-outline">
                Submit Another Enquiry
              </button>
            </motion.div>
          ) : (
            <div className="p-5 md:p-8 lg:p-12">
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                
                <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-100 dark:border-dark-border text-gray-800 dark:text-white">
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                      {...formik.getFieldProps('fullName')}
                    />
                    {formik.touched.fullName && formik.errors.fullName && <div className="text-red-500 text-xs mt-1">{formik.errors.fullName}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                      {...formik.getFieldProps('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Occupation *</label>
                    <select
                      name="occupation"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                      {...formik.getFieldProps('occupation')}
                    >
                      <option value="Student">Student</option>
                      <option value="Working Professional">Working Professional</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">College / Company Name</label>
                    <input
                      type="text"
                      name="college"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white"
                      {...formik.getFieldProps('college')}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Message / Special Request</label>
                  <textarea
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white resize-none"
                    {...formik.getFieldProps('message')}
                  ></textarea>
                </div>

                <div className="mt-8">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="privacyPolicy"
                      className="mt-1 w-4 h-4 text-primary-600 rounded focus:ring-primary-500 border-gray-300"
                      {...formik.getFieldProps('privacyPolicy')}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
                      I agree to the <a href="/privacy" className="text-primary-500 hover:underline">Privacy Policy</a> and consent to being contacted regarding this enquiry.
                    </span>
                  </label>
                  {formik.touched.privacyPolicy && formik.errors.privacyPolicy && <div className="text-red-500 text-xs mt-1 ml-7">{formik.errors.privacyPolicy}</div>}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-dark-border">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="btn-primary flex-1 flex justify-center items-center gap-2"
                  >
                    {formik.isSubmitting ? <FaSpinner className="animate-spin" /> : 'Submit Enquiry'}
                  </button>
                  <button
                    type="button"
                    onClick={formik.handleReset}
                    className="btn-outline sm:flex-[0.3]"
                  >
                    Reset
                  </button>
                </div>
                
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
