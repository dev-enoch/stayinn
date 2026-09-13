export default function ContactPage() {
  return (
    <div className="w-full pb-20">
      <div className="flex flex-col md:flex-row gap-16 pt-8 md:pt-12">
        {/* Left Side: Contact Information */}
        <div className="w-full md:w-1/3 space-y-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 mb-6">
              Let's talk.
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether you're looking to host your space, need help with a
              booking, or just want to say hello, we&apos;re always here.
            </p>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
                General Inquiries
              </h3>
              <a
                href="mailto:hello@monarchstay.ng"
                className="text-xl text-gray-900 font-medium hover:text-green-600 transition-colors"
              >
                hello@monarchstay.ng
              </a>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
                Call Us
              </h3>
              <a
                href="tel:+234800MONARCH_STAY"
                className="text-xl text-gray-900 font-medium hover:text-green-600 transition-colors"
              >
                +234 813 000 7829
              </a>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
                Headquarters
              </h3>
              <address className="not-italic text-lg text-gray-900 font-medium leading-relaxed">
                14 Victoria Island
                <br />
                Lagos, Nigeria
              </address>
            </div>
          </div>
        </div>

        {/* Right Side: Minimalist Form */}
        <div className="w-full md:w-2/3 md:pl-12 border-t md:border-t-0 md:border-l border-gray-100 pt-12 md:pt-0">
          <form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-3 text-gray-900 text-lg focus:ring-0 focus:border-green-600 transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-3 text-gray-400 text-lg transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-green-600 peer-valid:-top-6 peer-valid:text-sm"
                >
                  Full Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-3 text-gray-900 text-lg focus:ring-0 focus:border-green-600 transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3 text-gray-400 text-lg transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-green-600 peer-valid:-top-6 peer-valid:text-sm"
                >
                  Email Address
                </label>
              </div>
            </div>

            <div className="relative group mt-12">
              <input
                type="text"
                id="subject"
                required
                className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-3 text-gray-900 text-lg focus:ring-0 focus:border-green-600 transition-colors peer"
                placeholder=" "
              />
              <label
                htmlFor="subject"
                className="absolute left-0 top-3 text-gray-400 text-lg transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-green-600 peer-valid:-top-6 peer-valid:text-sm"
              >
                Subject
              </label>
            </div>

            <div className="relative group pt-4">
              <textarea
                id="message"
                rows={4}
                required
                className="w-full bg-transparent border-0 border-b border-gray-300 px-0 py-3 text-gray-900 text-lg focus:ring-0 focus:border-green-600 transition-colors resize-none peer"
                placeholder=" "
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-0 top-3 text-gray-400 text-lg transition-all peer-focus:-top-6 peer-focus:text-sm peer-focus:text-green-600 peer-valid:-top-6 peer-valid:text-sm"
              >
                How can we help you?
              </label>
            </div>

            <div className="pt-8">
              <button
                type="button"
                className="bg-gray-900 text-white font-semibold py-4 px-12 rounded-full hover:bg-green-600 transition-colors w-full md:w-auto tracking-wide"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
