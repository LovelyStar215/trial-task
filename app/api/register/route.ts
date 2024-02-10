import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
    try {
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { email, password, address, wallet_address } = (await req.json()) as {
            name: string;
            email: string;
            password: string;
            address: string;
            wallet_address: string;
        };
        const hashed_password = await hash(password, 12);

        // const user = await prisma.user.create({
        //   data: {
        //     name,
        //     email: email.toLowerCase(),
        //     password: hashed_password,
        //   },
        // });
        const { data: existingData, error: existingError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        if (existingData) {
            return NextResponse.json({
                message: "User already exist"
            });

        } else {
            const password = hashed_password;
            const { data, error } = await supabase
                .from('users')
                .insert([{ email, address, password, wallet_address }]);
            if (error) {
                throw error;
            }


            if (error) {
                return NextResponse.json({
                    message: "Couldn't authenticate user"
                });
            }

            return NextResponse.json({
                message: "Success"
            });
        }
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
