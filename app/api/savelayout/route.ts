import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        const layoutData = (await req.json()) as {
            id: number;
            title: string;
            components: {
                id: number;
                widgetId: number;
            }[]
        }[];

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('user_id')
            .eq('email', user?.email)
            .single();

        if (userError) {
            throw userError;
        }

        console.log(userData);

        const { data: layoutsData, error: layoutsError } = await supabase
            .from('dashboardlayouts')
            .select('*')
            .eq('user_id', userData.user_id)
            .single();

        const user_id = userData.user_id;
        console.log(user_id);
        if (layoutsData == null) {
            console.log("not exist");
            const { data: insertData, error: insertError } = await supabase
                .from('dashboardlayouts')
                .insert([
                    {
                        user_id: user_id,
                        column1: [layoutData[0]],
                        column2: [layoutData[1]],
                        column3: [layoutData[2]],
                        column4: [layoutData[3]],
                        // Add other fields from layoutData as needed
                        // For example:
                        // field1: layoutData.field1,
                        // field2: layoutData.field2,
                        // ...
                    }
                ]);
            console.log(insertData);
            if (insertError) {
                console.log(insertError);
                throw insertError;
            }
            console.log("Inserted Data");
        }

        else {
            console.log("exist");
            const { data: updateData, error: updateError } = await supabase
                .from('dashboardlayouts')
                .update({
                    column1: [layoutData[0]],
                    column2: [layoutData[1]],
                    column3: [layoutData[2]],
                    column4: [layoutData[3]],
                })
                .eq('user_id', user_id);
            console.log(updateData);
            if (updateError) {
                throw updateError;
            }
            console.log("Updated");
        }
        return NextResponse.json({
            message: "Success"
        });
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

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('user_id')
            .eq('email', user?.email)
            .single();

        if (userError) {
            throw userError;
        }

        const { data: layoutsData, error: layoutsError } = await supabase
            .from('dashboardlayouts')
            .select('*')
            .eq('user_id', userData.user_id)
            .single();
        
        if(layoutsData == null) {
            return NextResponse.json({});
        } else {
            console.log(layoutsData);
            return NextResponse.json(layoutsData);
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