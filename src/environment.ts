import * as z from 'zod';
import dotenv from 'dotenv';
dotenv.config();

export const envSchema = z.object({
	SERVER_IP: z.string(),
	SERVER_PORT: z.string().transform((val) => parseInt(val, 10)),
	MC_USERNAME: z.string(),
	MC_PASSWORD: z.string().optional(),
	MC_AUTH: z.string().refine((val) => val === "microsoft" || val === "mojang" || val === "offline"),
});

export type Env = z.infer<typeof envSchema>;
export const env = envSchema.parse(process.env);