import express from "express";
import asyncHandler from "express-async-handler";
import Address from "../models/addressModel.js";

import Correios from "../correios.js";

const correiosRoute = express.Router();

const correios = new Correios();

correiosRoute.post('/cep', asyncHandler(async(request, response) => {
    const { cep } = request.body;

    correios.consultaCEP({ cep }).then(result => {
        return response.json(result);
    }).catch(error => {
        return response.json(error);
    });
}))

correiosRoute.post('/frete', asyncHandler(async(request, response) => {
    const { cepDestino, pesoProduto } = request.body;

    const address = await Address.findOne({warehouse: true});

    let cepOrigem;

    if (address)
        cepOrigem = address.postalCode;
    else
        cepOrigem = "12345678";

    correios.calcPreco({cepOrigem, cepDestino, pesoProduto}).then(result => {
            return response.json(result);
        }).catch(error => {
            return response.json(error);
        });
}))

export default correiosRoute;
