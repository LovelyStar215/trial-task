import { RegisterForm } from "./form";
import Header from "@/components/header.component";

export default function RegisterPage() {
  return (
    <>
      <section className="bg-ct-blue-600 min-h-screen text-white">
        <RegisterForm />
      </section>
    </>
  );
}
