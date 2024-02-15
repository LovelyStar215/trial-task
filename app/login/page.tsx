import { LoginForm } from "./form";
import Header from "@/components/header.component";

export default function LoginPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen text-white">
        <LoginForm />
      </section>
    </>
  );
}
