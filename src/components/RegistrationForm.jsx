import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Loader2, CheckCircle, AlertCircle,
  Send, Lock, ArrowRight, ArrowLeft
} from "lucide-react";

const yearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
];

const categoryOptions = [
  { value: "web", label: "Web & Mobile Development" },
  { value: "cyber", label: "Cyber Security" },
  { value: "iot", label: "IoT / Robotics" },
  { value: "innovation", label: "Innovations in IT" },
];

function InputField({ register, errors, icon: Icon, label, name, type = "text", placeholder, onBlur }) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-white/40 uppercase tracking-wider flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        onBlur={onBlur}
        className="input-field"
      />
      {errors[name] && (
        <p className="text-red-400 text-xs">{errors[name].message}</p>
      )}
    </div>
  );
}

function SelectField({ register, errors, icon: Icon, label, name, options }) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-white/40 uppercase tracking-wider flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <select {...register(name)} className="input-field">
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-400 text-xs">{errors[name].message}</p>
      )}
    </div>
  );
}

export default function RegistrationForm() {
  const navigate = useNavigate();
  const { event, setRegistrationId } = useEventStore();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    trigger
  } = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const isRegistrationClosed = event && !event.registration_open;
  const isFull = event && event.slots_available <= 0;

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

  const nextStep = async () => {
    const fields = {
      1: ["name", "email", "phone"],
      2: ["college", "department", "year"],
      3: ["category", "transaction_id"],
    };

    const valid = await trigger(fields[currentStep]);
    if (valid && emailStatus !== "taken") {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = async (data) => {
    if (emailStatus === "taken") {
      toast.error("Email already registered");
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
      toast.success("Registration submitted!");
      navigate(`/success/${regId}`);
    } catch (err) {
      toast.error("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const slideVariants = {
    enter: { x: 100, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  return (
    <section className="section">
      <div className="max-w-2xl mx-auto glass-strong p-8 rounded-3xl">

        <form onSubmit={handleSubmit(onSubmit)}>

          <AnimatePresence initial={false}>
            <motion.div
              key={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >

              {currentStep === 1 && (
                <>
                  <InputField register={register} errors={errors} icon={User} label="Full Name" name="name" placeholder="Enter full name" />
                  <InputField register={register} errors={errors} icon={Mail} label="Email" name="email" type="email" placeholder="Enter email" onBlur={handleEmailBlur} />
                  <InputField register={register} errors={errors} icon={Phone} label="Phone" name="phone" placeholder="10-digit number" />
                </>
              )}

              {currentStep === 2 && (
                <>
                  <InputField register={register} errors={errors} icon={Building2} label="College" name="college" placeholder="College name" />
                  <InputField register={register} errors={errors} icon={BookOpen} label="Department" name="department" placeholder="Department" />
                  <SelectField register={register} errors={errors} icon={CalendarDays} label="Year" name="year" options={yearOptions} />
                </>
              )}

              {currentStep === 3 && (
                <>
                  <SelectField register={register} errors={errors} icon={Layers} label="Category" name="category" options={categoryOptions} />
                  <InputField register={register} errors={errors} icon={CreditCard} label="Transaction ID" name="transaction_id" placeholder="UPI ID" />
                </>
              )}

            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn-secondary flex-1">
                <ArrowLeft className="inline w-4 h-4 mr-1" />
                Back
              </button>
            )}

            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} className="btn-primary flex-1">
                Next
                <ArrowRight className="inline w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting || isRegistrationClosed || isFull}
                className="btn-primary flex-1"
              >
                {submitting ? (
                  <>
                    <Loader2 className="inline w-4 h-4 mr-1 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="inline w-4 h-4 mr-1" />
                    Submit
                  </>
                )}
              </button>
            )}
          </div>

        </form>
      </div>
    </section>
  );
}