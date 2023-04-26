import axios from "axios";
import { Product } from "./types";
import Papa from "papaparse";

export default {
    list: async (): Promise<Product[]> => {
        return axios
        .get(
            `https://docs.google.com/spreadsheets/d/e/2PACX-1vR3FOjVdbC9lgHBaSccJcTJ2yzhi93kDAwvFhHBXapg3JTmP7mrh_HTvn77ay8wBae-6ND1FntYsw3o/pub?output=csv`,
            {
                responseType: "blob",
            },
            ).then((response) => {
                return new Promise<Product[]>((resolve, rejects) => {
                    Papa.parse(response.data, {
                        header: true,
                        complete: (results) => {
                            const products = results.data as Product[];
                            
                            return resolve(
                                products.map((product) => ({
                                    ...product,
                                    price: Number(product.price)
                                }))
                            )
                        },
                        error: (error) => {
                            return rejects(error.message)
                        }
                    })
                })
            })
    }
}