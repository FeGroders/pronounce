import { flushSync } from 'react-dom';
import styled from 'styled-components';
const Recorder = require('../scripts/recorder');
const Quote = require('inspirational-quotes');
import { transcribeAudio } from '../scripts/deepgram';
// import p5 from 'p5'
// const Deepgram = require('../scripts/deepgram');

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`

const Title = styled.h2`
  font-size: 30px;
  width: 50%;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  align-self: center;
`

const Subtitle = styled.p`
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
    if (audio.isUploaded === true) {
      await transcribeAudio().then((msg) => {
        console.log('retorno:', msg);
      });
    }
  }, 3000);
})();
}

export default function Home() {
  return (
    <>
      <Layout>
        <Subtitle>Please, say: </Subtitle>
        <Title>{Quote.getRandomQuote()}</Title>
        <ButtonRecord onClick={recordAudio} id="record">Record</ButtonRecord>
      </Layout>
    </>    
  )
}