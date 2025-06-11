"use client"
import { useState } from 'react';

export default function Faqs({questions}) {
  const [faqOpen, setFaqOpen] = useState(0);

  return (
    <div className='py-12'>
      <div>
        {questions.map((q, i) =>
          <div key={`faq-${i}`} className="shadow-sm mb-2">
            <p
              id={i}
              className="w-full p-4 font-bold bg-black text-white mb-0 cursor-pointer rounded-lg border border-gray-200"
              onClick={(e) => setFaqOpen(e.target.id)}
            >
              <span className="font-bold mr-4 text-brand-1">›</span>{q.q}
            </p>
            <p className={`${faqOpen == i ? 'flex' : 'hidden'} bg-gray-50 p-12`}>
              {q.a}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}