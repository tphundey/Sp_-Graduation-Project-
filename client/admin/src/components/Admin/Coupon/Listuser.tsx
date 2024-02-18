import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Popconfirm, Spin, message } from 'antd';

const DiscountCodes = () => {
    const [discountCodes, setDiscountCodes] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            title: 'Mã giảm giá',
            dataIndex: 'ma_giam_gia',
            key: 'ma_giam_gia',
        },
        {
            title: 'Giá trị giảm',
            dataIndex: 'gia_tri_giam',
            key: 'gia_tri_giam',
            render: (text) => `$${text}`,
        },
        {
            title: 'Hiệu lực',
            dataIndex: 'hieu_luc',
            key: 'hieu_luc',
            render: (hieu_luc) => (hieu_luc ? 'Có' : 'Không'),
        },
        {
            title: 'Số lượng',
            dataIndex: 'so_luong',
            key: 'so_luong',
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'ngay_het_han',
            key: 'ngay_het_han',
        },
        {
            title: 'Thao tác',
            dataIndex: 'id',
            key: 'action',
            render: (text, record) => (
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa mã giảm giá này?"
                    onConfirm={() => handleDeleteDiscountCode(record.id)}
                >
                    <Button type="danger">Xóa</Button>
                </Popconfirm>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/attribute')
            .then((response) => {
                setDiscountCodes(response.data);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu mã giảm giá:', error);
                message.error('Lỗi khi lấy dữ liệu mã giảm giá');
            })
            .finally(() => setLoading(false));
    }, []);

    const handleDeleteDiscountCode = (discountCodeId) => {
        const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa mã giảm giá này?');
        if (shouldDelete) {
            setLoading(true);
            axios.delete(`http://localhost:3000/attribute/${discountCodeId}`)
                .then(() => {
                    setDiscountCodes((prevDiscountCodes) => prevDiscountCodes.filter((discountCode) => discountCode.id !== discountCodeId));
                    message.success('Xóa mã giảm giá thành công');
                })
                .catch((error) => {
                    console.error('Lỗi khi xóa mã giảm giá:', error);
                    message.error('Lỗi khi xóa mã giảm giá');
                })
                .finally(() => setLoading(false));
        }
    };

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                }}
            />
        );
    }
    return (
        <div>
            <div>
                <Table columns={columns} dataSource={discountCodes} />
            </div>
        </div>
    );
};

export default DiscountCodes;
