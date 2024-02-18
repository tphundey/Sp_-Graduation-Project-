import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateDiscountCode = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        axios.post('http://localhost:3000/attribute', values)
            .then(() => {
                message.success('Tạo mã giảm giá thành công');
                form.resetFields();
            })
            .catch((error) => {
                console.error('Lỗi khi tạo mã giảm giá:', error);
                message.error('Lỗi khi tạo mã giảm giá');
            });
    };

    return (
        <div>
            
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{ hieu_luc: true }} // Set initial value for hieu_luc to true
                style={{ maxWidth: 600, margin: 'auto', marginTop: 50 }}
            >
                <Form.Item
                    label="Mã giảm giá"
                    name="ma_giam_gia"
                    rules={[{ required: true, message: 'Vui lòng nhập mã giảm giá!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá trị giảm"
                    name="gia_tri_giam"
                    rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm!' }]}
                >
                    <Input type="number" min={0} />
                </Form.Item>

                <Form.Item
                    label="Hiệu lực"
                    name="hieu_luc"
                    valuePropName="checked"
                >
                    <Input type="checkbox" />
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="so_luong"
                    rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                >
                    <Input type="number" min={0} />
                </Form.Item>

                <Form.Item
                    label="Ngày hết hạn"
                    name="ngay_het_han"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày hết hạn!' }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Tạo mã giảm giá
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateDiscountCode;
