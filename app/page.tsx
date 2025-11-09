"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

type Screen = "welcome" | "story" | "proposal" | "celebration";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({
    name: "Swati Shriya Mishra",
    answer: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProposalResponse = () => {
    setShowConfetti(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setCurrentScreen("celebration");
      } else {
        alert("Something went wrong, but I still love you! ❤️");
        setCurrentScreen("celebration");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong, but I still love you! ❤️");
      setCurrentScreen("celebration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{ y: "100vh", x: Math.random() * 100 + "%" }}
            animate={{
              y: "-100vh",
              x: Math.random() * 100 + "%",
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      <AnimatePresence mode="wait">
        {currentScreen === "welcome" && (
          <WelcomeScreen key="welcome" onNext={() => setCurrentScreen("story")} />
        )}
        {currentScreen === "story" && (
          <StoryScreen key="story" onNext={() => setCurrentScreen("proposal")} />
        )}
        {currentScreen === "proposal" && (
          <ProposalScreen
            key="proposal"
            onYes={handleProposalResponse}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
        {currentScreen === "celebration" && (
          <CelebrationScreen
            key="celebration"
            onReplay={() => {
              setCurrentScreen("welcome");
              setShowConfetti(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Screen 1: Welcome
function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="text-8xl animate-heartbeat">❤️</div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-4xl md:text-5xl font-serif font-bold text-rose-600 mb-4"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Hi Swati Shriya Mishra ❤️
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-xl md:text-2xl text-rose-400 mb-12"
      >
        A surprise just for you...
      </motion.p>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="px-8 py-4 bg-rose-500 text-white rounded-full text-lg font-medium shadow-lg hover:bg-rose-600 transition-colors"
      >
        Tap to Begin 💌
      </motion.button>
    </motion.div>
  );
}

// Screen 2: Love Story
function StoryScreen({ onNext }: { onNext: () => void }) {
  const [currentText, setCurrentText] = useState("");
  const [showButton, setShowButton] = useState(false);

  const fullText = `Jab se tum meri zindagi mein aayi ho,
sab badal gaya…

Tumhari hasi, tumhari baatein,
sab meri duniya ko roshan kar deti hain.

Swati, tum meri har kal,
har sapna, har khushi ho…

And today…
I want to make you mine forever… 💕`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setCurrentText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center max-w-3xl mx-auto"
    >
      <motion.div className="mb-12">
        <div className="text-6xl mb-8">🌹</div>
        <div
          className="text-2xl md:text-3xl text-rose-700 whitespace-pre-line leading-relaxed font-serif"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {currentText}
        </div>
      </motion.div>

      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-8 py-4 bg-rose-500 text-white rounded-full text-lg font-medium shadow-lg hover:bg-rose-600 transition-colors flex items-center gap-2"
          >
            Continue ❤️
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-30"
            initial={{ y: "100%", x: `${Math.random() * 100}%` }}
            animate={{ y: "-100%", rotate: 360 }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            💕
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Screen 3: Proposal
function ProposalScreen({
  onYes,
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}: {
  onYes: () => void;
  formData: { name: string; answer: string; message: string };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}) {
  const [showForm, setShowForm] = useState(false);

  const handleYesClick = () => {
    onYes();
    setFormData({ ...formData, answer: "YES! ❤️" });
    setShowForm(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center"
    >
      {!showForm ? (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="text-9xl animate-glow">💍</div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-serif font-bold text-rose-600 mb-12"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Swati Shriya Mishra,
            <br />
            Will You Marry Me? 💍❤️
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYesClick}
              className="px-10 py-4 bg-rose-500 text-white rounded-full text-xl font-medium shadow-lg hover:bg-rose-600 transition-colors"
            >
              ✅ YES ❤️
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYesClick}
              className="px-10 py-4 bg-pink-500 text-white rounded-full text-xl font-medium shadow-lg hover:bg-pink-600 transition-colors"
            >
              ✅ Of Course 😍
            </motion.button>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-md w-full"
        >
          <h2 className="text-3xl font-serif font-bold text-rose-600 mb-6">
            Write something for me 💌
          </h2>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-rose-200 rounded-lg focus:border-rose-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                Your Answer
              </label>
              <input
                type="text"
                value={formData.answer}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-rose-200 rounded-lg focus:border-rose-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                Optional Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border-2 border-rose-200 rounded-lg focus:border-rose-500 focus:outline-none resize-none"
                placeholder="Share your thoughts... 💭"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-rose-500 text-white rounded-full text-lg font-medium shadow-lg hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending... 💕" : "Send My Love 💕"}
            </motion.button>
          </form>
        </motion.div>
      )}

      {/* Falling rose petals */}
      {showForm && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              }}
              animate={{
                y: "110vh",
                rotate: 360,
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 3 + 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              🌹
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// Screen 4: Celebration
function CelebrationScreen({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative"
    >
      {/* Falling roses */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
            }}
            animate={{
              y: "110vh",
              rotate: 360,
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 3 + 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            🌹
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="mb-8 relative z-10"
      >
        <div className="text-9xl mb-4">❤️</div>
        <div className="text-6xl">💍</div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-6xl font-serif font-bold text-rose-600 mb-6 relative z-10"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        You just made my
        <br />
        whole life complete ❤️
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-2xl text-rose-500 mb-12 relative z-10"
      >
        I love you, Swati Shriya Mishra 💕
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative z-10"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReplay}
          className="px-8 py-4 bg-rose-500 text-white rounded-full text-lg font-medium shadow-lg hover:bg-rose-600 transition-colors"
        >
          Replay Love 💖
        </motion.button>
      </motion.div>

      {/* Heart frame for photo (optional - can be added later) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12 relative z-10"
      >
        <div className="w-64 h-64 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full flex items-center justify-center shadow-2xl">
          <div className="text-6xl">👫</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
