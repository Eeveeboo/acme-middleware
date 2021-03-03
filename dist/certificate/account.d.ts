import acme from "acme-client";
export declare function getClient(challengePath: string, production: boolean, email: string): Promise<acme.Client>;
