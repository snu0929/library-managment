import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post("https://library-managment-h5u0.onrender.com/api/auth/login", {
                // https://library-managment-h5u0.onrender.com
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);
            localStorage.setItem("username", res.data.user.username);
            navigate("/dashboard");

        } catch (error) {
            setError(error.response?.data?.msg || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Welcome Back</Title>
                <Subtitle>Sign in to continue to your account</Subtitle>

                <Form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <Button disabled={loading}>
                        {loading ? "Logging in..." : "Sign In"}
                    </Button>
                </Form>

                <FooterText>
                    Don't have an account?{" "}
                    <Link onClick={() => navigate("/register")}>Sign up</Link>
                </FooterText>
            </FormWrapper>
        </Container>
    );
};

export default Login;

// ================== STYLES ==================
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    background-image: url("https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80");
    background-size: cover;
    background-position: center;
    padding: 20px;
`;

const FormWrapper = styled.div`
    background: rgba(255, 255, 255, 0.95);
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
`;

const Title = styled.h2`
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
`;

const Subtitle = styled.p`
    color: #666;
    margin-bottom: 2rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
        border-color: #4a90e2;
    }
`;

const Button = styled.button`
    background: #4a90e2;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: #357abd;
    }

    &:disabled {
        background: #a0c4ff;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    color: #e74c3c;
    background: #f8d7da;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
`;

const FooterText = styled.p`
    color: #666;
    margin-top: 1.5rem;
    font-size: 0.875rem;
`;

const Link = styled.span`
    color: #4a90e2;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }
`;