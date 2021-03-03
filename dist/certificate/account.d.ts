import acme from "acme-client";
export declare function getClient(production: boolean, email: string): Promise<acme.Client>;
