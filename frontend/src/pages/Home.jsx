import { Link } from "react-router-dom";
import styled from "styled-components";

export const Home = () => {
    return (
        <Container>
            <Title>Welcome to the Book Library 📚</Title>
            <ButtonContainer>
                <StyledLink to="/login">Login</StyledLink>
                <StyledLink to="/register">Register</StyledLink>
                <StyledLink to="/dashboard">Dashboard</StyledLink>
            </ButtonContainer>
        </Container>
    );
};

export default Home;

// ======================= STYLES =======================
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background-color: #f4f4f9;
`;

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 20px;
    color: #333;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 12px;
`;

const StyledLink = styled(Link)`
    padding: 12px 24px;
    background-color: #4a90e2;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    font-size: 16px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #357abd;
    }
`;
