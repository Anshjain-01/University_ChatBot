import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-xl font-bold text-gray-900"
          >
            University AI Assistant
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-blue-600 font-semibold mb-4">
              AI-Powered University Assistant
            </p>

            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Your University Information,
              <span className="text-blue-600"> One Chat Away.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Get quick answers to your questions about academics, courses,
              syllabus, exams, attendance, faculty, events and other
              university-related information.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="px-7 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-7 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Login
              </button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white border-y">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              What You Can Ask
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900">
                  Academics
                </h3>
                <p className="mt-3 text-gray-600">
                  Ask about courses, subjects, syllabus, timetable and
                  academic information.
                </p>
              </div>

              <div className="p-6 border rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900">
                  Exams & Attendance
                </h3>
                <p className="mt-3 text-gray-600">
                  Find information about exams, grading, attendance and
                  university rules.
                </p>
              </div>

              <div className="p-6 border rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900">
                  University Life
                </h3>
                <p className="mt-3 text-gray-600">
                  Get information about faculty, labs, library, clubs,
                  events and other university facilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to get started?
          </h2>

          <p className="mt-3 text-gray-600">
            Create your account and start asking university-related questions.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-6 px-7 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Create Account
          </button>
        </section>
      </main>
    </div>
  );
};

export default Landing;