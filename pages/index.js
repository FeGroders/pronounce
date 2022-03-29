import Link from 'next/link';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

const Title = styled.h2`
  font-size: 50px;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  align-self: center;
`

const Subtitle = styled.p`
  font-size: 25px;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin: 0;
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

export default function Home() {
  return (
    <>
      <Layout>
        <Title>Next.js</Title>
        <Subtitle>Boilerplate</Subtitle>
        <Link href={"other"}><Button>Change page</Button></Link>
      </Layout>
    </>
  )
}