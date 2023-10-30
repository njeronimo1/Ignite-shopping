import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'

globalStyles();


import { Container, } from '@/styles/pages/app';
import { CarrinhoProvider } from '@/contexts/carrinho';
import { Header } from '@/components/header';

export default function App({ Component, pageProps }: AppProps) {

  return(
      <CarrinhoProvider>
        <Container>
          <Header />
          <Component {...pageProps} />
        </Container>
      </CarrinhoProvider>
  ) 
  
}
