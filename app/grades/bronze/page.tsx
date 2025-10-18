import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CreditCard, Percent, ArrowLeftRight, Banknote, Headphones, Gift, ArrowLeft, Trophy } from "lucide-react"

const privileges = [
  {
    icon: CreditCard,
    title: "Бесплатное обслуживание",
    description: "0 ₽ за обслуживание карты и счета",
  },
  {
    icon: Percent,
    title: "Кешбэк до 5%",
    description: "Возврат средств с покупок в избранных категориях",
  },
  {
    icon: ArrowLeftRight,
    title: "Переводы без комиссии",
    description: "Бесплатные переводы по номеру телефона",
  },
  {
    icon: Banknote,
    title: "Снятие наличных",
    description: "До 100 000 ₽ в месяц без комиссии",
  },
  {
    icon: Headphones,
    title: "Базовая поддержка",
    description: "Круглосуточная техническая поддержка",
  },
  {
    icon: Gift,
    title: "Программа лояльности",
    description: "Участие в акциях и специальных предложениях",
  },
]

export default function BronzePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-950">
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к дашборду
          </Button>
        </Link>

        <div className="bg-gradient-to-br from-amber-900/30 to-stone-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex items-start gap-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-amber-700/20 to-amber-900/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 shadow-2xl" />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-3">Bronze - Начало премиального пути</h1>
              <p className="text-white/70 text-lg mb-6">6 эксклюзивных привилегий для вашего комфорта</p>

              <Button className="bg-amber-700/30 hover:bg-amber-700/40 text-white border border-amber-600/50">
                <Trophy className="w-4 h-4 mr-2" />
                Bronze статус
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {privileges.map((privilege, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-amber-900/20 to-stone-900/20 backdrop-blur-sm border border-white/10 p-6 hover:border-amber-600/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-700/20 flex items-center justify-center mb-4">
                <privilege.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{privilege.title}</h3>
              <p className="text-white/60 text-sm">{privilege.description}</p>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-amber-900/20 to-stone-900/20 backdrop-blur-sm border border-white/10 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Получите все преимущества Bronze</h2>
              <p className="text-white/60">
                Оформите подписку и начните пользоваться всеми привилегиями уже сегодня за 2990 рублей в месяц
              </p>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-black font-semibold px-8 py-6 text-lg">
              Оформить Bronze
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
