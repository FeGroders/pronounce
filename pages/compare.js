import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from "next/router";
import Diff from 'diff';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

const Logo = styled.h1`
  font-size: 3rem;
  color: #fff;
  text-shadow: 2px 2px #000;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`

const QuoteText = styled.h2`
  font-size: 30px;
  width: 75%;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  align-self: center;
`

const Text = styled.p`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.grey};
  align-items: center;
  justify-content: center;
  margin: 0;
  margin-top: 2rem;
`

const Button = styled.button`
  font-size: 15px;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
  }
`

const StyledLink = styled(Link)`
    text-decoration: none;

    &amp;:focus, &amp;:hover, &amp;:visited, &amp;:link, &amp;:active {
        text-decoration: none;
    }
`;

const DiffChar = styled.span`
  color: red;
`

export default function Home() {
    const router = useRouter();
    const query = router.query;
    const quoteOriginal = query.original;
    const quoteUser = query.transcribed;
    
    return (
      <>
        <Layout>
          <Logo>Pronounce</Logo>
          <Text>The original quote:</Text>
          <QuoteText>{quoteOriginal}</QuoteText>
          <Text>What we understood:</Text>
          <QuoteText>{quoteUser}</QuoteText>
          <Button id="retry"><StyledLink href="/">Retry</StyledLink></Button>
        </Layout>
      </>    
    )
}