// src/pages/Home.jsx
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Brain, Users, TrendingUp, Lightbulb } from "lucide-react";
import Navbar from "../components/Navbar.jsx";

export default function Home() {
  const suggestions = [
    {
      tip: "Break study into 25-min Pomodoro sessions for better focus.",
    },
    {
      tip: "Review yesterday’s notes before starting new topics.",
    },
    {
      tip: "Stay consistent – small progress every day beats cramming.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 text-gray-800">
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Unlock your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">learning potential</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            SkillGrow helps you track your study, build streaks, stay motivated, and grow smarter every day.  
            A modern companion for focused learners.
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="/auth"
              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold shadow hover:shadow-lg hover:bg-indigo-700 transition"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-6 py-3 rounded-2xl bg-white border hover:bg-gray-50 flex items-center gap-2"
            >
              Learn More <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>

        {/* Floating Image */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
            alt="Learning Cycle"
            className="w-full md:w-1/2 rounded-2xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Why choose SkillGrow?</h2>
          <p className="text-gray-600 mb-12">
            A complete toolkit designed for learners who want consistency, motivation, and results.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Organized Dashboard",
                desc: "Track subjects, topics, notes & time in one clean dashboard.",
                icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
              },
              {
                title: "Smart Insights",
                desc: "Get charts & reports to visualize your progress over time.",
                icon: <TrendingUp className="w-8 h-8 text-green-600" />,
              },
              {
                title: "Streak Motivation",
                desc: "Build habits with daily streaks and milestones to stay on track.",
                icon: <Brain className="w-8 h-8 text-orange-600" />,
              },
              {
                title: "Community Vibes",
                desc: "Learn together, share progress, and inspire others.",
                icon: <Users className="w-8 h-8 text-purple-600" />,
              },
            ].map((f) => (
              <motion.div
                whileHover={{ y: -5, scale: 1.03 }}
                key={f.title}
                className="bg-gray-50 border rounded-2xl p-6 shadow hover:shadow-lg transition"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-indigo-50 mx-auto mb-4">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SUGGESTIONS PREVIEW */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">📌 Today’s Suggestions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {suggestions.map((s, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-2xl shadow p-5 flex items-start gap-3"
              >
                <Lightbulb className="w-6 h-6 text-yellow-500 mt-1" />
                <p className="text-gray-700 text-sm">{s.tip}</p>
              </motion.div>
            ))}
          </div>
          <a
            href="/suggestions"
            className="inline-block mt-6 text-indigo-600 font-semibold hover:underline"
          >
            See all tips →
          </a>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">What learners say</h2>
          <div className="space-y-8">
            <motion.blockquote
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 rounded-2xl p-6 shadow-lg"
            >
              <p>
                "SkillGrow completely changed how I manage my study time. I’ve never been this consistent!"
              </p>
              <footer className="mt-4 text-sm">– Riya, Engineering Student</footer>
            </motion.blockquote>
            <motion.blockquote
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 rounded-2xl p-6 shadow-lg"
            >
              <p>
                "The streak system is addictive 🔥 and I love seeing my progress in reports."
              </p>
              <footer className="mt-4 text-sm">– Arjun, UPSC Aspirant</footer>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h3 className="text-3xl font-bold">Start your growth journey today 🚀</h3>
        <p className="text-gray-600 mt-3">
          Don’t just study. Build habits, track progress, and stay motivated with SkillGrow.
        </p>
        <a
          href="/auth"
          className="inline-block mt-6 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Join Now
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between">
          <span>© {new Date().getFullYear()} SkillGrow</span>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="#features" className="hover:text-gray-700">Features</a>
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
