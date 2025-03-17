import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const AddBook = () => {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        genre: "",
        year: "",
        description: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (bookData.year <= 0) {
            alert("Year must be greater than 0");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                'https://library-managment-h5u0.onrender.com/api/book/add',
                bookData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(res.data);
            alert('Book added successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Failed to add book');
        }
    };

    return (
        <Container>

            <Form onSubmit={handleSubmit}>
                <Title>Add New Book</Title>
                <Input
                    name="title"
                    placeholder="Title"
                    value={bookData.title}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="author"
                    placeholder="Author"
                    value={bookData.author}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="genre"
                    placeholder="Genre"
                    value={bookData.genre}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="year"
                    type="number"
                    placeholder="Year"
                    value={bookData.year}
                    onChange={handleChange}
                    required
                />
                <TextArea
                    name="description"
                    placeholder="Description"
                    value={bookData.description}
                    onChange={handleChange}
                    required
                />
                <SubmitButton type="submit">Add Book</SubmitButton>
            </Form>
        </Container>
    );
};



// ====================== STYLES ======================
const Container = styled.div`
    padding: 20px;
    background-color: #f4f4f9;
    color: #333;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h2`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #222;
`;

const Form = styled.form`
    background-color: #ffffff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 400px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
        border-color: #4a90e2;
    }
`;

const TextArea = styled.textarea`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    height: 100px;
    resize: none;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
        border-color: #4a90e2;
    }
`;

const SubmitButton = styled.button`
    padding: 12px;
    background-color: #4a90e2;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #357abd;
    }
`;
