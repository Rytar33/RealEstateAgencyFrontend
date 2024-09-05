import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../header/header';
import Footer from '../footer/footer';

export default function Contact() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Поле "Имя" обязательно для заполнения'),
      lastName: Yup.string().required('Поле "Фамилия" обязательно для заполнения'),
      email: Yup.string().email('Неверный формат email').required('Поле "Email" обязательно для заполнения'),
      phone: Yup.string().matches(/^\+?[0-9]{3}-?[0-9]{6,12}$/, 'Неверный формат номера телефона'),
      subject: Yup.string().required('Поле "Тема" обязательно для заполнения'),
      message: Yup.string().max(500, 'Максимальная длина сообщения 500 символов').required('Поле "Сообщение" обязательно для заполнения'),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch('https://localhost:44329/api/v1.2/Sender/Email/ContactUs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          numberPhone: values.phone,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      })
        .then(response => {
          if (response.status === 204) {
            alert('Данные успешно отправлены!');
          } else {
            alert('Произошла ошибка при отправке данных.');
          }
        })
        .catch(error => {
          alert('Произошла ошибка при отправке данных:', error);
        });
    },
  });

  return (
    <div className='wrapper'>
      <Header />
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="relative bg-white shadow-xl">
            <h2 className="sr-only">Свяжитесь с нами</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="relative overflow-hidden py-10 px-6 bg-indigo-700 sm:px-10 xl:p-12">
   <div className="absolute inset-0 pointer-events-none sm:hidden" aria-hidden="true">
                <svg
                  className="absolute inset-0 w-full h-full"
                  width={343}
                  height={388}
                  viewBox="0 0 343 388"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                    fill="url(#linear1)"
                    fillOpacity=".1" />
                  <defs>
                    <linearGradient
                      id="linear1"
                      x1="254.553"
                      y1="107.554"
                      x2="961.66"
                      y2="814.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  width={359}
                  height={339}
                  viewBox="0 0 359 339"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                    fill="url(#linear2)"
                    fillOpacity=".1" />
                  <defs>
                    <linearGradient
                      id="linear2"
                      x1="192.553"
                      y1="28.553"
                      x2="899.66"
                      y2="735.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  width={160}
                  height={678}
                  viewBox="0 0 160 678"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                    fill="url(#linear3)"
                    fillOpacity=".1" />
                  <defs>
                    <linearGradient
                      id="linear3"
                      x1="192.553"
                      y1="325.553"
                      x2="899.66"
                      y2="1032.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset={1} stopColor="#fff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>              </div>
              <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                <h3 className="text-lg font-medium text-gray-900">Отправить нам сообщение</h3>
                <form onSubmit={formik.handleSubmit} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">Имя</label>
                    <input
                      type="text"
                      id="firstName"
                      {...formik.getFieldProps('firstName')}
                      className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="text-red-500">{formik.errors.firstName}</div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">Фамилия</label>
                    <input
                      type="text"
                      id="lastName"
                      {...formik.getFieldProps('lastName')}
                      className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="text-red-500">{formik.errors.lastName}</div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
                    <input
                      type="email"
                      id="email"
                      {...formik.getFieldProps('email')}
                      className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-900">Телефон</label>
                    <input
                      type="tel"
                      id="phone"
                      {...formik.getFieldProps('phone')}
                      className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div className="text-red-500">{formik.errors.phone}</div>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-900">Тема</label>
                    <input
                      type="text"
                      id="subject"
                      {...formik.getFieldProps('subject')}
                      className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                      <div className="text-red-500">{formik.errors.subject}</div>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900">Сообщение</label>
                    <textarea
                      id="message"
                      {...formik.getFieldProps('message')}
                      rows={4}
                      className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                    {formik.touched.message && formik.errors.message ? (
                      <div className="text-red-500">{formik.errors.message}</div>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2 sm:flex sm:justify-end">
                    <button
                      type="submit"
                      className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto"
                    >
                      Отправить
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
