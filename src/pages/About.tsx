export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-light text-zinc-100 mb-4">About</h1>
        <p className="text-zinc-500 leading-relaxed">
          The story behind what we do.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-medium text-zinc-200 mb-3">Our Mission</h2>
          <p className="text-zinc-400 leading-relaxed">
            We started with a simple idea: quality products shouldn't be complicated to find or buy.
            Too often, shopping feels overwhelming. We wanted to change that.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-zinc-200 mb-3">What We Believe</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Every product we offer is chosen with care. We focus on things that are well-made,
            useful, and built to last. No clutter, no gimmicks.
          </p>
          <ul className="space-y-2 text-zinc-400">
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 bg-zinc-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Quality over quantity</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 bg-zinc-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Simple, honest pricing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 bg-zinc-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Fast, reliable shipping</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-zinc-200 mb-3">Get in Touch</h2>
          <p className="text-zinc-400 leading-relaxed">
            Have questions or feedback? We'd love to hear from you.
            Reach out through our <a href="/contact" className="text-zinc-300 hover:text-zinc-100 underline underline-offset-2">contact page</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
