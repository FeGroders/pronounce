import styled from 'styled-components';
const Recorder = require('../scripts/recorder');
const Quote = require('inspirational-quotes');
import Link from 'next/link';

var quote = '';
var data = {
  original: '',
  transcribed: '',
};

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
  width: 50%;
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

const ButtonRecord = styled.button`
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

const recordAudio = () => {
(async () => {
  const recorder = await Recorder.recordAudio();
  recorder.start();

  setTimeout(async () => {
    const audio = await recorder.stop();

    console.log('audio uploaded', audio.isUploaded);
    console.log('audio transcription', audio.transcription);

    data = {
      original: quote,
      transcribed: audio.transcription,
    };

    console.log('data', data);
  }, 5000);
})();
}

function getQuote() {
  quote = Quote.getRandomQuote();
  return quote;
}

export default function Home() {
  return (
    <>
      <Layout>
        <Logo>Pronounce</Logo>
        <Text>Please, say: </Text>
        <QuoteText>{getQuote()}</QuoteText> 
        <ButtonRecord onClick={recordAudio} id="record">Record</ButtonRecord>
        <Button><Link href={{
            pathname: "/compare",
            query: data,
          }}>Confirm</Link></Button>
      </Layout>
    </>    
  )
}