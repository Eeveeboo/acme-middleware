import { Request, Response } from "express";
export declare function createCertWithWildcardHandler(req: Request, res: Response, production: boolean, challengePath: string): Promise<void>;
