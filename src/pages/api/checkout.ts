// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Carrinho } from '@/contexts/carrinho';
import { stripe } from '@/lib/stripe'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {car} = req.body as { car: Carrinho[]};

  if(req.method !== 'POST'){
    return res.status(405).json({
      error: 'Method not allowed'
    })
  }

  if(!car){
    return res.status(400).json({
      error: 'Price not found'
    })
  }

  const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${process.env.NEXT_URL}/`;

  const checkouSession = await stripe.checkout.sessions.create({
    success_url: success_url,
    cancel_url: cancel_url,
    mode: 'payment',
    line_items: car.map((c) => ({
      price: c.priceId,
      quantity: 1
    }))
  });

  return res.status(201).json({
    checkoutUrl: checkouSession.url
  })
}
