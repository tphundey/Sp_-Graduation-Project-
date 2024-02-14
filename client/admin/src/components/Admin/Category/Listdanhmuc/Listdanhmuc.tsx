import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm, Spin } from 'antd';

const Listdanhmuc = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Category');
        setCategories(response.data);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/Category/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Có lỗi xảy ra khi xóa danh mục: ', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Số thứ tự',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Hãng giày',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chức năng',
      key: 'action',
      render: (text, record) => (
        <div className='chucnang2'>
          <Link to={`/admin/category/updateCate/${record.id}`} className='sua'>Sửa</Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa danh mục này?"
            onConfirm={() => handleDeleteCategory(record.id)}
          >
            <Button type="danger">Xóa</Button>
          </Popconfirm>
        </div>
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

  // Tạo dataSource với số thứ tự
  const dataSource = categories.map((category, index) => ({
    ...category,
    key: category.id,
    index: index + 1, // Số thứ tự bắt đầu từ 1
  }));

  return (
    <div>
       <Link className='btn-neutral p-2' style={{ borderRadius: 4 }} to="/admin/category/addCate">Thêm hãng giày mới!</Link>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
      />
    </div>
  );
};

export default Listdanhmuc;
