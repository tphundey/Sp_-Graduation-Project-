import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Popconfirm, Spin } from 'antd';

const Listuser = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Thao tác',
            dataIndex: 'id',
            key: 'action',
            render: (text, record) => (
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa người dùng này?"
                    onConfirm={() => handleDeleteUser(record.id)}
                >
                    <Button type="danger">Xóa</Button>
                </Popconfirm>
            ),
        },
    ];

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/user')
            .then((response) => {
                const formattedData = response.data[0].users.map(user => ({
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                }));
                setUserData(formattedData);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleDeleteUser = (userId) => {
        const shouldDelete = window.confirm('Bạn có chắc chắn muốn xóa người dùng này?');
        if (shouldDelete) {
            setLoading(true);
            axios.delete(`http://localhost:3000/user/${userId}`)
                .then(() => {
                    setUserData((prevUserData) => prevUserData.filter((user) => user.id !== userId));
                })
                .catch((error) => {
                    console.error('Lỗi khi xóa người dùng:', error);
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
                <Table columns={columns} dataSource={userData} />
            </div>
        </div>
    );
};

export default Listuser;
