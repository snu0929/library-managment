import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddBook = () => {
    const [loading, setLoading] = useState(false);
    const initialFormState = {
        title: "",
        author: "",
        genre: "",
        year: "",
        description: ""
    };

    const [bookData, setBookData] = useState(initialFormState);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const clearForm = () => {
        setBookData(initialFormState);
        setImage(null);
        setImagePreview(null);

        // Reset file input by recreating it
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", bookData.title);
        formData.append("author", bookData.author);
        formData.append("genre", bookData.genre);
        formData.append("year", bookData.year);
        formData.append("description", bookData.description);
        if (image) formData.append("coverImage", image);

        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("https://library-managment-h5u0.onrender.com/api/book/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Book added successfully", res.data);
            toast.success("Book added successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            clearForm();
            // navigate("/dashboard");
        } catch (error) {
            console.error("Error adding book:", error);
            toast.error("Failed to add book. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Overlay />
            <FormCard onSubmit={handleSubmit}>
                <Title>Add New Book</Title>

                <TwoColumnLayout>
                    <LeftColumn>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input
                                name="title"
                                placeholder="Enter book title"
                                value={bookData.title}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Author</Label>
                            <Input
                                name="author"
                                placeholder="Enter author name"
                                value={bookData.author}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <TwoColumnGroup>
                            <FormGroup>
                                <Label>Genre</Label>
                                <Input
                                    name="genre"
                                    placeholder="Enter genre"
                                    value={bookData.genre}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Year</Label>
                                <Input
                                    name="year"
                                    type="number"
                                    placeholder="Publication year"
                                    value={bookData.year}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </TwoColumnGroup>

                        <FormGroup>
                            <Label>Description</Label>
                            <TextArea
                                name="description"
                                placeholder="Enter book description"
                                value={bookData.description}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </LeftColumn>

                    <RightColumn>
                        <FormGroup>
                            <Label>Book Cover</Label>
                            <FileInputWrapper>
                                <FileInput
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="coverImage"
                                />
                                <FileInputLabel htmlFor="coverImage">
                                    {image ? 'Change Image' : 'Upload Image'}
                                </FileInputLabel>
                            </FileInputWrapper>
                        </FormGroup>

                        <ImageContainer>
                            {imagePreview ? (
                                <ImagePreview src={imagePreview} alt="Book Cover Preview" />
                            ) : (
                                <PlaceholderImage>
                                    <PlaceholderText>Book Cover Preview</PlaceholderText>
                                </PlaceholderImage>
                            )}
                        </ImageContainer>
                    </RightColumn>
                </TwoColumnLayout>

                <ButtonGroup>
                    <ClearButton type="button" onClick={clearForm}>
                        Clear Form
                    </ClearButton>
                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? <Spinner /> : "Add Book"}
                    </SubmitButton>
                </ButtonGroup>
            </FormCard>
            <ToastContainer />
        </Container>
    );
};

// ====================== STYLES ======================
const Container = styled.div`
    padding: 20px;
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
    background-size: cover;
    background-position: center;
    position: relative;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const FormCard = styled.form`
    background-color: rgba(255, 255, 255, 0.95);
    padding: 2.5rem;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 900px;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        padding: 1.5rem;
        max-width: 90%;
    }
`;

const Title = styled.h2`
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-align: center;
    color: #1a365d;
`;

const TwoColumnLayout = styled.div`
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
    }
`;

const LeftColumn = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const RightColumn = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const TwoColumnGroup = styled.div`
    display: flex;
    gap: 1rem;

    & > div {
        flex: 1;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
    }
`;

const Label = styled.label`
    font-size: 1rem;
    font-weight: 600;
    color: #4a5568;
`;

const Input = styled.input`
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s ease;
    background-color: #f8fafc;

    &:focus {
        border-color: #4299e1;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
        background-color: #fff;
    }
`;

const TextArea = styled.textarea`
    padding: 0.75rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    min-height: 150px;
    resize: vertical;
    outline: none;
    transition: all 0.2s ease;
    background-color: #f8fafc;

    &:focus {
        border-color: #4299e1;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
        background-color: #fff;
    }
`;

const FileInputWrapper = styled.div`
    position: relative;
    margin-bottom: 1rem;
`;

const FileInput = styled.input`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 2;
`;

const FileInputLabel = styled.label`
    display: block;
    padding: 0.75rem 1rem;
    background-color: #4299e1;
    color: white;
    text-align: center;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #3182ce;
    }
`;

const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    min-height: 200px;
    background-color: #f8fafc;
    border: 1px dashed #cbd5e0;
`;

const ImagePreview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
`;

const PlaceholderImage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #edf2f7;
    min-height: 200px;
`;

const PlaceholderText = styled.span`
    color: #a0aec0;
    font-size: 1rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const SubmitButton = styled.button`
    flex: 1;
    padding: 0.875rem;
    background-color: #4299e1;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #3182ce;
    }

    &:disabled {
        background-color: #a0c4ff;
        cursor: not-allowed;
    }
`;

const ClearButton = styled.button`
    flex: 1;
    padding: 0.875rem;
    background-color: #e2e8f0;
    color: #4a5568;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #cbd5e0;
    }
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid #fff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: ${spin} 1s linear infinite;
    margin: 0 auto;
`;