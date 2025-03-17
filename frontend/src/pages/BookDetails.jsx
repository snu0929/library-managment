import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`https://library-managment-h5u0.onrender.com/api/book/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBook(res.data.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) return <Message>Loading...</Message>;

    return (
        <Container>
            <BackButton onClick={() => navigate("/dashboard")}>⬅ Back to Dashboard</BackButton>

            <BookContainer>
                <Title>{book.title}</Title>
                <Author>by {book.author}</Author>
                <Genre>{book.genre}</Genre>
                <Year>📅 Published: {book.year}</Year>
                <Description>{book.description}</Description>
            </BookContainer>
        </Container>
    );
};

export default BookDetails;

// ======================= STYLES =========================
const Container = styled.div`
    padding: 20px;
    background-color: #000;
    color: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BackButton = styled.button`
    padding: 8px 16px;
    background-color: #111;
    color: #fff;
    border: 1px solid #555;
    border-radius: 4px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: 0.3s;
    
    &:hover {
        background-color: #222;
        border-color: #888;
    }
`;

const BookContainer = styled.div`
    background-color: #111;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #333;
    width: 100%;
    max-width: 600px;
    box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const Author = styled.p`
    font-size: 18px;
    color: #ccc;
    margin-bottom: 8px;
`;

const Genre = styled.p`
    font-size: 16px;
    color: #888;
    margin-bottom: 8px;
`;

const Year = styled.p`
    font-size: 16px;
    color: #999;
    margin-bottom: 12px;
`;

const Description = styled.p`
    font-size: 16px;
    color: #ddd;
    line-height: 1.6;
`;

const Message = styled.p`
    font-size: 18px;
    color: #ccc;
`;

