import { CONFIG, getThemeClasses } from '../config'

export default function About() {
  const theme = getThemeClasses()
  const { about } = CONFIG

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className={`text-3xl font-light ${theme.heading} mb-4`}>{about.headline}</h1>
        <p className={`${theme.body} leading-relaxed`}>
          The story behind what we do.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        <section>
          <p className={`${theme.body} leading-relaxed whitespace-pre-line`}>
            {about.content}
          </p>
        </section>

        <section>
          <h2 className={`text-lg font-medium ${theme.heading} mb-3`}>What We Believe</h2>
          <ul className={`space-y-2 ${theme.body}`}>
            <li className="flex items-start gap-3">
              <span className={`w-1 h-1 ${theme.featureDot} rounded-full mt-2 flex-shrink-0`}></span>
              <span>Quality over quantity</span>
            </li>
            <li className="flex items-start gap-3">
              <span className={`w-1 h-1 ${theme.featureDot} rounded-full mt-2 flex-shrink-0`}></span>
              <span>Simple, honest pricing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className={`w-1 h-1 ${theme.featureDot} rounded-full mt-2 flex-shrink-0`}></span>
              <span>Fast, reliable shipping</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className={`text-lg font-medium ${theme.heading} mb-3`}>Get in Touch</h2>
          <p className={`${theme.body} leading-relaxed`}>
            Have questions or feedback? We'd love to hear from you.
            Reach out through our <a href="/contact" className={`${theme.heading} underline underline-offset-2`}>contact page</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
