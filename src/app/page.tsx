import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/icons/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LoginPage() {
  const loginHeroImage = PlaceHolderImages.find(
    (image) => image.id === "login-hero"
  );

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="mx-auto grid w-full max-w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Logo className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold font-headline">Finara AI</h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Your personal AI finance assistant. Welcome back.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {loginHeroImage && (
          <Image
            src={loginHeroImage.imageUrl}
            alt={loginHeroImage.description}
            fill
            className="object-cover"
            data-ai-hint={loginHeroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </div>
    </div>
  );
}
