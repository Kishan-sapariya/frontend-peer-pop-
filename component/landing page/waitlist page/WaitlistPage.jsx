"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWaitlistStore } from "@/store/useWaitlistStore";
import toast from "react-hot-toast";
import HeroSectionWaitlist from "./hero section/HeroSectionWaitlist";
import Testimonail from "./testimonial/Testimonail";
import EarlyAccess from "./early access/EarlyAccess";
import Faq from "./faq/Faq";
import Cta from "./cta/Cta";
import HowItWorks from "./how it works/HowItWorks";

const SuccessMessage = ({ onClose }) => (
  <motion.div
    key="success"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="text-center space-y-6 py-6"
  >
    <div className="text-6xl mb-4">🎉</div>
    <h3 className="text-2xl font-bold text-yellow-500">
      You're In! Welcome to the Peer pop.
    </h3>
    <p className="text-zinc-300">
      We've successfully reserved your spot. Keep an eye on your inbox for your
      exclusive early access invitation!
    </p>
    <Button
      onClick={onClose}
      className="bg-yellow-500 hover:bg-yellow-600 text-zinc-800 font-bold text-base px-6 py-3 transition-all duration-200 border border-yellow-500/50"
    >
      Close
    </Button>
  </motion.div>
);

const WaitlistForm = ({ isOpen, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const { formData, setField, submitWaitlist, loading } = useWaitlistStore();

  const handleOpenChange = (open) => {
    if (!open) {
      setShowSuccess(false); 
      onClose();
    }
  };

  const handleChange = (e) => {
    setField(e.target.id, e.target.value);
  };

  const handleRoleChange = (value) => {
    setField("role", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await submitWaitlist();
    if (!result) return;

    if (result.ok) {
      toast.success(
        result.existed
          ? "You're already on the waitlist 🎉"
          : "You're in! 🎉 Welcome to the Founding Circle."
      );

      if (!result.existed) {
        setShowSuccess(true);
      } else {
        onClose(); 
      }
    } else if (result.existed) {
      toast(result.message || "You’ve already joined the waitlist 🎉");
      onClose();
    } else {
      toast.error(result.message || "Something went wrong. Try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {" "}
      {/* Use local handler */}
      <DialogContent className="bg-black/90 backdrop-blur-2xl border border-zinc-700 text-white max-w-sm sm:max-w-md shadow-2xl shadow-yellow-500/10">
        <DialogHeader>
          <DialogTitle className="text-yellow-500 text-3xl font-extrabold tracking-tight">
            {showSuccess
              ? "✅ Congratulations!"
              : "Reserve Your Exclusive Spot"}
          </DialogTitle>
          {!showSuccess && (
            <p className="text-zinc-400 text-sm mt-1">
              Join the founding circle for premium access and priority features.
            </p>
          )}
        </DialogHeader>

        <AnimatePresence mode="wait">
          {showSuccess ? (
            <SuccessMessage onClose={onClose} />
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* --- Form Fields (Unchanged) --- */}
              <div>
                <Label htmlFor="name" className="text-yellow-500 font-semibold">
                  Name
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="bg-zinc-900 border-zinc-700 text-white mt-1"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-yellow-500 font-semibold"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="bg-zinc-900 border-zinc-700 text-white mt-1"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <Label htmlFor="role" className="text-yellow-500 font-semibold">
                  Role (Creator or Brand?)
                </Label>
                <Select
                  required
                  name="role"
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  disabled={loading}
                >
                  <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white mt-1 h-10">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                    <SelectItem value="creator">Creator</SelectItem>
                    <SelectItem value="company">Brand / Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-extrabold text-base py-6 transition-all duration-200 hover:scale-[1.01] shadow-lg shadow-yellow-500/30"
              >
                {loading ? "Submitting..." : "Submit & Reserve Spot"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default function PeerPopWaitlist() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);

  return (
    <main className="min-h-screen bg-black text-white overflow-y-hidden ">
      <WaitlistForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <HeroSectionWaitlist openForm={openForm} />
      <Testimonail />
      <EarlyAccess openForm={openForm} />
      <HowItWorks />
      <Faq />
      <Cta openForm={openForm} />
    </main>
  );
}
