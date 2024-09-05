import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Switch, useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Pagination from "../page/pagination";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function Filter() {
    const [typeObject, setTypeObject] = useState('');
    const [locality, setLocality] = useState('');
    const [typeSale, setTypeSale] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [isActual, setIsActual] = useState(true); // Если по умолчанию должно быть true
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0); // Общее количество страниц
    const [data, setData] = useState(null);
    const [typeSalesList, setTypeSalesList] = useState([]);
    const [typeLocalitiesList, setTypeLocalitiesList] = useState([]);
    const [typeObjectsList, setTypeObjectsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const query = useQuery();

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const handleGetTypeSales = async () => {
            try {
              const response = await axios.get('https://localhost:44329/api/v1.2/TypeSales');
              setTypeSalesList(response.data);
            } catch (err) {
              setError(err);
            } finally {
              setLoading(false);
            }
          };
    
          const handleGetTypeObjects = async () => {
            try {
              const response = await axios.get('https://localhost:44329/api/v1.2/Entities');
              setTypeObjectsList(response.data);
            } catch (err) {
              setError(err);
            } finally {
              setLoading(false);
            }
          };
    
          const handleGetLocalities = async () => {
            try {
              const response = await axios.get('https://localhost:44329/api/v1.2/Localities');
              setTypeLocalitiesList(response.data);
            } catch (err) {
              setError(err);
            } finally {
              setLoading(false);
            }
          };
          handleGetTypeSales();
          handleGetTypeObjects();
          handleGetLocalities();
          // Загружаем данные при монтировании компонента и при изменении параметров поиска
          fetchData();
      }, [location.search]);

    const handleFetchData = async (e) => {
        e.preventDefault();
        setPage(1); // Сбрасываем на первую страницу при новом запросе
        fetchData();
    };

    const fetchData = async () => {
        
        setLoading(true);
        setError(null);
        try {
            const queryParams = new URLSearchParams(location.search);
            queryParams.delete('TypeObject');
            queryParams.delete('Locality');
            queryParams.delete('TypeSale');
            queryParams.delete('PriceFrom');
            queryParams.delete('PriceTo');
            queryParams.delete('IsActual');
            queryParams.delete('Page.Page');
            queryParams.delete('Page.PageSize');

            if (typeObject) queryParams.append('TypeObject', typeObject);
            if (locality) queryParams.append('Locality', locality);
            if (typeSale) queryParams.append('TypeSale', typeSale);
            if (priceFrom) queryParams.append('PriceFrom', priceFrom);
            if (priceTo) queryParams.append('PriceTo', priceTo);
            if (isActual) queryParams.append('IsActual', isActual);
            queryParams.append('Page.Page', page.toString());
            queryParams.append('Page.PageSize', pageSize.toString());
            navigate({ search: queryParams.toString() });

            const queryString = queryParams.toString();
            const url = queryString ? `?${queryString}` : '';

            const response = await axios.get(`https://localhost:44329/api/v1.2/Catalog${url}`);
            setData(response.data.items);
            setPageSize(response.data.page.pageSize);
            setTotalPages(Math.ceil(response.data.page.count / pageSize)); // Устанавливаем общее количество страниц
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchData(); // Запрашиваем данные для новой страницы
    };

    return (
        <div className="flex flex-col items-center px-5">
            <h1 className="text-5xl font-bold text-center leading-[69.16px] text-slate-900 max-md:max-w-full max-md:text-4xl">
                Искать недвижимость
            </h1>
            <p className="mt-8 text-xl leading-8 text-center text-slate-900 max-md:max-w-full">
                Выбирайте из самых выгодных предложений
            </p>
            <div className="flex justify-center items-center self-stretch px-16 py-12 mt-12 w-full rounded bg-slate-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col items-center w-full max-w-[1120px] max-md:max-w-full">
                    <form onSubmit={handleFetchData}>
                        <div className="flex gap-4 max-md:flex-wrap">
                            <input
                                className="w-378 flex flex-col grow shrink-0 px-4 pb-5 text-lg leading-7 bg-white rounded border border-solid basis-0 border-zinc-300 text-slate-900 w-fit"
                                placeholder="Enter a keyword"
                            />
                            <button
                                type="submit"
                                className="flex gap-4 px-6 py-5 text-base font-bold text-center text-white whitespace-nowrap bg-blue-900 rounded max-md:px-5"
                            >
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2de7bfdad362ef3517580c465b74fb9c3dae07939b24335f560997cc5d1a0303?"
                                    className="shrink-0 w-4 aspect-[0.94]"
                                    alt="Search Icon"
                                />
                                <div className="my-auto">Поиск</div>
                            </button>
                        </div>
                        
                        <h2 className="mt-6 text-base leading-9 text-slate-900">
                            Настройки фильтра
                        </h2>
                        
                        <div className="flex flex-col items-center px-5">
                            <div className="flex gap-5 justify-between mt-6 max-w-full w-[548px] max-md:flex-wrap">
                                <input
                                    type="range"
                                    min="0"
                                    max="500000"
                                    step="100"
                                    value={priceFrom}
                                    onChange={(e) => setPriceFrom(e.target.value)}
                                    className="w-full"
                                    style={{
                                        background: `linear-gradient(to right, blue 0%, blue ${(priceFrom / 500000) * 100}%, #ccc ${(priceFrom / 500000) * 100}%, #ccc 100%)`
                                    }}
                                />
                            </div>
                            <div className="flex gap-5 justify-between mt-5 max-w-full text-lg leading-9 text-slate-900 w-[546px] max-md:flex-wrap">
                                <div>{priceFrom.length > 1 ? priceFrom : 0} $</div>
                                <div>500 000 $</div>
                            </div>
                            <div className="flex gap-5 justify-between mt-5 max-w-full text-lg leading-9 text-slate-900 w-[846px] max-md:flex-wrap">
                                <select value={typeObject} onChange={(e) => setTypeObject(e.target.value)} style={{ width: "362px", height: "48px" }}>
                                    <option value="">Select category</option>
                                    {typeObjectsList.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <select value={locality} onChange={(e) => setLocality(e.target.value)} style={{ width: "362px", height: "48px" }}>
                                    <option value="">Select location</option>
                                    {typeLocalitiesList.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <select on value={typeSale} onChange={(e) => setTypeSale(e.target.value)} style={{ width: "362px", height: "48px" }}>
                                    <option value="">Select</option>
                                    {typeSalesList.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="mt-5 px-6 py-3 text-base font-bold text-center text-white bg-blue-900 rounded max-md:px-5"
                            >
                                Применить
                            </button>
                            {typeof Cookies.get('jwt') !== "undefined" && (
                                <Link to="/entities/create"
                                    className="mt-5 px-6 py-3 text-base font-bold text-center text-white bg-green-900 rounded max-md:px-5"
                                    >
                                        Создать объект
                                    </Link>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
        );
    }
    
    export default Filter;
    
