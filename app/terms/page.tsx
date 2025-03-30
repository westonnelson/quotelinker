export default function TermsOfServicePage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-blue max-w-none">
        <p className="lead">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using QuoteLinker's website and services, you agree to be bound by these Terms of Service and
          all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
          using or accessing this site.
        </p>

        <h2>Use License</h2>
        <p>
          Permission is granted to temporarily use the materials on QuoteLinker's website for personal, non-commercial
          purposes only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>Attempt to decompile or reverse engineer any software contained on QuoteLinker's website</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>

        <h2>Disclaimer</h2>
        <p>
          The materials on QuoteLinker's website are provided on an 'as is' basis. QuoteLinker makes no warranties,
          expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
          implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
          intellectual property or other violation of rights.
        </p>

        <h2>Limitations</h2>
        <p>
          In no event shall QuoteLinker or its suppliers be liable for any damages (including, without limitation,
          damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
          use the materials on QuoteLinker's website, even if QuoteLinker or a QuoteLinker authorized representative has
          been notified orally or in writing of the possibility of such damage.
        </p>

        <h2>Accuracy of Materials</h2>
        <p>
          The materials appearing on QuoteLinker's website could include technical, typographical, or photographic
          errors. QuoteLinker does not warrant that any of the materials on its website are accurate, complete or
          current. QuoteLinker may make changes to the materials contained on its website at any time without notice.
        </p>

        <h2>Links</h2>
        <p>
          QuoteLinker has not reviewed all of the sites linked to its website and is not responsible for the contents of
          any such linked site. The inclusion of any link does not imply endorsement by QuoteLinker of the site. Use of
          any such linked website is at the user's own risk.
        </p>

        <h2>Modifications</h2>
        <p>
          QuoteLinker may revise these terms of service for its website at any time without notice. By using this
          website you are agreeing to be bound by the then current version of these terms of service.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of the United States and
          you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </p>

        <h2>Contact Us</h2>
        <p>If you have any questions about these Terms of Service, please contact us at:</p>
        <p>
          Email: terms@quotelinker.com
          <br />
          Address: 123 Insurance Lane, Suite 100, Insurance City, IN 12345
        </p>
      </div>
    </div>
  )
}

