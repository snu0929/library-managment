import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedBooks, setRelatedBooks] = useState([]);

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
                fetchRelatedBooks(res.data.data.genre);
            } catch (error) {
                console.error("Error fetching book details:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchRelatedBooks = async (genre) => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`https://library-managment-h5u0.onrender.com/api/book?genre=${genre}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRelatedBooks(res.data.data.filter((b) => b._id !== id));
            } catch (error) {
                console.error("Error fetching related books:", error);
            }
        };

        fetchBook();
    }, [id]);

    const handleBorrowBook = async () => {
        alert("This feature will be implemented soon")
    };

    if (loading) {
        return (
            <Container>
                <BackButtonSkeleton />
                <BookContainer>
                    <CoverImageSkeleton />
                    <Content>
                        <TitleSkeleton />
                        <AuthorSkeleton />
                        <Details>
                            <GenreSkeleton />
                            <YearSkeleton />
                        </Details>
                        <DescriptionSkeleton />
                        <DescriptionSkeleton />
                        <DescriptionSkeleton />
                    </Content>
                </BookContainer>
            </Container>
        );
    }

    return (
        <Container>
            <BackButton onClick={() => navigate("/dashboard")}>⬅ Back to Dashboard</BackButton>

            <BookContainer>
                <CoverImage src={`https://library-managment-h5u0.onrender.com/${book.coverImage}`} alt={book.title} />
                <Content>
                    <Title>{book.title}</Title>
                    <Author>by {book.author}</Author>
                    <Details>
                        <Genre>{book.genre}</Genre>
                        <Year>📅 Published: {book.year}</Year>
                    </Details>
                    <Description>{book.description}</Description>
                    <BorrowButton onClick={handleBorrowBook}>Borrow Book</BorrowButton>
                </Content>
            </BookContainer>

            {/* Related Books Section */}
            <RelatedBooksSection>
                <SectionTitle>Related Books</SectionTitle>
                <RelatedBooksList>
                    {relatedBooks.map((book) => (
                        <RelatedBookCard key={book._id} onClick={() => navigate(`/book/${book._id}`)}>
                            <RelatedBookImage src={`https://library-managment-h5u0.onrender.com/${book.coverImage}`} alt={book.title} />
                            <RelatedBookTitle>{book.title}</RelatedBookTitle>
                            <RelatedBookAuthor>by {book.author}</RelatedBookAuthor>
                        </RelatedBookCard>
                    ))}
                </RelatedBooksList>
            </RelatedBooksSection>
        </Container>
    );
};

export default BookDetails;

// ======================= STYLES =========================
const Container = styled.div`
    padding: 2rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8f9fa;
`;

const BackButton = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #4a90e2;
    color: #fff;
    border: none;
    border-radius: 8px;
    margin-bottom: 2rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        background-color: #357abd;
        transform: translateY(-2px);
    }
`;

const BookContainer = styled.div`
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 1200px;
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const CoverImage = styled.img`
    width: 300px;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
    }
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Title = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
`;

const Author = styled.p`
    font-size: 1.25rem;
    color: #4a90e2;
    margin-bottom: 1rem;
`;

const Details = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
`;

const Genre = styled.span`
    background-color: #e9ecef;
    color: #4a90e2;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
`;

const Year = styled.span`
    font-size: 1rem;
    color: #666;
`;

const Description = styled.p`
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    margin-top: 1rem;
`;

const BorrowButton = styled.button`
    padding: 0.75rem 1.5rem;
    background-color: #4a90e2;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.2s ease;
    margin-top: 1rem;

    &:hover {
        background-color: #357abd;
        transform: translateY(-2px);
    }
`;

const RelatedBooksSection = styled.div`
    width: 100%;
    max-width: 1200px;
    margin-top: 2rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 1rem;
`;

const RelatedBooksList = styled.div`
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
`;

const RelatedBookCard = styled.div`
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const RelatedBookImage = styled.img`
    width: 150px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
`;

const RelatedBookTitle = styled.h4`
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
    margin-top: 0.5rem;
`;

const RelatedBookAuthor = styled.p`
    font-size: 0.875rem;
    color: #666;
`;

// Skeleton Loading Styles
const skeletonLoading = keyframes`
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
`;

const SkeletonBase = styled.div`
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ${skeletonLoading} 1.5s infinite;
    border-radius: 4px;
`;

const BackButtonSkeleton = styled(SkeletonBase)`
    width: 150px;
    height: 40px;
    margin-bottom: 2rem;
`;

const CoverImageSkeleton = styled(SkeletonBase)`
    width: 300px;
    height: 400px;
    border-radius: 8px;

    @media (max-width: 768px) {
        width: 100%;
        height: 200px;
    }
`;

const TitleSkeleton = styled(SkeletonBase)`
    width: 80%;
    height: 32px;
    margin-bottom: 0.5rem;
`;

const AuthorSkeleton = styled(SkeletonBase)`
    width: 60%;
    height: 24px;
    margin-bottom: 1rem;
`;

const GenreSkeleton = styled(SkeletonBase)`
    width: 100px;
    height: 24px;
`;

const YearSkeleton = styled(SkeletonBase)`
    width: 80px;
    height: 24px;
`;

const DescriptionSkeleton = styled(SkeletonBase)`
    width: 100%;
    height: 16px;
    margin-top: 0.5rem;

    &:nth-child(2) {
        width: 90%;
    }

    &:nth-child(3) {
        width: 80%;
    }
`;