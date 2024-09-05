import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Pagination from "../page/pagination";

function MainTeam() {
    const [employees, setData] = useState([]);
    const [countItems, getCountItems] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0); // Общее количество страниц

    const navigate = useNavigate();
    const location = useLocation();

    const fetchData = async () => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.delete('Page.Page');
        queryParams.delete('Page.PageSize');
        queryParams.append('Page.Page', page.toString());
        queryParams.append('Page.PageSize', pageSize.toString());
        navigate({ search: queryParams.toString() });
        const queryString = queryParams.toString();
        const url = queryString ? `?${queryString}` : '';

        await axios.get(`https://localhost:44329/api/v1.2/Teams${url}`)
            .then(response => {
                setData(response.data.items);
                getCountItems(response.data.page.count);
                setPageSize(response.data.page.pageSize);
                setTotalPages(Math.ceil(response.data.page.count / pageSize)); // Устанавливаем общее количество страниц
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, [location.search]);

    const deleteElement = async (uuid) => {
        try {
            const token = Cookies.get('jwt');
            const response = await axios.delete(`https://localhost:44329/api/v1.2/Team/${uuid}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 204) {
                alert("Элемент удалён");
                fetchData();
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchData(); // Запрашиваем данные для новой страницы
    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center self-stretch px-16 py-12 mt-12 w-full rounded bg-slate-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex flex-col items-center w-full max-w-[1120px] max-md:max-w-full">
                    {typeof Cookies.get('jwt') !== "undefined" && (
                        <Link to="/employee/create"
                            className="mt-5 px-6 py-3 text-base font-bold text-center text-white bg-green-900 rounded max-md:px-5"
                        >
                            Создать работника
                        </Link>
                        )}
                </div>
            </div>
            <div id="team" className="flex flex-wrap justify-between">
                {employees.map(employee => (
                    <div className="flex w-[33%] max-md:ml-0 max-md:w-full card" key={employee.id}>
                        {typeof Cookies.get('jwt') !== "undefined" && (
                            <div>
                                <button
                                    className="card-button bg-red-900 rounded text-white absolute p-1"
                                    onClick={() => {
                                        if (window.confirm("Вы хотите удалить работника?"))
                                            deleteElement(employee.id)
                                    }}
                                >
                                    X
                                </button>
                                <Link to={"/employee/edit?uuid=" + employee.id} className="card-button bg-yellow-900 rounded text-white absolute p-1 ml-6">...</Link>
                            </div>
                        )}
                        <div className="flex flex-col grow items-center px-20 py-12 w-full text-center bg-white rounded border border-solid border-slate-100 text-slate-900 max-md:px-5 max-md:mt-3">
                            <img
                                loading="lazy"
                                srcSet={"https://localhost:44329" + employee.fullPathFile}
                                className="rounded-full aspect-square w-[200px]"
                            />
                            <div className="mt-6 text-xl font-bold leading-7">{employee.fullName}</div>
                            <div className="mt-3 text-lg">{employee.jobTitle}</div>
                            <div className="mt-1 text-lg">{employee.numberPhone}</div>
                            <div className="mt-1 text-lg">{employee.email}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full flex justify-center">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </div>
            <Footer />
        </>
    );
}

export default MainTeam;