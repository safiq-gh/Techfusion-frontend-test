import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { QrCode, Copy, Check, AlertCircle, Smartphone, CreditCard, Zap } from "lucide-react";
import { useEventStore } from "../store/useEventStore";
import toast from "react-hot-toast";

export default function PaymentSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { event } = useEventStore();
  const [copied, setCopied] = useState(false);

  const upiId = event?.upi_id || "techfusion@upi";
  const qrUrl = event?.qr_image_url;

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success("UPI ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { num: "01", text: "Scan QR or copy UPI ID", icon: QrCode },
    { num: "02", text: "Pay the registration fee", icon: CreditCard },
    { num: "03", text: "Save Transaction ID", icon: Check },
    { num: "04", text: "Fill registration form", icon: Zap },
  ];

  return (
    <section ref={ref} className="section relative overflow-hidden" id="payment">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void-black via-void-deep to-void-black" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block font-heading text-sm tracking-[0.3em] uppercase text-cyber-blue/60 mb-4">
            Step 1 of 2
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Make <span className="text-gradient">Payment</span>
          </h2>
          <p className="font-body text-white/40 max-w-xl mx-auto">
            Complete your payment via UPI and save the transaction ID
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              {/* Glow */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-cyber-blue/20 rounded-3xl blur-2xl"
              />

              {/* QR Container */}
              <div className="relative bg-white p-6 rounded-3xl shadow-2xl">
                {qrUrl ? (
                  <img src={qrUrl} alt="Payment QR Code" className="w-56 h-56 sm:w-64 sm:h-64" />
                ) : (
                  <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center bg-gray-100">
                    <QrCode className="w-32 h-32 text-gray-400" />
                  </div>
                )}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="font-body text-white/40 mt-6 flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-cyber-blue" />
              Scan with any UPI app
            </motion.p>
          </motion.div>

          {/* Payment Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Amount */}
            <div className="p-6 rounded-2xl glass border border-white/5">
              <p className="font-heading text-xs text-white/40 uppercase tracking-wider mb-2">
                Registration Amount
              </p>
              <h2 className="font-display text-4xl font-black text-gradient">
                ₹{event?.registration_fee ?? "100"}
              </h2>
            </div>

            {/* UPI ID */}
            <div className="p-6 rounded-2xl glass border border-white/5">
              <p className="font-heading text-xs text-white/40 uppercase tracking-wider mb-3">
                UPI ID
              </p>
              <div className="flex gap-2">
                <input
                  value={upiId}
                  readOnly
                  className="flex-1 bg-black/50 text-white px-4 py-3 rounded-xl font-mono text-sm border border-white/10 focus:outline-none"
                />
                <motion.button
                  onClick={copyUPI}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/20 transition-all flex items-center gap-2"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                      >
                        <Check className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Copy className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="hidden sm:inline font-heading text-sm">
                    {copied ? "Copied!" : "Copy"}
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {steps.map(({ num, text, icon: Icon }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/2 border border-white/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-cyber-blue" />
                  </div>
                  <div>
                    <p className="font-heading text-xs text-cyber-blue/60 mb-1">{num}</p>
                    <p className="font-body text-xs text-white/50">{text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Warning */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20"
            >
              <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <p className="font-body text-sm text-yellow-500/80">
                <strong>Important:</strong> Save your transaction ID after payment. You'll need it for registration.
              </p>
            </motion.div>

            {/* Registration Closed Alert */}
            {event && !event.registration_open && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="font-heading text-sm text-red-500">
                  Registrations are currently closed
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}