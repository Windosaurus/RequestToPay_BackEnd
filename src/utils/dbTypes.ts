/* tslint:disable */

/**
 * AUTO-GENERATED FILE @ 2019-12-03 13:28:26 - DO NOT EDIT!
 *
 * This file was automatically generated by schemats v.3.0.3
 * $ schemats generate -c postgresql://username:password@localhost:5432/requesttopay -t Invoice -t Item -t Entity -t InvoiceItems -t WarehouseContents -t Order -s requesttopay
 *
 */

export namespace InvoiceFields {
    export type InID = number;
    export type NextInID = number | null;
    export type DeliveryDate = Date;

}

export interface Invoice {
    InID: InvoiceFields.InID;
    NextInID: InvoiceFields.NextInID;
    DeliveryDate: InvoiceFields.DeliveryDate;

}

export namespace ItemFields {
    export type IID = number;
    export type Name = string;
    export type SID = number;
    export type Price = number;

}

export interface Item {
    IID: ItemFields.IID;
    Name: ItemFields.Name;
    SID: ItemFields.SID;
    Price: ItemFields.Price;

}

export namespace EntityFields {
    export type EID = number;
    export type Name = string;
    export type BillingAddress = string;
    export type Username = string;
    export type Password = string;
    export type PhoneNumber = string | null;

}

export interface Entity {
    EID: EntityFields.EID;
    Name: EntityFields.Name;
    BillingAddress: EntityFields.BillingAddress;
    Username: EntityFields.Username;
    Password: EntityFields.Password;
    PhoneNumber: EntityFields.PhoneNumber;

}

export namespace InvoiceItemsFields {
    export type InID = number;
    export type IID = number;
    export type Price = number;
    export type Quantity = number;

}

export interface InvoiceItems {
    InID: InvoiceItemsFields.InID;
    IID: InvoiceItemsFields.IID;
    Price: InvoiceItemsFields.Price;
    Quantity: InvoiceItemsFields.Quantity;

}

export namespace WarehouseContentsFields {
    export type SID = number;
    export type IID = number;
    export type Location = string;
    export type Quantity = number | null;

}

export interface WarehouseContents {
    SID: WarehouseContentsFields.SID;
    IID: WarehouseContentsFields.IID;
    Location: WarehouseContentsFields.Location;
    Quantity: WarehouseContentsFields.Quantity;

}

export namespace OrderFields {
    export type OID = number;
    export type InID = number;
    export type SID = number;
    export type CID = number;
    export type DID = number | null;
    export type OrderDate = Date;
    export type ApprovedStatus = boolean;
    export type ArrivedStatus = boolean;
    export type DeliveredStatus = boolean;
    export type PaidStatus = boolean;

}

export interface Order {
    OID: OrderFields.OID;
    InID: OrderFields.InID;
    SID: OrderFields.SID;
    CID: OrderFields.CID;
    DID: OrderFields.DID;
    OrderDate: OrderFields.OrderDate;
    ApprovedStatus: OrderFields.ApprovedStatus;
    ArrivedStatus: OrderFields.ArrivedStatus;
    DeliveredStatus: OrderFields.DeliveredStatus;
    PaidStatus: OrderFields.PaidStatus;

}
