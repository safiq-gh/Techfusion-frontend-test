import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../utils/validators";
import { registerUser, checkEmail } from "../services/api";
import { useEventStore } from "../store/useEventStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User, Mail, Phone, Building2, BookOpen,
  CalendarDays, Layers, CreditCard,
  Loader2, CheckCircle, XCircle,
  AlertCircle, Send, Lock, ArrowRight,
  ArrowLeft, Sparkles, Zap,
} from "lucide-react";

const yearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
];

const categoryOptions = [
  { value: "web", label: "Web & Mobile Development", icon: "🌐", color: "#00d4ff" },
  { value: "cyber", label: "Cyber Security", icon: "🛡️", color: "#a855f7" },
  { value: "iot", label: "IoT / Robotics", icon: "🤖", color: "#ec4899" },
  { value: "innovation", label: "Innovations in IT", icon: "💡", color: "#10b981" },
];

// Step configuration
const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Academic Details", icon: BookOpen },
  { id: 3, title: "Category & Payment", icon: CreditCard },
];

export default function RegistrationForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const { event, setRegistrationId } = useEventStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [direction, setDirection] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    trigger,
    watch,
    getValues,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const isRegistrationClosed = event && !event.registration_open;
  const isFull = event && event.slots_available <= 0;

  // Email validation
  const handleEmailBlur = async (e) => {
    const email = e.target.value;
    if (!email) return;

    setEmailStatus("checking");
    try {
      const res = await checkEmail(email);
      if (res.data.data.registered) {
        setEmailStatus("taken");
        setError("email", { message: "Email already registered" });
      } else {
        setEmailStatus("available");
      }
    } catch {
      setEmailStatus(null);
    }
  };

  // Step navigation
  const nextStep = async () => {
    const fieldsToValidate = {
      1: ["name", "email", "phone"],
      2: ["college", "department", "year"],
      3: ["category", "transaction_id"],
    };

    const isValid = await trigger(fieldsToValidate[currentStep]);
    if (isValid && emailStatus !== "taken") {
      setDirection(1);
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Form submission
  const onSubmit = async (data) => {
    if (emailStatus === "taken") {
      toast.error("Email already registered!");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...data,
        year: Number(data.year),
        event_ids: [data.category],
      };

      delete payload.category;

      const res = await registerUser(payload);
      const regId = res.data.data.registration_id;

      setRegistrationId(regId);
      toast.success("Registration submitted! Pending verification.");
      navigate(`/success/${regId}`);
    } catch (err) {
      toast.error(err?.response?.data?.error?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  // Input field component
  const InputField = ({ icon: Icon, label, name, type = "text", placeholder, ...rest }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider font-heading">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      <div className="relative group">
        <input
          {...register(name)}
          type={type}
          placeholder={placeholder}
          onBlur={name === "email" ? handleEmailBlur : undefined}
          className="input-field pl-12 group-hover:border-white/20 focus:border-cyber-blue/50 transition-all duration-300"
          {...rest}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-cyber-blue transition-colors">
          <Icon className="w-4 h-4" />
        </div>

        {/* Email status indicator */}
        {name === "email" && emailStatus && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              {emailStatus === "checking" && (
                <motion.div
                  key="checking"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <Loader2 className="w-4 h-4 text-cyber-blue animate-spin" />
                </motion.div>
              )}
              {emailStatus === "available" && (
                <motion.div
                  key="available"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <CheckCircle className="w-4 h-4 text-cyber-green" />
                </motion.div>
              )}
              {emailStatus === "taken" && (
                <motion.div
                  key="taken"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <XCircle className="w-4 h-4 text-red-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="text-red-400 text-xs flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {errors[name].message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // Select field component
  const SelectField = ({ icon: Icon, label, name, options }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider font-heading">
        <Icon className="w-3.5 h-3.5" />
        {label}
      </label>
      <div className="relative group">
        <select
          {...register(name)}
          className="input-field pl-12 appearance-none cursor-pointer group-hover:border-white/20 focus:border-cyber-blue/50 transition-all duration-300"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-cyber-blue transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-400 text-xs flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {errors[name].message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <section id="register" ref={ref} className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-void-deep to-void-black" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-block font-heading text-sm tracking-[0.3em] uppercase text-cyber-purple/60 mb-4">
            Step 2 of 2
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Register </span>
            <span className="text-gradient">Now</span>
          </h2>
          <p className="font-body text-white/40 max-w-lg mx-auto">
            Fill in your details to complete registration
          </p>
        </motion.div>

        {/* Status Alerts */}
        <AnimatePresence>
          {isRegistrationClosed && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
            >
              <Lock className="w-5 h-5 text-red-500" />
              <p className="font-heading text-red-400">Registrations are currently closed</p>
            </motion.div>
          )}

          {isFull && !isRegistrationClosed && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <p className="font-heading text-yellow-400">All slots are filled</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-3xl p-6 sm:p-10 border border-white/5"
        >
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-10 relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {steps.map((step, i) => (
              <div key={step.id} className="relative flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                    currentStep >= step.id
                      ? "bg-gradient-to-br from-cyber-blue to-cyber-purple text-white shadow-lg shadow-cyber-blue/30"
                      : "bg-white/5 text-white/30 border border-white/10"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </motion.div>
                <span
                  className={`absolute -bottom-6 text-xs font-heading whitespace-nowrap ${
                    currentStep >= step.id ? "text-white/70" : "text-white/30"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
            <AnimatePresence mode="wait" custom={direction}>
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-6"
                >
                  <InputField
                    icon={User}
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                  />
                  <InputField
                    icon={Mail}
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <InputField
                    icon={Phone}
                    label="Phone Number"
                    name="phone"
                    placeholder="10-digit mobile number"
                  />
                </motion.div>
              )}

              {/* Step 2: Academic Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-6"
                >
                  <InputField
                    icon={Building2}
                    label="College Name"
                    name="college"
                    placeholder="Enter your college name"
                  />
                  <InputField
                    icon={BookOpen}
                    label="Department"
                    name="department"
                    placeholder="E.g., Information Technology"
                  />
                  <SelectField
                    icon={CalendarDays}
                    label="Year of Study"
                    name="year"
                    options={yearOptions}
                  />
                </motion.div>
              )}

              {/* Step 3: Category & Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="space-y-6"
                >
                  {/* Category Selection */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider font-heading">
                      <Layers className="w-3.5 h-3.5" />
                      Select Category
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {categoryOptions.map((cat) => (
                        <motion.label
                          key={cat.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                            watch("category") === cat.value
                              ? "bg-white/5 border-cyber-blue/50 shadow-lg shadow-cyber-blue/10"
                              : "bg-white/2 border-white/5 hover:border-white/10"
                          }`}
                        >
                          <input
                            {...register("category")}
                            type="radio"
                            value={cat.value}
                            className="sr-only"
                          />
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{cat.icon}</span>
                            <span className="font-heading text-sm text-white/80">
                              {cat.label}
                            </span>
                          </div>
                          {watch("category") === cat.value && (
                            <motion.div
                              layoutId="categoryCheck"
                              className="absolute top-2 right-2"
                            >
                              <CheckCircle className="w-5 h-5 text-cyber-blue" />
                            </motion.div>
                          )}
                        </motion.label>
                      ))}
                    </div>
                    {errors.category && (
                      <p className="text-red-400 text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <InputField
                    icon={CreditCard}
                    label="Transaction ID"
                    name="transaction_id"
                    placeholder="Enter your UPI transaction ID"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-10">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary flex-1 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </motion.button>
              )}

              {currentStep < 3 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={submitting || isRegistrationClosed || isFull}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Registration
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}