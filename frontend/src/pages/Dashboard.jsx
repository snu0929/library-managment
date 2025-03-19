import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaSearch, FaPlus, FaFilter, FaTimes, FaBook, FaStar } from "react-icons/fa";

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("title");
    const [sortDirection, setSortDirection] = useState("asc");
    const [userRole, setUserRole] = useState(null);



    const navigate = useNavigate();
    useEffect(() => {
        const storedRole = localStorage.getItem("role"); // Assuming role is stored directly
        if (storedRole) {
            setUserRole(storedRole);
        }
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get("http://localhost:5000/api/book", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setBooks(res.data.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const clearFilters = () => {
        setSearchTerm("");
        setGenre("");
        setAuthor("");
        setYear("");
    };

    const genres = [...new Set(books.map((book) => book.genre))].filter(Boolean).sort();
    const authors = [...new Set(books.map((book) => book.author.trim()))].filter(Boolean).sort();
    const years = [...new Set(books.map((book) => book.year))].filter(Boolean).sort((a, b) => b - a);

    const handleDeleteBook = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://library-managment-h5u0.onrender.com/api/book/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
            alert("Book deleted successfully");
        } catch (error) {
            console.error("Failed to delete the book:", error);
            alert(error.response?.data?.msg || "Failed to delete the book");
        }
    };


    const filteredBooks = books
        .filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((book) => (genre ? book.genre === genre : true))
        .filter((book) =>
            author ? book.author.toLowerCase() === author.toLowerCase() : true
        )
        .filter((book) => (year ? book.year === year : true))
        .sort((a, b) => {
            let comparison = 0;

            if (sortBy === "title") {
                comparison = a.title.localeCompare(b.title);
            } else if (sortBy === "author") {
                comparison = a.author.localeCompare(b.author);
            } else if (sortBy === "year") {
                comparison = Number(a.year) - Number(b.year);
            }

            return sortDirection === "asc" ? comparison : -comparison;
        });

    const handleBookClick = (id) => {
        navigate(`/book/${id}`);
    };

    const handleAddNewBook = () => {
        navigate("/add-book");
    };

    return (
        <Container>
            <Overlay />
            <Content>
                <Header>
                    <TitleSection>
                        <Title><FaBook /> Library Dashboard</Title>
                        <BookCount>{filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} in collection</BookCount>
                    </TitleSection>

                    <HeaderControls>
                        <SearchContainer>
                            <FaSearch />
                            <SearchInput
                                type="text"
                                placeholder="Search books..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <ClearButton onClick={() => setSearchTerm("")}>
                                    <FaTimes />
                                </ClearButton>
                            )}
                        </SearchContainer>

                        <FilterButton
                            onClick={() => setShowFilters(!showFilters)}
                            active={showFilters || genre || author || year}
                        >
                            <FaFilter /> Filters
                            {(genre || author || year) && (
                                <FilterBadge>
                                    {(genre ? 1 : 0) + (author ? 1 : 0) + (year ? 1 : 0)}
                                </FilterBadge>
                            )}
                        </FilterButton>

                        {userRole === "admin" && (
                            <AddButton onClick={handleAddNewBook}>
                                <FaPlus /> Add Book
                            </AddButton>
                        )}

                    </HeaderControls>
                </Header>

                {showFilters && (
                    <FiltersCard>
                        <FilterGroup>
                            <FilterLabel>Genre</FilterLabel>
                            <Dropdown value={genre} onChange={(e) => setGenre(e.target.value)}>
                                <option value="">All Genres</option>
                                {genres.map((g) => (
                                    <option key={g} value={g}>
                                        {g}
                                    </option>
                                ))}
                            </Dropdown>
                        </FilterGroup>

                        <FilterGroup>
                            <FilterLabel>Author</FilterLabel>
                            <Dropdown value={author} onChange={(e) => setAuthor(e.target.value)}>
                                <option value="">All Authors</option>
                                {authors.map((a) => (
                                    <option key={a} value={a}>
                                        {a}
                                    </option>
                                ))}
                            </Dropdown>
                        </FilterGroup>

                        <FilterGroup>
                            <FilterLabel>Year</FilterLabel>
                            <Dropdown value={year} onChange={(e) => setYear(e.target.value)}>
                                <option value="">All Years</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </Dropdown>
                        </FilterGroup>

                        <FilterGroup>
                            <FilterLabel>Sort By</FilterLabel>
                            <SortControls>
                                <Dropdown
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={{ flex: 2 }}
                                >
                                    <option value="title">Title</option>
                                    <option value="author">Author</option>
                                    <option value="year">Year</option>
                                </Dropdown>
                                <SortButton
                                    onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                                    style={{ flex: 1 }}
                                >
                                    {sortDirection === "asc" ? "↑" : "↓"}
                                </SortButton>
                            </SortControls>
                        </FilterGroup>

                        <ClearFiltersButton onClick={clearFilters}>
                            Clear All
                        </ClearFiltersButton>
                    </FiltersCard>
                )}

                {loading ? (
                    <LoadingState>
                        <BookList>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <SkeletonCard key={index}>
                                    <Skeleton height={200} />
                                    <Skeleton count={2} style={{ marginTop: '10px' }} />
                                </SkeletonCard>
                            ))}
                        </BookList>
                    </LoadingState>
                ) : filteredBooks.length === 0 ? (
                    <NoResults>
                        <EmptyIcon />
                        <EmptyText>No books found</EmptyText>
                        <EmptyDescription>
                            Try adjusting your search or filters to find what you're looking for
                        </EmptyDescription>
                        <ResetButton onClick={clearFilters}>Reset Filters</ResetButton>
                    </NoResults>
                ) : (
                    <BookList>
                        {filteredBooks.map((book) => (
                            <BookCard key={book._id} onClick={() => handleBookClick(book._id)}>
                                <ImageWrapper>
                                    {book.coverImage ? (
                                        <CoverImage src={`http://localhost:5000/${book.coverImage}`} alt={book.title} />
                                    ) : (
                                        <DefaultCover>
                                            <FaBook size={40} />
                                            <DefaultCoverTitle>{book.title}</DefaultCoverTitle>
                                        </DefaultCover>
                                    )}
                                    <YearBadge>{book.year}</YearBadge>
                                </ImageWrapper>
                                <BookContent>
                                    <BookTitle>{book.title}</BookTitle>
                                    <BookDetails>
                                        <Author>{book.author}</Author>
                                        <Genre>{book.genre}</Genre>
                                    </BookDetails>
                                    {userRole === "admin" && (
                                        <DeleteButton onClick={() => handleDeleteBook(book._id)}>Delete</DeleteButton>
                                    )}

                                </BookContent>
                            </BookCard>
                        ))}
                    </BookList>
                )}
            </Content>
        </Container>
    );
};

export default Dashboard;

// ======================= STYLES =========================
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
    min-height: 100vh;
    position: relative;
    background-image: url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
`;

const Content = styled.div`
    position: relative;
    z-index: 2;
    padding: 2rem;
    animation: ${fadeIn} 0.5s ease;
`;

const Header = styled.div`
    margin-bottom: 1.5rem;
    background-color: rgba(255, 255, 255, 0.95);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const BookCount = styled.div`
    color: #666;
    font-size: 0.9rem;
    margin-top: 0.5rem;
`;

const HeaderControls = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    
    @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
    }
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 50px;
    background-color: #ffffff;
    width: 250px;
    transition: all 0.2s ease;
    position: relative;

    &:focus-within {
        border-color: #4a90e2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
        width: 300px;
    }
    
    @media (max-width: 768px) {
        flex: 1;
    }
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    width: 100%;
    font-size: 0.9rem;
    color: #333;
    background: transparent;
`;

const ClearButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #aaa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    
    &:hover {
        color: #666;
    }
`;

const FilterButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border: 1px solid ${props => props.active ? '#4a90e2' : '#e0e0e0'};
    border-radius: 50px;
    background-color: ${props => props.active ? 'rgba(74, 144, 226, 0.1)' : '#ffffff'};
    color: ${props => props.active ? '#4a90e2' : '#555'};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    
    &:hover {
        border-color: #4a90e2;
        color: #4a90e2;
    }
`;

const FilterBadge = styled.span`
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #4a90e2;
    color: white;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: bold;
`;

const AddButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 50px;
    background-color: #4a90e2;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: #357abd;
        transform: translateY(-2px);
    }
`;

const FiltersCard = styled.div`
    background-color: rgba(255, 255, 255, 0.95);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    margin-bottom: 1.5rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    animation: ${fadeIn} 0.3s ease;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const FilterGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    min-width: 150px;
`;

const FilterLabel = styled.label`
    font-size: 0.8rem;
    font-weight: 600;
    color: #666;
`;

const Dropdown = styled.select`
    padding: 0.6rem;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    background-color: #ffffff;
    color: #333;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;

    &:hover, &:focus {
        border-color: #4a90e2;
    }
`;

const SortControls = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const SortButton = styled.button`
    padding: 0.6rem;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    background-color: #ffffff;
    color: #333;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        border-color: #4a90e2;
        color: #4a90e2;
    }
`;

const ClearFiltersButton = styled.button`
    padding: 0.6rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    background-color: #f8f9fa;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
    align-self: flex-end;
    
    &:hover {
        background-color: #e9ecef;
    }
    
    @media (max-width: 768px) {
        align-self: stretch;
    }
`;

const LoadingState = styled.div`
    animation: ${fadeIn} 0.5s ease;
`;

const BookList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
`;

const BookCard = styled.div`
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;
    animation: ${fadeIn} 0.5s ease;

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    }
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 220px;
    position: relative;
    background-color: #f0f0f0;
    overflow: hidden;
`;

const CoverImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    
    ${BookCard}:hover & {
        transform: scale(1.05);
    }
`;

const DefaultCover = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #e9ecef;
    color: #4a90e2;
    padding: 1rem;
    text-align: center;
`;

const DefaultCoverTitle = styled.div`
    margin-top: 1rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: #333;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const YearBadge = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
    font-weight: 500;
    border-bottom-left-radius: 8px;
`;

const SkeletonCard = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    height: 320px;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const BookContent = styled.div`
    padding: 1.2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const BookTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #2c3e50;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const BookDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: #666;
    margin-top: auto;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const Author = styled.span`
    font-weight: 500;
    color: #4a90e2;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Genre = styled.span`
    background-color: #f0f7ff;
    color: #4a90e2;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    white-space: nowrap;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const NoResults = styled.div`
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 2rem;
    animation: ${fadeIn} 0.5s ease;
`;

const EmptyIcon = styled(FaBook)`
    font-size: 3.5rem;
    color: #ccc;
    margin-bottom: 1.5rem;
`;

const EmptyText = styled.h3`
    font-size: 1.5rem;
    color: #444;
    margin-bottom: 0.5rem;
`;

const EmptyDescription = styled.p`
    color: #777;
    margin-bottom: 1.5rem;
    max-width: 400px;
`;

const ResetButton = styled.button`
    padding: 0.7rem 1.5rem;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: #357abd;
    }
`;

const DeleteButton = styled.button`
  margin-top: 10px;
  padding: 0.5rem 1rem;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff7875;
  }
`;
