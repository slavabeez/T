import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="font-bold text-primary-foreground text-xl">Т</span>
            </div>
            <span className="font-bold text-2xl">Т-Привилегии</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <svg className="h-8 w-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <CardTitle className="text-center text-2xl">Регистрация успешна!</CardTitle>
            <CardDescription className="text-center">
              Мы отправили письмо с подтверждением на вашу почту
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 text-sm leading-relaxed">
              <p className="mb-2">Для завершения регистрации:</p>
              <ol className="ml-4 list-decimal space-y-1">
                <li>Проверьте вашу почту</li>
                <li>Откройте письмо от Т-Привилегии</li>
                <li>Нажмите на ссылку подтверждения</li>
              </ol>
            </div>

            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/auth/login">Перейти к входу</Link>
            </Button>

            <p className="text-center text-muted-foreground text-xs">Не получили письмо? Проверьте папку "Спам"</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
