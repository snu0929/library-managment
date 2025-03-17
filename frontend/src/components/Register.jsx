import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Register = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", userData);
            console.log(res.data);
            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.msg || "Registration failed");
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Register</Title>
                <Form onSubmit={handleRegister}>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                    <Select
                        name="role"
                        value={userData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </Select>
                    <Button type="submit">Register</Button>
                </Form>
                <Text>
                    Already have an account?{" "}
                    <Link onClick={() => navigate("/login")}>Login here</Link>
                </Text>
            </FormWrapper>
        </Container>
    );
};

export default Register;

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

const Select = styled.select`
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
