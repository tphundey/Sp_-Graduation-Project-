import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Popconfirm, Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const Listuser = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/user')
            .then((response) => {
                const formattedData = response.data.map((user, index) => ({
                    stt: index + 1, // Số thứ tự
                    firstname: user.firstname,
                    email: user.email,
                    password: user.password, // Mật khẩu đã được mã hóa
                    id: user.id, // Id vẫn được lưu lại để xử lý xóa
                }));
                setUserData(formattedData);
            })
            .catch((error) => {
                console.error('Lỗi khi lấy dữ liệu người dùng:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleDeleteUser = (userId:any) => {
        setLoading(true);
        axios.delete(`http://localhost:3000/user/${userId}`)
            .then(() => {
                setUserData((prevUserData) => prevUserData.filter((user) => user.id !== userId));
            })
            .catch((error) => {
                console.error('Lỗi khi xóa người dùng:', error);
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'password',
            key: 'password',
            render: (password) => `***********`, // Hiển thị mật khẩu đã được mã hóa
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
