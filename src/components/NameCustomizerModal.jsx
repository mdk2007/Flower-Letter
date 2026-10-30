import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Check } from 'lucide-react';

export default function NameCustomizerModal({
  isOpen,
  onClose,
  recipientName,
  senderName,
  onSave,
}) {
  const [recipient, setRecipient] = useState(recipientName);
  const [sender, setSender] = useState(senderName);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(recipient.trim() || "My Love", sender.trim() || "Yours");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md bg-[#fffdf9] rounded-2xl border border-[#ded2c1] shadow-2xl p-6 overflow-hidden paper-texture"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#eee4d6] mb-5">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-blush-400 fill-blush-300" />
              <h3 className="font-serif font-bold text-lg text-vintage-ink">
                Personalize Mixtape
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-vintage-muted hover:text-vintage-ink hover:bg-cream-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-vintage-muted mb-1.5">
                For (Recipient Name)
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Emily, Honey, Sarah"
                maxLength={30}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded2c1] text-vintage-ink focus:outline-none focus:ring-2 focus:ring-sage-400 font-serif text-sm shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-vintage-muted mb-1.5">
                From (Your Name / Signature)
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="e.g. Liam, Your Boy, Forever Yours"
                maxLength={30}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded2c1] text-vintage-ink focus:outline-none focus:ring-2 focus:ring-sage-400 font-serif text-sm shadow-inner"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-vintage-muted hover:text-vintage-ink transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-sage-500 hover:bg-sage-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Save Names</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
