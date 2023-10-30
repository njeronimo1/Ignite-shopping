import { ProductProps } from "@/pages/product/[id]";
import { createContext, useEffect, useState } from "react";

export interface Carrinho {
    id: string,
    name: string,
    imageUrl: string,  
    price: string,
    priceId: string
}

interface CarrinhoContext {
    carrinho: Carrinho[],
    insert: (value: Carrinho) => void,
    deleteItem: (id: string) => void,
    clearAllCar: () => void,
}

export const CarrinhoContext = createContext<CarrinhoContext>(null!);

export function CarrinhoProvider({children}: {children: JSX.Element}){
    const [carrinho, setCarrinho] = useState<Carrinho[]>([]);

    useEffect(() => {
        let carLocal = localStorage.getItem('carrinho');

        if(carLocal){
            let car = JSON.parse(carLocal);
            setCarrinho(car);
        };
    }, [])

    function insert(value: Carrinho){
        let carLocal = localStorage.getItem('carrinho');
        if(carLocal){
            let car:Carrinho[] = JSON.parse(carLocal);

            if(car.filter(e => e.id == value.id).length > 0){
                return;
            }else{
                let carForInsert = [...carrinho, value];
                localStorage.setItem('carrinho', JSON.stringify(carForInsert));

                setCarrinho(carForInsert);
            }
        }else{
            let carForInsert = [...carrinho, value];
            localStorage.setItem('carrinho', JSON.stringify(carForInsert));

            setCarrinho(carForInsert);
        }
    }

    function deleteItem(id: string){
        let carLocal = localStorage.getItem('carrinho');
        if(carLocal){
            let car:Carrinho[] = JSON.parse(carLocal);

            let carForInsert = car.filter(c => c.id !== id);
            localStorage.setItem('carrinho', JSON.stringify(carForInsert));

            setCarrinho(carForInsert);
        }
    }

    function clearAllCar(){
        localStorage.setItem('carrinho', JSON.stringify([]));
        setCarrinho([]);
    }


    return(
        <CarrinhoContext.Provider value={{ carrinho, insert, deleteItem, clearAllCar }}>
            {children}
        </CarrinhoContext.Provider>
    )
}