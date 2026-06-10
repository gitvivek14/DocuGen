export function FAQBlock({
  faqs,
  title = "Frequently asked questions"
}: {
  faqs: Array<{ question: string; answer: string }>;
  title?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10" id="faq">
      <h2 className="text-[18px] font-medium text-body">{title}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="rounded-card border border-slate-200 bg-white p-4 text-[14px] shadow-soft"
          >
            <summary className="cursor-pointer text-[14px] font-medium text-body">
              {faq.question}
            </summary>
            <p className="mt-2 text-secondary">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
