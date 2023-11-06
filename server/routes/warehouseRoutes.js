import express from "express";
import asyncHandler from "express-async-handler";
import Address from "../models/addressModel.js";

const warehouseRoute = express.Router();

warehouseRoute.put('/', asyncHandler(async(request, response) => {
    const { address, number, city, state, postalCode, complement } = request.body;

    const existingAddress = await Address.findOne({warehouse: true});

    if (existingAddress) {
        existingAddress.address = address || existingAddress.address;
        existingAddress.number = number || existingAddress.number;
        existingAddress.city = city || existingAddress.city;
        existingAddress.state = state || existingAddress.state;
        existingAddress.postalCode = postalCode || existingAddress.postalCode;
        existingAddress.complement = complement || existingAddress.complement;

        const updatedAddress = existingAddress.save();
        response.json(updatedAddress);
    } else {
        const newAddress = await new Address({address, number, city, state, postalCode, complement, warehouse: true }).save()

        if (newAddress) {
            response.status(201).json(newAddress);
        } else {
            response.status(400);
            throw new Error("Dados do Endereço do Local de Armazenagem inválidos");
        }
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
