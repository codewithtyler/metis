import React from 'react';
import config from '../../../config.json';

const baseFaqs = [
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
  },
  {
    question: 'How many team members can I add?',
    answer: 'The Free plan supports a single user, while the Team plan allows up to 10 team members to collaborate on support tickets.',
  },
];

const launchFaq = {
  question: 'What is launch pricing?',
  answer: 'During our launch period, we\'re offering a special discounted rate that will be locked in for the lifetime of your account. The price will increase after the launch period ends.',
};

const getFaqs = () => {
  if (config.launchPriceAvailable) {
    return [launchFaq, ...baseFaqs];
  }
  return baseFaqs;
};

export default function FAQ() {
  const faqs = getFaqs();

  return (
    <div className="bg-dark-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-dark-700">
          <h2 className="text-center text-3xl font-extrabold text-dark-100 sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-dark-700">
            {faqs.map((faq) => (
              <div key={faq.question} className="pt-6">
                <dt className="text-lg">
                  <button className="text-left w-full flex justify-between items-start text-dark-100">
                    <span className="font-medium">{faq.question}</span>
                  </button>
                </dt>
                <dd className="mt-2 pr-12">
                  <p className="text-base text-dark-300">
                    {faq.answer}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}