import { getServerSession } from "next-auth";
import Header from "@/components/header.component";
import { authOptions } from "@/lib/auth";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
        <>
            <section className="bg-ct-blue-600  min-h-screen relative text-white">
                <img src="./img/login-bg.png" alt="image" className="login__bg blur-md" />
                <div className="absolute bg-ct-dark-100 rounded-md w-full h-full flex justify-center items-center">
                    <div>
                        <p className="mb-3 text-5xl text-center font-semibold">
                            Profile Page
                        </p>
                        {!user ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="flex items-center gap-8">
                                <div className="mt-8">
                                    <p className="mb-3">Email: {user.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Header />
        </>
    );
}
