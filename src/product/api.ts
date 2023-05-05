import axios from "axios";
import { Product } from "./types";
import Papa from "papaparse";

export default {
    list: async (): Promise<Product[]> => {
        return axios
        .get(
            `https://docs.google.com/spreadsheets/d/e/2PACX-1vSOsR3GQ47rFMjmW9rAx1Xg8TfPda89Dp329I3ZnycqFj7UWWPYVxYCDpcwaWBXsOyu4FXZyp3wvAKT/pub?output=csv`,
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