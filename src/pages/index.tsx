import api from '@/product/api';
import { Product } from '@/product/types';
import { Box, Button, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react'

interface Props {
  products: Product[];
}

function parseCurrency(value: number): string {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  })
}

const IndexRoute: React.FC<Props> = ({products}) => {
  const [cart, setCart] = React.useState<Product[]>([])
  const text = React.useMemo(() => {
    return cart
    .reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),``,)
    .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`)
  }, [cart])

  return (
    <Stack spacing={6}>
          <Grid gridGap={6} templateColumns='repeat(auto-fill, minmax(240px, 1fr))'>
            {
              products.map((p) => (

                <Stack spacing={3} borderRadius="md" padding={5} backgroundColor='gray.100' key={p.id}>
                  <Stack spacing={1}>
                    <Text>{p.title}</Text>
                    <Text fontSize="sm" fontWeight="500" color="green.500">{parseCurrency(p.price)}</Text>
                  </Stack>
                  <Button size="sm" onClick={() => setCart(cart => cart.concat(p))} colorScheme='primary'>Agregar</Button>
                </Stack>
              ))
            }
          </Grid>
          {Boolean(cart.length) && ( 
            <Flex alignItems="center" justifyContent="center" bottom={4} position="sticky">
              <Button
                width="100%"
                as={Link}
                colorScheme='whatsapp'
                href={`https://wa.me/3704804510?text=${encodeURIComponent(text)}`}
              >
                Ver carrito ({cart.length} productos)
              </Button>
            </Flex>
            )}
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list()
  return {
    revalidate: 10,
    props: {
      products,
    },
    //revalidate: 10 este parametro maneja cuantas veces nuestra aplicacion va a ir al servidor
  }
}

export default IndexRoute;



