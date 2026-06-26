import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  BarChart3,
  Target,
  Zap,
  ChevronDown,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-20">
        {/* Golden Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#D4AF37] opacity-20"
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `float ${6 + Math.random() * 8}s infinite alternate`,
                animationDelay: Math.random() * 5 + "s",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              Football Intelligence.
              <br />
              <span className="text-[#D4AF37]">Not Guesswork.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-[#A1A1AA] max-w-lg leading-relaxed"
            >
              Advanced probability analysis that evaluates every match before
              kickoff using historical data, statistical models and intelligent
              prediction algorithms.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/today"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-[#050505] font-medium rounded-lg hover:bg-[#E5C56A] transition-colors duration-300 shadow-lg shadow-[#D4AF37]/20 text-base"
              >
                Analyze Today's Matches
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#222222] text-white font-medium rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 text-base"
              >
                How It Works
              </Link>
            </motion.div>
          </motion.div>

          {/* 3D Football */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37]/30 via-[#D4AF37]/10 to-transparent blur-3xl animate-pulse" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F5E56B] to-[#B8962E] shadow-2xl shadow-[#D4AF37]/30 animate-float">
                <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/40" />
                <div className="absolute inset-[10%] rounded-full border border-[#D4AF37]/30" />
                <div className="absolute inset-[20%] rounded-full border border-[#D4AF37]/20" />
                <div className="absolute inset-[30%] rounded-full border border-[#D4AF37]/10" />
                {/* Pentagon patterns */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rotate-45">
                  <div className="w-full h-full border-2 border-[#D4AF37]/40 rounded-lg" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 -rotate-12">
                  <div className="w-full h-full border-2 border-[#D4AF37]/30 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#A1A1AA]"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl sm:text-4xl font-bold"
            >
              Why Choose Us
            </motion.h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Brain,
                title: "AI Probability Engine",
                desc: "Proprietary algorithms that learn from decades of match data to deliver accurate probability assessments.",
              },
              {
                icon: BarChart3,
                title: "Historical Match Analysis",
                desc: "Deep statistical analysis of team performance, head-to-head records, and player form over time.",
              },
              {
                icon: Target,
                title: "Confidence Scoring",
                desc: "Each prediction includes a confidence metric so you know exactly how much weight to give it.",
              },
              {
                icon: Zap,
                title: "Fast Prediction Generation",
                desc: "Get instant insights with sub‑second processing, so you never miss a tactical edge.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="group p-6 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#D4AF37]/40 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl sm:text-4xl font-bold"
            >
              How It Works
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Connector line (hidden on mobile) */}
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-[#222222] -translate-x-1/2" />

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-8 md:space-y-0"
            >
              {[
                {
                  step: "01",
                  title: "Select Match",
                  desc: "Choose any upcoming fixture from our comprehensive list of leagues and competitions.",
                },
                {
                  step: "02",
                  title: "Analyze Historical Data",
                  desc: "Our engine reviews past performances, player statistics, and tactical trends.",
                },
                {
                  step: "03",
                  title: "Generate Prediction",
                  desc: "The AI produces a detailed probability breakdown for each possible outcome.",
                },
                {
                  step: "04",
                  title: "Receive Detailed Insights",
                  desc: "Get a clear, actionable report with confidence scores and key factors.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-display font-bold text-lg">
                        {item.step}
                      </div>
                      {index < 3 && (
                        <div className="hidden md:block absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-[#222222]" />
                      )}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <h3 className="font-display text-xl font-semibold mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer (minimal) */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#222222] bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-bold text-white">
            PitchAnalysis
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#A1A1AA]">
            <Link to="/privacy" className="hover:text-[#D4AF37] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[#D4AF37] transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">
              Contact
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              GitHub
            </a>
          </div>
          <span className="text-sm text-[#A1A1AA]">
            &copy; {new Date().getFullYear()} PitchAnalysis
          </span>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite alternate;
        }
        @keyframes pulse-gold {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
