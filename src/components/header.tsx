import { CarrinhoContext } from '@/contexts/carrinho';
import { Header as HeaderStyle } from '@/styles/pages/app';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import logoImg from '../assets/logo.svg';
import { Carrinho } from './carrinho';
import Link from 'next/link';

export function Header(){
    const carrinhoContext  = useContext(CarrinhoContext);

    const [showCar, setShowCar] = useState(false);

    function handleShowCar(){
        setShowCar(!showCar);
    }
    
    return(
        <>
            <HeaderStyle>
                <Link href={'/'}>
                    <Image src={logoImg.src} width={100} height={100} alt="logo" />
                </Link>
            
            <button className='car' onClick={handleShowCar}>
                <HiOutlineShoppingBag size={25} />
                <p className='quantitie'>{carrinhoContext?.carrinho?.length}</p>
            </button>

            </HeaderStyle>

            <Carrinho showCar={showCar} handleShowCar={handleShowCar}/>
        </>
    )
}