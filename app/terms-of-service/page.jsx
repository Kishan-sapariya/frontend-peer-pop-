import React from "react";
import Head from "next/head";

const TermsOfService = () => {
  return (
    <>
      <Head>
        <title>Terms of Service - Peerpop</title>
        <meta
          name="description"
          content="Peerpop's official Terms of Service. By using our services, you agree to these terms."
        />
      </Head>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Effective Date:</strong> 19/09/2025
          </p>
        </header>

        <p className="text-gray-600 mb-6">
          These Terms of Service (“Terms”) govern your use of Peerpop (“we,”
          “our,” or “us”). By accessing or using our services, you agree to
          these Terms.
        </p>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
            1. Eligibility
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>You must be at least 13 years old to use Peerpop.</li>
            <li>
              By using Peerpop, you confirm you have the legal authority to
              agree to these Terms.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
            2. Use of Services
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>You agree to use Peerpop only for lawful purposes.</li>
            <li>
              You will not attempt to disrupt, hack, or misuse the platform.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
            3. User Content
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>You retain ownership of any content you share on Peerpop.</li>
            <li>
              By posting, you grant Peerpop a non-exclusive license to use,
              display, and distribute your content to operate the service.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
            4. Privacy
          </h2>
          <p className="text-gray-600">
            Your use of Peerpop is also governed by our{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
            5. Disclaimers & Limitation of Liability
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Peerpop is provided “as is” without warranties of any kind.</li>
            <li>
              We are not liable for damages resulting from the use or inability
              to use the service.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
            6. Termination
          </h2>
          <p className="text-gray-600">
            We may suspend or terminate your access if you violate these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
            7. Changes to Terms
          </h2>
          <p className="text-gray-600">
            We may update these Terms from time to time. Continued use after
            updates constitutes acceptance.
          </p>
        </section>

        <footer className="mt-8 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600">
            If you have questions about these Terms, contact us at:{" "}
            <a
              href="mailto:ashysh2412@gmail.com"
              className="text-blue-600 hover:underline"
            >
              ashysh2412@gmail.com
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default TermsOfService;