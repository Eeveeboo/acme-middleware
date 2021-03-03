import { Challenge } from "acme-client/types/rfc8555";
declare type Props = {
    challengePath: string;
    production: boolean;
    domain: string;
    altNames?: string[];
    email?: string;
    challengeOnly?: boolean;
};
export default function createCert(opts: Props): Promise<{
    challenges: Challenge[];
} | undefined>;
export {};
