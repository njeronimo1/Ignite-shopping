import Head from 'next/head'
import Image from 'next/image'
import {styled} from '../styles'
import {useKeenSlider} from 'keen-slider/react'
import { HomeContainer, Product } from '@/styles/pages/home'

import camiseta1 from '../assets/camiseta1.png'
import camiseta2 from '../assets/camiseta2.png'
import camiseta3 from '../assets/camiseta3.png'

import 'keen-slider/keen-slider.min.css';
import { stripe } from '@/lib/stripe'
import { GetServerSideProps, GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'

import {HiOutlineShoppingBag} from 'react-icons/hi'
import { useContext, useState } from 'react'
import { Carrinho } from '@/components/carrinho'
import { CarrinhoContext } from '@/contexts/carrinho'
import { priceFormatted } from '@/utils/formattedPrice'


interface HomeProps{
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    priceId: string
  }[]
}

export default function Home({ products }: HomeProps) {

  const carrinhoContext = useContext(CarrinhoContext);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 50
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
    
      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products.map((p) => {
          return(
              <Product key={p.id} className='keen-slider__slide'>
                <Link href={`/product/${p.id}`} prefetch={false}>
                  <Image src={p.imageUrl} width={520} height={480} alt={p.name}/>
                </Link>
                <footer>
                  <div className='info'>
                    <strong>{p.name}</strong>
                    <span>{priceFormatted(p.price)}</span>
                  </div>
                  <button className='car' onClick={() => {carrinhoContext?.insert(p)}}>
                    <HiOutlineShoppingBag size={25} />
                  </button>
                </footer>
              </Product>
          )
        })}
      </HomeContainer>

      
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    return{
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],  
      price: price.unit_amount! / 100,
      priceId: price.id
    }
  })

  return{
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}