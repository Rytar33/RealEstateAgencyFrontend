import React, { useState, useEffect } from "react";

function Hero() {
    const [location, setLocation] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showErrorNotification, setShowErrorNotification] = useState(false);
    const [errorData, setErrorData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [postData, setPostData] = useState({}); // Состояние для хранения данных для POST-запроса

    useEffect(() => {
        // Функция для отправки GET-запроса
        const fetchData = async () => {
            try {
                const response = await fetch(`API_ENDPOINT?query=${location}`);
                const data = await response.json();
                setSearchResults(data);
                setShowErrorNotification(data.length === 0);
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorData({ message: error.message, problem: "Error fetching data" });
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                }, 5000);
            }
        };

        if (location) {
            fetchData();
        }
    }, [location]);

    // Функция для отправки POST-запроса
    const postDataToServer = async () => {
        try {
            const response = await fetch('API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            console.log('POST request response:', data);
        } catch (error) {
            console.error('Error posting data:', error);
            setErrorData({ message: error.message, problem: "Error posting data" });
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 5000);
        }
    };

    const handleInputChange = (event) => {
        setLocation(event.target.value);
    };

    // Обработчик события для кнопки поиска
    const handleSearchButtonClick = () => {
        // Отправка POST-запроса на сервер
        postDataToServer();
    };

    return (
        <div className="animate__animated animate__fadeInLeft flex flex-col justify-end items-center px-16 pt-10 pb-20 bg-white max-md:px-5">
            <div className="flex flex-col w-full max-w-[1177px] max-md:max-w-full">
                <div className="mt-20 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
                                <div className="text-6xl font-bold leading-[86px] text-slate-900 max-md:max-w-full max-md:text-4xl max-md:leading-[58px]">
                                Современное жилье для всех

                                </div>
                                <h1 className="mt-6 text-xl leading-9 text-slate-900 max-md:max-w-full">
                                Мы предоставляем полный сервис по продаже, покупке или аренде недвижимости. Мы работаем в Мадриде и Барселоне уже более 15 лет.
                                </h1>
                                <div className="p-6 mt-7 rounded bg-slate-100 max-md:px-5 max-md:max-w-full">
                                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                        <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
                                            <div className="flex grow gap-4 px-4 py-4 w-full text-lg leading-7 bg-white rounded border border-solid border-zinc-300 text-slate-900 max-md:mt-10">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/08beafa144263d8e0602cdb67a7eb74825c1182902f075fba93ba2a14f44ca89?"
                                                    className="shrink-0 w-4 aspect-[0.69] fill-blue-900"
                                                    alt="Location search"
                                                />
                                                <input
                                                    placeholder="Поиск по городу"
                                                    value={location}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                            <button className="button flex grow gap-4 px-6 py-5 w-full text-base font-bold text-center text-white whitespace-nowrap bg-blue-900 rounded max-md:px-5 max-md:mt-10">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7465544781e147d9db16f21436856b9f133e3a080f27e2c1a0a211d353c82572?"
                                                    className="shrink-0 w-4 aspect-square"
                                                    alt="Search"
                                                />
                                                <div className="my-auto">Поиск</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                            <img
                                loading="lazy"
                                srcSet="https://sun9-77.userapi.com/impg/PS4h5qsXCpUpiZNoZDOPMr7uF1AYuYcBSaKbXg/clCi7n7DEAY.jpg?size=539x491&quality=96&sign=6bab85b0073296cf8130c9a4f034e946&type=album"
                                className="grow w-full aspect-[1.1] max-md:mt-10 max-md:max-w-full"
                                alt="Living space"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {showErrorNotification && (
                <div className="absolute top-4 right-4 rounded-md bg-red-50 p-4 z-50">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Город не найден
                            </h3>
                        </div>
                        </div>
                       
                    </div>
                </div>
            )}
            {showModal && (
                <div className="absolute top-4 right-4 rounded-md bg-red-50 p-4 z-50">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                {errorData.problem}
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                                <ul role="list" className="list-disc pl-5 space-y-1">
                                    <li>
                                        {errorData.message}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Hero;
