import React, { useState } from 'react';

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        type="button"
        className="flex justify-between items-center w-full px-8 py-6 focus:outline-none transition-colors duration-300"
        aria-controls={question}
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-medium text-gray-900">{question}</span>
        <svg
          className={`w-8 h-8 text-gray-500 transform ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-8 py-6 bg-gray-100" id={question}>
          <p className="text-lg text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full">
        <h2 className="text-center text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Часто задаваемые вопросы
        </h2>
        <div className="mt-8 space-y-8">
          <FaqItem
            question="Какие услуги предоставляет ваше агентство недвижимости?"
            answer="Мы предоставляем полный спектр услуг по продаже, покупке и аренде недвижимости, включая консультации, поиск объектов, проведение сделок и юридическое сопровождение."
          />
          <FaqItem
            question="Сколько времени ваше агентство находится на рынке?"
            answer="Наше агентство успешно работает на рынке недвижимости уже более 15 лет, завоевав доверие клиентов благодаря профессионализму и качественному обслуживанию."
          />
          <FaqItem
            question="Каковы преимущества обращения в ваше агентство?"
            answer="Мы предлагаем индивидуальный подход к каждому клиенту, широкий выбор объектов недвижимости, профессиональное сопровождение сделок и прозрачную работу."
          />
          <FaqItem
            question="Какие документы необходимы для проведения сделки с вашим агентством?"
            answer="Для проведения сделки с нашим агентством необходимы документы, подтверждающие личность участников сделки (паспорт или другой удостоверяющий личность документ), а также документы на объект недвижимости (свидетельство о собственности, технический паспорт и т.д.)."
          />
          <FaqItem
            question="Как долго занимает процесс регистрации сделки с вашим агентством?"
            answer="Время регистрации сделки зависит от конкретных условий и особенностей сделки, однако мы прилагаем все усилия для того, чтобы процесс был максимально быстрым и эффективным для наших клиентов."
          />
          <FaqItem
            question="Предоставляет ли ваше агентство услуги по оценке недвижимости?"
            answer="Да, мы предоставляем услуги по оценке недвижимости, которые помогут определить рыночную стоимость вашего объекта недвижимости и принять обоснованные решения при продаже, покупке или аренде."
          />
        </div>
      </div>
    </div>
  );
}

export default App;
