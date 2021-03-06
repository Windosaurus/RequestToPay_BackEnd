/* This is the file where the external APIs of the providers gets turned into the API used by the handlers in the IRoute
 * objects exported by this service. */

import {NextFunction, Request, Response} from "express";
import {checkAscii} from "../../utils/checks";
import {Item} from "../../utils/dbTypes";
import {HTTP400Error} from "../../utils/httpErrors";
import {createItem} from "./providers/createItem";
import {retrieveItem} from "./providers/retrieveItem";
import {retrieveItemsByName} from "./providers/retrieveItemsByName";

export const setItem = async (item: Item) => {
    return createItem(item);
};

export const getItem = async (itemID: number) => {
    return await retrieveItem(itemID);
};

export const getItemsByName = async (name: string) => {
    return await retrieveItemsByName(name);
};

export const checkItemSetParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.Name) {
        throw new HTTP400Error("Missing Name parameter.");
    } else if (!req.query.SID) {
        throw new HTTP400Error("Missing SID parameter.");
    } else if (!req.query.Price) {
        throw new HTTP400Error("Missing Price parameter.");
    } else if (!checkAscii(req.query.Name) || !checkAscii(req.query.SID) || !checkAscii(req.query.Price)) {
        throw new HTTP400Error("Only alphanumeric and '-' characters are allowed.");
    } else {
        next();
    }
};

export const checkItemQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.IID) {
        throw new HTTP400Error("Missing IID parameter.");
    } else if (!checkAscii(req.query.IID)) {
        throw new HTTP400Error("Only alphabetic characters are allowed.");
    } else {
        next();
    }
};

export const checkItemByNameQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    if (!req.query.Name) {
        throw new HTTP400Error("Missing Name parameter.");
    } else if (!checkAscii(req.query.Name)) {
        throw new HTTP400Error("Only alphabetic characters are allowed.");
    } else {
        next();
    }
};
