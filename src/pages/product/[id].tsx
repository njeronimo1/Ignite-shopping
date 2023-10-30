import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
// import stripe from "stripe";
import { stripe } from '@/lib/stripe'
import Stripe from "stripe";
import Image from "next/image";
import axios from "axios";
import { useContext, useState } from "react";
import Head from "next/head";
import { Carrinho, CarrinhoContext } from "@/contexts/carrinho";
import { priceFormatted } from "@/utils/formattedPrice";

export interface ProductProps{
    product: {
      id: string,
      name: string,
      imageUrl: string,
      price: string,
      description: string,
      defaultPriceId: string
    }
  }

export default function Product({ product } : ProductProps){
    const carrinhoContext = useContext(CarrinhoContext);

    const { query, isFallback } = useRouter();

    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

    if(isFallback){
        return <p>loading...</p>
    }

    const productInsert: Carrinho = {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,  
        price: product.price,
        priceId: product.defaultPriceId,
    }

    return(
        <>
        <Head>
            <title>{product.name}</title>
        </Head>
      
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt=""/>
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{priceFormatted(product.price)}</span>
                <p>{product.description}</p>

                <button disabled={isCreatingCheckoutSession} onClick={() => {carrinhoContext?.insert(productInsert)}}>Colocar na sacola</button>
                {/* onClick={handleBuyProduct} */}
            </ProductDetails>
        </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return{
        paths: [
            {params: { id: 'prod_OnYiLpj2PHYmyH'}}
        ],
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    var productId = '';
    if(params) {productId = params.id}  

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],  
                price: price.unit_amount! / 100,
                description: product.description,
                defaultPriceId: price.id
            }
        },
        revalidate: 60*60*1//1hour
    }
}