import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://library-managment-h5u0.onrender.com/api/auth/login", {
                email,
                password,
            });
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);

            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.msg || "Login failed");
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Login</Title>
                <Form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        placeholder="Email"
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
                    <Button type="submit">Login</Button>
                </Form>
                <Text>
                    Don't have an account? <Link onClick={() => navigate("/register")}>Register here</Link>
                </Text>
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
    height: 100vh;
    background-color: #f4f4f9;
`;

const FormWrapper = styled.div`
    background-color: #ffffff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    color: #4a90e2;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    transition: border 0.2s ease;

    &:focus {
        border-color: #4a90e2;
    }
`;

const Button = styled.button`
    background-color: #4a90e2;
    color: #ffffff;
    padding: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;

    &:hover {
        background-color: #357abd;
    }
`;

const Text = styled.p`
    margin-top: 12px;
    text-align: center;
    color: #333;
`;

const Link = styled.span`
    color: #4a90e2;
    cursor: pointer;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;
