import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get("https://library-managment-h5u0.onrender.com/api/book", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setBooks(res.data.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books
        .filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((book) => (genre ? book.genre === genre : true))
        .filter((book) =>
            author ? book.author.toLowerCase() === author.toLowerCase() : true
        );

    const genres = [...new Set(books.map((book) => book.genre))];
    const authors = [...new Set(books.map((book) => book.author.trim()))];

    const handleBookClick = (id) => {
        navigate(`/book/${id}`);
    };

    return (
        <Container>
            <Title>Dashboard</Title>

            {/* Search and Filter Section */}
            <Filters>
                <SearchInput
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Dropdown value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value="">All Genres</option>
                    {genres.map((g) => (
                        <option key={g} value={g}>
                            {g}
                        </option>
                    ))}
                </Dropdown>

                <Dropdown value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="">All Authors</option>
                    {authors.map((a) => (
                        <option key={a} value={a}>
                            {a}
                        </option>
                    ))}
                </Dropdown>
            </Filters>

            {/* Book List */}
            <BookList>
                {filteredBooks.map((book) => (
                    <BookCard key={book._id} onClick={() => handleBookClick(book._id)}>
                        <BookTitle>{book.title}</BookTitle>
                        <BookDetails>
                            <span>📖 {book.author}</span>
                            <span>🎯 {book.genre}</span>
                        </BookDetails>
                    </BookCard>
                ))}
            </BookList>
        </Container>
    );
};

export default Dashboard;

// ======================= STYLES =========================
const Container = styled.div`
    padding: 20px;
    background-color: #f4f4f4;
    color: #222;
    min-height: 100vh;
`;

const Title = styled.h2`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
`;

const Filters = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const SearchInput = styled.input`
    padding: 10px;
    width: 280px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #ffffff;
    color: #333;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
        border-color: #4a90e2;
    }
`;

const Dropdown = styled.select`
    padding: 10px;
    width: 180px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #ffffff;
    color: #333;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:hover {
        border-color: #4a90e2;
    }
`;

const BookList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
`;

const BookCard = styled.div`
    background-color: #ffffff;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #ddd;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
        transform: translateY(-3px);
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

const BookTitle = styled.h3`
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #333;
`;

const BookDetails = styled.div`
    font-size: 14px;
    color: #555;
    display: flex;
    justify-content: space-between;
`;
