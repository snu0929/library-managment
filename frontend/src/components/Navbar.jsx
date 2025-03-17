import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <Nav>
            <Logo onClick={() => navigate("/")}>📚 Library</Logo>
            <NavLinks>
                {token && (
                    <>
                        <NavLink onClick={() => navigate("/dashboard")}>Dashboard</NavLink>
                        {role === "admin" && (
                            <NavLink onClick={() => navigate("/add-book")}>
                                ➕ Add Book
                            </NavLink>
                        )}
                        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
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
    background-color: #f4f4f9;
    padding: 12px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e0e0e0;
`;

const Logo = styled.h1`
    font-size: 24px;
    color: #4a90e2;
    cursor: pointer;
`;

const NavLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const NavLink = styled.span`
    cursor: pointer;
    font-size: 18px;
    padding: 8px 12px;
    color: #333;
    border-radius: 4px;
    transition: 0.3s;

    &:hover {
        background-color: #e6f0fa;
        color: #357abd;
    }
`;

const LogoutButton = styled.button`
    background-color: #4a90e2;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #357abd;
    }
`;

