import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  CreditCard,
  Percent,
  ArrowLeftRight,
  Banknote,
  Users,
  Headphones,
  Shield,
  Plane,
  Sparkles,
  Crown,
  ArrowLeft,
} from "lucide-react"

const privileges = [
  {
    icon: CreditCard,
    title: "Gold карта",
    description: "Золотая металлическая карта премиум-класса",
  },
  {
    icon: Percent,
    title: "Кешбэк до 30%",
    description: "Максимальный кешбэк до 30% в любых категориях",
  },
  {
    icon: ArrowLeftRight,
    title: "Неограниченные переводы",
    description: "Любые переводы без комиссий и лимитов",
  },
  {
    icon: Banknote,
    title: "Снятие наличных",
    description: "До 500 000 ₽ в месяц без комиссии",
  },
  {
    icon: Users,
    title: "Персональный менеджер",
    description: "Выделенный менеджер для решения любых вопросов",
  },
  {
    icon: Headphones,
    title: "VIP-поддержка 24/7",
    description: "Выделенная линия с моментальным ответом",
  },
  {
    icon: Shield,
    title: "Премиум страхование",
    description: "Страхование покупок и путешествий до 500 000 ₽",
  },
  {
    icon: Plane,
    title: "Безлимитные бизнес-залы",
    description: "Неограниченный доступ в бизнес-залы по всему миру",
  },
  {
    icon: Sparkles,
    title: "Консьерж-сервис",
    description: "Помощь в организации поездок и мероприятий",
  },
  {
    icon: Crown,
    title: "VIP-мероприятия",
    description: "Приглашения на эксклюзивные события",
  },
]

export default function GoldPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-950 to-stone-950">
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к дашборду
          </Button>
        </Link>

        <div className="bg-gradient-to-br from-yellow-800/30 to-amber-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex items-start gap-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-2xl" />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-3">Gold - Роскошь без границ</h1>
              <p className="text-white/70 text-lg mb-6">10 эксклюзивных привилегий для вашего комфорта</p>

              <Button className="bg-yellow-700/30 hover:bg-yellow-700/40 text-white border border-yellow-600/50">
                <Crown className="w-4 h-4 mr-2" />
                Gold статус
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {privileges.map((privilege, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-yellow-900/20 to-amber-950/20 backdrop-blur-sm border border-white/10 p-6 hover:border-yellow-600/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-yellow-700/20 flex items-center justify-center mb-4">
                <privilege.icon className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{privilege.title}</h3>
              <p className="text-white/60 text-sm">{privilege.description}</p>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-yellow-900/20 to-amber-950/20 backdrop-blur-sm border border-white/10 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Получите все преимущества Gold</h2>
              <p className="text-white/60">Пополните счёт для разблокировки эксклюзивных привилегий этого уровня</p>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-black font-semibold px-8 py-6 text-lg">
              Внесите средства для открытия уровня
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
