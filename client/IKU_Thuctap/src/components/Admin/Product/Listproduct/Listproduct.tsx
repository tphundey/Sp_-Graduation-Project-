import './Listproduct.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Table } from 'antd';
import { Spin } from 'antd';
import axios from 'axios'; // Import thư viện axios để gửi HTTP request

const Listproduct = () => {
    const [products, setProducts] = useState([]); // Khởi tạo state để lưu danh sách sản phẩm
    const [loading, setLoading] = useState(true); // Thêm state để kiểm soát trạng thái loading

    useEffect(() => {
        // Khi bắt đầu fetch dữ liệu
        setLoading(true);

        // Gửi HTTP GET request để lấy danh sách sản phẩm từ API
        axios.get('http://localhost:3000/product')
            .then(response => {
                // Khi nhận được dữ liệu từ API, lưu vào state và tắt trạng thái loading
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []); // [] đảm bảo useEffect chỉ chạy một lần sau khi component mount

    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => `SP00${text}`,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img width={120} src={text} alt="" />,
        },
        {
            title: 'Tên sách',
            dataIndex: 'name',
            key: 'name',
            width: 220
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        // Các cột khác tương tự...
    ];

    // Tính toán phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const currentItems = products.slice(startIndex, endIndex);

    // Xử lý sự kiện chuyển trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Link className='themspmoi' to="/admin/addsanpham">Thêm sách mới!</Link>

            {loading ? (
                <Spin
                    size="large"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100vh",
                    }}
                />
            ) : (
                <>
                    <Table columns={columns} dataSource={currentItems} />
                    <Pagination
                        current={currentPage}
                        onChange={handlePageChange}
                        total={totalItems}
                        pageSize={itemsPerPage}
                    />
                </>
            )}
        </div>
    );
};

export default Listproduct;
