import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        try {
            const res = await axios.post("https://library-managment-h5u0.onrender.com/api/auth/register", userData);
            toast.success("Registration successful!");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Registration failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container>
            <Overlay />
            <FormWrapper>
                <Title>Create Your Account</Title>
                <Subtitle>Join us to explore a world of books!</Subtitle>
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
                    <Button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </Button>

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
    min-height: 70vh;
    background-image: url("https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80");
    background-size: cover;
    background-position: center;
    padding: 20px;
    position: relative;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1); /* Semi-transparent overlay */
`;

const FormWrapper = styled.div`
    background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
    position: relative;
    z-index: 1;
`;

const Title = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    text-align: center;
`;

const Subtitle = styled.p`
    font-size: 1rem;
    color: #666;
    margin-bottom: 1.5rem;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        border-color: #4a90e2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    }
`;

const Select = styled.select`
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        border-color: #4a90e2;
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
    }
`;

const Button = styled.button`
    padding: 0.75rem;
    background-color: #4a90e2;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #357abd;
    }
`;

const Text = styled.p`
    margin-top: 1rem;
    text-align: center;
    color: #555;
`;

const Link = styled.span`
    color: #4a90e2;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }
`;