import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CreditCard, TrendingUp, CheckCircle2, Gift, Wallet, Shield, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
              <span className="font-bold text-accent-foreground text-lg">Т</span>
            </div>
            <span className="font-bold text-xl">Т-Банк</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Главная
            </Link>
            <Link href="#grades" className="text-muted-foreground hover:text-foreground transition-colors">
              Платежи
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Переводы
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Карты
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Вклады
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Кредиты
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Инвестиции
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Ещё
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="hidden md:inline-flex">
              <Link href="/auth/login">Войти</Link>
            </Button>
            <Button size="sm" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/auth/register">Оформить Premium</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-accent text-sm font-medium">Т-Банк Premium</span>
          </div>
          <h1 className="font-bold text-4xl md:text-6xl leading-tight tracking-tight text-balance">
            Премиальное банковское обслуживание с эксклюзивными привилегиями
          </h1>
          <p className="mt-6 text-muted-foreground text-lg md:text-xl leading-relaxed text-pretty max-w-3xl mx-auto">
            Выберите свой уровень и получайте максимум от каждой операции
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto text-base px-8"
            >
              <Link href="/auth/register">Начать пользоваться</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto text-base px-8 bg-transparent border-border/50"
            >
              <Link href="/auth/login">Уже есть аккаунт</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-card border border-border/50 p-8 md:p-12">
            <h2 className="font-bold text-3xl mb-3">Как получить Premium статус</h2>
            <p className="text-muted-foreground text-lg mb-12">Всего 4 простых шага до премиального обслуживания</p>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-xl">
                      1
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
                      <Wallet className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 mt-4">Пополните счёт</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Переведите на счёт от 1,5 млн ₽ для Premium или от 5 млн ₽ для Private
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-xl">
                      2
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 mt-4">Поддерживайте остаток</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Держите необходимую сумму на счёте в течение месяца
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-xl">
                      3
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
                      <CreditCard className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 mt-4">Активируйте статус</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Статус активируется автоматически при достижении необходимого остатка
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-xl">
                      4
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
                      <Gift className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 mt-4">Пользуйтесь привилегиями</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Наслаждайтесь всеми преимуществами премиального обслуживания
                </p>
              </div>
            </div>

            {/* Info box */}
            <div className="mt-12 rounded-2xl bg-gradient-to-r from-amber-900/20 to-amber-800/10 border border-amber-700/30 p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Учитывается средний остаток</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Для получения статуса учитывается средний остаток за последние 30 дней. Вы можете пользоваться
                    деньгами, главное — поддерживать необходимый средний баланс.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="grades" className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl mb-4">Т-Банк Premium</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Премиальное банковское обслуживание с эксклюзивными привилегиями. Выберите свой уровень и получайте
              максимум от каждой операции.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8 px-4">
            <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-full flex">
                <div className="grade-bronze w-1/4"></div>
                <div className="grade-silver w-1/4"></div>
                <div className="grade-gold w-1/4"></div>
                <div className="grade-diamond w-1/4"></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>0 ₽</span>
              <span>3 млн ₽</span>
              <span>5 млн ₽</span>
              <span>10 млн ₽</span>
              <span>∞</span>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {/* Bronze */}
            <Card className="grade-bronze border-2 border-white/10 overflow-hidden group hover:scale-105 transition-transform">
              <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 shadow-lg"></div>
                </div>
                <h3 className="font-bold text-xl mb-2 text-center text-white">Bronze</h3>
                <p className="text-white/70 text-sm text-center mb-4">от 0 ₽</p>
                <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Уровень достигнут</span>
                </div>
              </div>
            </Card>

            {/* Silver */}
            <Card className="grade-silver border-2 border-white/20 overflow-hidden group hover:scale-105 transition-transform">
              <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg"></div>
                </div>
                <h3 className="font-bold text-xl mb-2 text-center text-white">Silver</h3>
                <p className="text-white/70 text-sm text-center mb-4">При балансе от 3 млн ₽</p>
                <div className="text-center">
                  <div className="text-white/50 text-xs mb-2">До Gold</div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/50 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <div className="text-white/70 text-xs mt-1">60%</div>
                </div>
              </div>
            </Card>

            {/* Gold */}
            <Card className="grade-gold border-2 border-white/20 overflow-hidden group hover:scale-105 transition-transform">
              <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-lg"></div>
                </div>
                <h3 className="font-bold text-xl mb-2 text-center text-white">Gold</h3>
                <p className="text-white/70 text-sm text-center">При балансе от 5 млн ₽</p>
              </div>
            </Card>

            {/* Diamond */}
            <Card className="grade-diamond border-2 border-white/20 overflow-hidden group hover:scale-105 transition-transform">
              <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center transform group-hover:rotate-6 transition-transform">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-300 to-blue-600 shadow-lg"></div>
                </div>
                <h3 className="font-bold text-xl mb-2 text-center text-white">Diamond</h3>
                <p className="text-white/70 text-sm text-center">При балансе от 10 млн ₽</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-bold text-3xl mb-2">Сравнение тарифов</h2>
              <p className="text-muted-foreground">Выберите тарифы для сравнения и найдите идеальный вариант</p>
            </div>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Sparkles className="w-4 h-4 mr-2" />
              Выбрать тарифы (4)
            </Button>
          </div>

          <div className="rounded-2xl bg-card border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">Услуга</th>
                    <th className="p-4 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-900/30 to-amber-800/20">
                        <Shield className="w-4 h-4 text-amber-600" />
                        <span className="font-semibold">Bronze</span>
                      </div>
                    </th>
                    <th className="p-4 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-600/30 to-gray-700/20">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold">Silver</span>
                      </div>
                    </th>
                    <th className="p-4 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-600/30 to-yellow-700/20">
                        <Shield className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">Gold</span>
                      </div>
                    </th>
                    <th className="p-4 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600/30 to-blue-700/20">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold">Diamond</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/30">
                    <td colSpan={5} className="p-4 font-semibold bg-secondary/30">
                      Основные условия
                    </td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4">Минимальный остаток</td>
                    <td className="p-4 text-center">0 ₽</td>
                    <td className="p-4 text-center">3 млн ₽</td>
                    <td className="p-4 text-center">5 млн ₽</td>
                    <td className="p-4 text-center">10 млн ₽</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4">Стоимость обслуживания</td>
                    <td className="p-4 text-center">0 ₽</td>
                    <td className="p-4 text-center">0 ₽</td>
                    <td className="p-4 text-center">0 ₽</td>
                    <td className="p-4 text-center">0 ₽</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4">Выпуск карты</td>
                    <td className="p-4 text-center">Бесплатно</td>
                    <td className="p-4 text-center">Бесплатно</td>
                    <td className="p-4 text-center">Бесплатно</td>
                    <td className="p-4 text-center">Бесплатно</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td colSpan={5} className="p-4 font-semibold bg-secondary/30">
                      Кешбэк и бонусы
                    </td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4">Максимальный кешбэк</td>
                    <td className="p-4 text-center">5%</td>
                    <td className="p-4 text-center">15%</td>
                    <td className="p-4 text-center">30%</td>
                    <td className="p-4 text-center">50%</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4">Кешбэк на все покупки</td>
                    <td className="p-4 text-center">1%</td>
                    <td className="p-4 text-center">2%</td>
                    <td className="p-4 text-center">3%</td>
                    <td className="p-4 text-center">5%</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4">Специальные категории</td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-4">Баллы спасибо</td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-br from-secondary via-secondary/80 to-secondary/60 p-12 text-center">
            <h2 className="font-bold text-3xl mb-4">Готовы к премиальному обслуживанию?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Оформите карту Т-Банк Premium прямо сейчас и начните пользоваться эксклюзивными привилегиями уже сегодня
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
              Оформить Premium
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-card border border-border/50 p-8 md:p-12">
            <h2 className="font-bold text-3xl mb-3">Часто задаваемые вопросы</h2>
            <p className="text-muted-foreground mb-8">Ответы на популярные вопросы о Premium статусе</p>

            <div className="space-y-4">
              {[
                "Как рассчитывается средний остаток на счёте?",
                "Что будет, если баланс упадёт ниже минимума?",
                "Можно ли вернуться на Premium после перехода на Start?",
                "Учитываются ли инвестиционные счета?",
                "Сколько действует статус Premium?",
                "Доступны ли Premium услуги сразу?",
                "Можно ли получить несколько Premium карт?",
                "Как работает кешбэк 30%?",
              ].map((question, i) => (
                <details key={i} className="group border border-border/50 rounded-xl overflow-hidden">
                  <summary className="p-4 cursor-pointer hover:bg-secondary/50 transition-colors flex items-center justify-between">
                    <span className="font-medium">{question}</span>
                    <svg
                      className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 text-muted-foreground text-sm leading-relaxed">
                    Подробный ответ на вопрос будет здесь. Это демонстрационный текст для показа структуры FAQ секции.
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2025 Т-Банк. Платформа привилегий клиентов Т-Банка</p>
        </div>
      </footer>
    </div>
  )
}
