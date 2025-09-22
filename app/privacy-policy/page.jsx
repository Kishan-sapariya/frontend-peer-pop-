import React from 'react';
import Head from 'next/head';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Peerpop</title>
        <meta name="description" content="Peerpop's official privacy policy. Learn how we collect, use, and protect your information." />
      </Head>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-2"><strong>Effective Date:</strong> 19/09/2025</p>
        </header>
        
        <p className="text-gray-600 mb-6">
          Peerpop (“we,” “our,” or “us”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our services.
        </p>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">1. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Personal information:</strong> Information you provide when creating an account or signing in with Google (e.g., name, email address, profile information).</li>
            <li><strong>Usage data:</strong> Data related to how you interact with our platform.</li>
            <li><strong>Technical information:</strong> Such as IP address, device type, and browser.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>To provide and improve our services.</li>
            <li>To personalize user experiences.</li>
            <li>To communicate with you regarding updates, new features, or support.</li>
            <li>To ensure security and prevent misuse of the platform.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">3. Data Sharing & Disclosure</h2>
          <p className="text-gray-600 mb-2">We do not sell your personal information. We may share information with:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Trusted third-party service providers who support our operations (e.g., hosting, analytics).</li>
            <li>Disclosure may occur if required by law or to protect our legal rights.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">4. Data Storage & Security</h2>
          <p className="text-gray-600">Your data is stored securely on trusted servers. We use encryption and access controls to protect your information. While we take reasonable measures, no method of transmission or storage is 100% secure.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">5. User Rights</h2>
          <p className="text-gray-600">You can request access, correction, or deletion of your personal data. You may revoke access granted via Google sign-in at any time.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">6. Third-Party Services</h2>
          <p className="text-gray-600">Our platform may contain links to third-party sites. We are not responsible for their privacy practices. We encourage you to review their privacy policies.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">7. Updates to Privacy Policy</h2>
          <p className="text-gray-600">We may update this policy as our services evolve. Updates will be posted on this page.</p>
        </section>

        <footer className="mt-8 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Contact Us</h2>
          <p className="text-gray-600">If you have questions about this Privacy Policy, contact us at: <a href="mailto:ashysh2412@gmail.com" className="text-blue-600 hover:underline">ashysh2412@gmail.com</a></p>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicy;