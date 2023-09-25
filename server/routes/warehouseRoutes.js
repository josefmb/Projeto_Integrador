import express from "express";
import asyncHandler from "express-async-handler";
import Address from "../models/addressModel.js";

const warehouseRoute = express.Router();

warehouseRoute.post('/', asyncHandler(async(request, response) => {
    const { address, number, city, state, postalCode, complement } = request.body;

    const newAddress = await new Address({address, number, city, state, postalCode, complement, warehouse: true }).save()

    if (newAddress) {
        response.status(201).json(newAddress);
    } else {
        response.status(400);
        throw new Error("Dados do Endereço do Local de Armazenagem inválidos");
    }
}));

warehouseRoute.get('/', asyncHandler(async(request, response) => {
    const address = await Address.findOne({warehouse: true});

    if (address) {
        return response.json(address);
    } else {
        response.status(400);
        throw new Error("Não existe endereço de local de armazenagem");
    }
}));

export default warehouseRoute;
