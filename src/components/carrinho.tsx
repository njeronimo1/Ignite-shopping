

import { ContainerCarrinho } from '@/styles/components/carrinho'
import Image from 'next/image'
import camiseta from '../assets/camiseta1.png'

import { AiOutlineClose } from 'react-icons/ai'
import { useContext } from 'react'
import { CarrinhoContext } from '@/contexts/carrinho'
import { priceFormatted } from '@/utils/formattedPrice'
import axios from 'axios'

interface CarrinhoProps {
    showCar: boolean,
    handleShowCar: ()=> void,
}

export function Carrinho({showCar, handleShowCar}:CarrinhoProps){

    const carrinhoContext = useContext(CarrinhoContext);

    function priceTotal(){
        let car = carrinhoContext?.carrinho;
        let price = 0;

        if(car != undefined && car.length != 0){
            console.log('entrei');
            carrinhoContext?.carrinho.forEach(c => {
                price += Number(c.price);
            })
        }

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price);
    }

    function removeItem(id: string) {
        carrinhoContext.deleteItem(id);
    }

    async function handleBuyProduct(){
        try{
            let car = carrinhoContext.carrinho;
            const response = await axios.post('/api/checkout', {car});

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;
        }catch(err){
            alert('Falha ao redirecionar')
        }
    }    

    return(
        <>
        {showCar ? 
            <ContainerCarrinho>
                <button className="close" onClick={handleShowCar}>
                    <AiOutlineClose size={25} color='#ffffff' />
                </button>

                <div className='container_carrinho'>
                    <h3>Sacola de compras</h3>

                    <div className='container_products'>
                        {carrinhoContext?.carrinho?.map(p => {
                            return(
                                <div className='product'>
                                    <div className='image'>
                                        <Image src={p.imageUrl} width={100} height={100} alt=''/>
                                    </div>

                                    <div className='desc_product'>
                                        <p>{p.name}</p>
                                        <strong>{priceFormatted(p.price)}</strong>
                                        <button onClick={() => { removeItem(p.id) }}>Remover</button>
                                    </div>
                                </div>
                            )
                        })}
                        
                    </div>
                    
                </div>
                <footer>
                    <main className='container_footer'>
                        <div>
                            <p>Quantidade</p>
                            <p>{carrinhoContext?.carrinho.length} itens</p>
                        </div>
                        <div>
                            <p>Valor total</p>
                            <p>{priceTotal()}</p>
                        </div>
                        <button disabled={carrinhoContext?.carrinho.length > 0 ? false : true} onClick={handleBuyProduct}>Finalizar compra</button>
                    </main>
                </footer>
            </ContainerCarrinho>
        : <></>}
        </>
    )
}