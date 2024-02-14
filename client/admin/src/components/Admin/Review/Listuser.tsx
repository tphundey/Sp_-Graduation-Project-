import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin } from 'antd';

const ListReviews = () => {
    const [reviewData, setReviewData] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product Id',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    useEffect(() => {
        axios.get('http://localhost:3000/Review')
            .then((response) => {
                setReviewData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching review data:', error);
            })
            .finally(() => setLoading(false));
    }, []);

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
            <Table columns={columns} dataSource={reviewData} />
        </div>
    );
};

export default ListReviews;
