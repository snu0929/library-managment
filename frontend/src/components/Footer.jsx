import styled from "styled-components";

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterSection>
                    <FooterHeading>LibraryHub</FooterHeading>
                    <FooterText>
                        Your gateway to a world of knowledge. Explore, learn, and grow with our vast collection of books.
                    </FooterText>
                </FooterSection>

                <FooterSection>
                    <FooterHeading>Quick Links</FooterHeading>
                    <FooterLink href="/">Home</FooterLink>
                    <FooterLink href="/dashboard">Dashboard</FooterLink>
                    <FooterLink href="/login">Login</FooterLink>
                    <FooterLink href="/register">Register</FooterLink>
                </FooterSection>

                <FooterSection>
                    <FooterHeading>Contact Us</FooterHeading>
                    <FooterText>Email: support@libraryhub.com</FooterText>
                    <FooterText>Phone: +1 (123) 456-7890</FooterText>
                </FooterSection>
            </FooterContent>

            <FooterBottom>
                &copy; {new Date().getFullYear()} LibraryHub. All rights reserved.
            </FooterBottom>
        </FooterContainer>
    );
};

export default Footer;

// ==================== STYLES ====================
const FooterContainer = styled.footer`
    background-color: #2c3e50;
    color: #ffffff;
  
    margin-top: auto; /* Ensures footer sticks to the bottom */
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: space-between;
    padding: 1rem 0;
`;

const FooterSection = styled.div`
    flex: 1;
    min-width: 200px;
    margin-bottom: 1rem;
`;

const FooterHeading = styled.h3`
    font-size: 1.6rem;
    margin-bottom: 1rem;
    color: #4a90e2;
`;

const FooterText = styled.p`
    font-size: 1em;
    color: #ecf0f1;
    line-height: 1.5;
    margin: 0.5rem 0;
`;

const FooterLink = styled.a`
    display: block;
    font-size: 0.9rem;
    color: #ecf0f1;
    text-decoration: none;
    margin: 0.5rem 0;
    transition: color 0.2s ease;

    &:hover {
        color: #4a90e2;
    }
`;

const FooterBottom = styled.div`
    text-align: center;
    padding: 1rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #bdc3c7;
`;