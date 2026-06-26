import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  BarChart3,
  Target,
  Zap,
  ChevronDown,
  Sparkles,
  Trophy,
  TrendingUp,
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
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
        </div>

        {/* Golden Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#D4AF37] opacity-10"
              style={{
                width: Math.random() * 4 + 2 + "px",
                height: Math.random() * 4 + 2 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `float ${8 + Math.random() * 10}s infinite alternate`,
                animationDelay: Math.random() * 6 + "s",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 mb-8"
            >
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">
                AI-Powered Football Intelligence
              </span>
            </motion.div>

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
              className="mt-6 text-lg sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed"
            >
              Advanced probability analysis that evaluates every match before
              kickoff using historical data, statistical models and intelligent
              prediction algorithms.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/today"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-[#050505] font-medium rounded-lg hover:bg-[#E5C56A] transition-colors duration-300 shadow-lg shadow-[#D4AF37]/20 text-base group"
              >
                Analyze Today's Matches
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#222222] text-white font-medium rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 text-base"
              >
                How It Works
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              {[
                { label: "Matches Analyzed", value: "10K+" },
                { label: "Leagues Covered", value: "50+" },
                { label: "Accuracy Rate", value: "92%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-display font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#A1A1AA] mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
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
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 mb-4"
            >
              <Trophy className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">
                Why Choose Us
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl sm:text-4xl font-bold"
            >
              Built for the <span className="text-[#D4AF37]">Modern Analyst</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-[#A1A1AA] max-w-2xl mx-auto"
            >
              Every tool you need to make data-driven decisions, powered by
              cutting-edge AI.
            </motion.p>
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
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 mb-4"
            >
              <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">
                How It Works
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl sm:text-4xl font-bold"
            >
              From Data to <span className="text-[#D4AF37]">Insight</span>
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

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center p-12 rounded-3xl bg-[#111111] border border-[#222222] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#D4AF37]/5 blur-3xl" />
            <div className="relative z-10">
              <motion.h2
                variants={fadeInUp}
                className="font-display text-3xl sm:text-4xl font-bold"
              >
                Ready to <span className="text-[#D4AF37]">Elevate</span> Your
                Analysis?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mt-4 text-[#A1A1AA] max-w-xl mx-auto"
              >
                Join thousands of analysts who trust PitchAnalysis for
                data-driven football intelligence.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8">
                <Link
                  to="/today"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-[#050505] font-medium rounded-lg hover:bg-[#E5C56A] transition-colors duration-300 shadow-lg shadow-[#D4AF37]/20 text-base group"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer (minimal) */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#222222] bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="font-display text-xl font-bold text-white">
            PitchAnalysis
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#A1A1AA]">
            <Link
              to="/privacy"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#D4AF37] transition-colors"
            >
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
