import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <Nav>
            <Logo onClick={() => navigate("/")}>LibraryHub</Logo>
            <NavLinks>
                {token && (
                    <>
                        <NavLink onClick={() => navigate("/dashboard")}>Dashboard</NavLink>
                        {role === "admin" && (
                            <NavLink onClick={() => navigate("/add-book")}>
                                Add Book
                            </NavLink>
                        )}
                        <UserInfo>
                            <UserName>Welcome, {username}</UserName> {/* Display username */}
                            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                        </UserInfo>
                    </>
                )}
                {!token && (
                    <>
                        <NavLink onClick={() => navigate("/login")}>Login</NavLink>
                        <NavLink onClick={() => navigate("/register")}>Register</NavLink>
                    </>
                )}
            </NavLinks>
        </Nav>
    );
};

export default Navbar;

// ==================== STYLES ====================
const Nav = styled.nav`
    background-color: #ffffff;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
`;

const Logo = styled.h1`
    font-size: 1.75rem;
    color: #2c3e50;
    cursor: pointer;
    font-weight: 700;
    margin: 0;
    transition: color 0.2s ease;

    &:hover {
        color: #4a90e2;
    }
`;

const NavLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

const NavLink = styled.span`
    cursor: pointer;
    font-size: 1rem;
    color: #555;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
        color: #4a90e2;
        background-color: #f0f4f8;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 50%;
        width: 0;
        height: 2px;
        background-color: #4a90e2;
        transition: all 0.2s ease;
        transform: translateX(-50%);
    }

    &:hover::after {
        width: 100%;
    }
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const UserName = styled.span`
    font-size: 1rem;
    color: #4a90e2;
    font-weight: 500;
`;

const LogoutButton = styled.button`
    background-color: #4a90e2;
    color: #fff;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
        background-color: #357abd;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
    }
`;