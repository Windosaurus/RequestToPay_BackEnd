/** Defines the routes and endpoints available for orders. */

import { Request, Response } from "express";
import {IRoute} from "..";
import {Invoice, Order} from "../../utils/dbTypes";
import {HTTP404Error} from "../../utils/httpErrors";
import {setInvoice} from "../Invoice/QueryController";
import {
    checkOrderByOrderIDGetQueryParams,
    checkOrdersByEntityIDAndPersonaGetQueryParams,
    checkOrdersByEntityIDGetQueryParams,
    checkOrdersByEntityNameGetQueryParams,
    checkOrderSetQueryParams,
    getEntityOrdersById,
    getEntityOrdersByName,
    getEntityOrdersUInvoiceUEntityById,
    getEntityOrdersUInvoiceUEntityByIdAndPersona,
    getOrder,
    getOrderUInvoice,
    getOrderUInvoiceUEntity,
    setOrder,
} from "./QueryController";

export default [
    {
        handler: [
            checkOrderSetQueryParams,
            async (req: Request, res: Response) => {
                const inv: Invoice = {
                    InID: -1,
                    DeliveryDate: new Date(Date.parse(req.query.DeliveryDate)),
                    NextInID: null,
                };
                const InvID = await setInvoice(inv);
                const ord: Order = {
                    OID: -1,
                    InID: InvID,
                    SID: req.query.SID,
                    CID: req.query.CID,
                    DID: req.query.DID,
                    OrderDate: new Date(Date.parse(req.query.OrderDate)),
                    PaidStatus: false,
                    ArrivedStatus: false,
                    DeliveredStatus: false,
                };
                const result = await setOrder(ord);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "put",
        path: "/api/v1/order",
    },
    {
        handler: [
            checkOrderByOrderIDGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getOrder(req.query.OID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/order",
    },
    {
        handler: [
            checkOrderByOrderIDGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getOrderUInvoice(req.query.OID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/orderUInvoice",
    },
    {
        handler: [
            checkOrderByOrderIDGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getOrderUInvoiceUEntity(req.query.OID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/orderUInvoiceUEntity",
    },
    {
        handler: [
            checkOrdersByEntityIDGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getEntityOrdersById(req.query.EID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entityOrdersByID",
    },
    {
        handler: [
            checkOrdersByEntityNameGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getEntityOrdersByName(req.query.Name);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entityOrdersByName",
    },
    {
        handler: [
            checkOrdersByEntityIDGetQueryParams,
            async (req: Request, res: Response) => {
                const result = await getEntityOrdersUInvoiceUEntityById(req.query.EID);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entityOrdersUInvoiceUEntityByID",
    },
    {
        handler: [
            checkOrdersByEntityIDAndPersonaGetQueryParams,
            async (req: Request, res: Response) => {
                const reqPersona = req.query.Persona;
                let Persona;
                if (reqPersona === "Customer" || reqPersona === "customer" || reqPersona === "c") {
                    Persona = "CID";
                } else if (reqPersona === "Seller" || reqPersona === "seller" || reqPersona === "s") {
                    Persona = "SID";
                } else if (reqPersona === "Driver" || reqPersona === "driver" || reqPersona === "d") {
                    Persona = "DID";
                } else {
                    throw new HTTP404Error("Persona does not match any of the accepted personas.");
                }
                const result = await getEntityOrdersUInvoiceUEntityByIdAndPersona(req.query.EID, Persona);
                res.status(200).send(result);
                return result;
            },
        ],
        method: "get",
        path: "/api/v1/entityOrdersUInvoiceUEntityByIDAndPersona",
    },
] as IRoute[];