import api from '@/product/api';
import { Product } from '@/product/types';
import { Image, Button, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import {motion, AnimatePresence, LayoutGroup} from "framer-motion"
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
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
  const text = React.useMemo(() => {
    return cart
    .reduce((message, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`),``,)
    .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`)
  }, [cart])

  return (
    
    <LayoutGroup>
        <Stack spacing={6}>
          <Grid gridGap={6} templateColumns='repeat(auto-fill, minmax(240px, 1fr))'>
            {
              products.map((p) => (

                <Stack spacing={3} borderRadius="md" padding={5} backgroundColor='gray.100' key={p.id}>
                  <Stack spacing={1}>
                    <Image alt={p.title} 
                          as={motion.img}
                          cursor="pointer"
                          layoutId={p.title}
                          maxHeight={150} 
                          objectFit="cover" 
                          borderRadius="md"
                          onClick={() => setSelectedImage(p.image)} 
                          src={p.image}/>
                    <Text>{p.title}</Text>
                    <Text fontSize="sm" fontWeight="500" color="green.500">{parseCurrency(p.price)}</Text>
                  </Stack>
                  <Button size="sm" onClick={() => setCart(cart => cart.concat(p))} colorScheme='primary'>Agregar</Button>
                </Stack>
              ))
            }
          </Grid>
            <AnimatePresence>
              {Boolean(cart.length) && ( 
              <Flex initial={{scale:0}} animate={{scale:1}} exit={{scale:0}} as={motion.div} alignItems="center" justifyContent="center" bottom={4} position="sticky">
                <Button
                  width="100%"
                  as={Link}
                  size="lg"
                  colorScheme='whatsapp'
                  href={`https://wa.me/3704205230?text=${encodeURIComponent(text)}`}
                  leftIcon={<Image src='https://icongr.am/fontawesome/whatsapp.svg?size=35&color=ffffff'/>}
                >
                  Ver carrito ({cart.length} productos)
                </Button>
              </Flex>
              )}
            </AnimatePresence>
    </Stack>
          <AnimatePresence mode='wait'>
        {selectedImage && (
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              key={selectedImage}
              src={selectedImage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </LayoutGroup>
   
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



