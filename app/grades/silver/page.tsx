import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  CreditCard,
  Percent,
  ArrowLeftRight,
  Banknote,
  Headphones,
  Shield,
  Plane,
  Sparkles,
  ArrowLeft,
  Award,
} from "lucide-react"

const privileges = [
  {
    icon: CreditCard,
    title: "Премиальная карта",
    description: "Металлическая карта с индивидуальным дизайном",
  },
  {
    icon: Percent,
    title: "Кешбэк до 15%",
    description: "Повышенный кешбэк в 5 категориях на выбор",
  },
  {
    icon: ArrowLeftRight,
    title: "Переводы Premium",
    description: "Переводы без лимитов и комиссий",
  },
  {
    icon: Banknote,
    title: "Снятие наличных",
    description: "До 300 000 ₽ в месяц без комиссии",
  },
  {
    icon: Headphones,
    title: "Приоритетная поддержка",
    description: "Отдельная линия поддержки с приоритетом",
  },
  {
    icon: Shield,
    title: "Страхование покупок",
    description: "Защита покупок до 100 000 ₽",
  },
  {
    icon: Plane,
    title: "Бизнес-залы",
    description: "4 прохода в год в бизнес-залы аэропортов",
  },
  {
    icon: Sparkles,
    title: "Эксклюзивные предложения",
    description: "Доступ к закрытым распродажам партнеров",
  },
]

export default function SilverPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-neutral-950">
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к дашборду
          </Button>
        </Link>

        <div className="bg-gradient-to-br from-gray-800/30 to-slate-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex items-start gap-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-gray-400/20 to-gray-600/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-500 shadow-2xl" />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-3">Silver - Изысканность и привилегии</h1>
              <p className="text-white/70 text-lg mb-6">8 эксклюзивных привилегий для вашего комфорта</p>

              <Button className="bg-gray-700/30 hover:bg-gray-700/40 text-white border border-gray-500/50">
                <Award className="w-4 h-4 mr-2" />
                Silver статус
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {privileges.map((privilege, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-800/20 to-slate-900/20 backdrop-blur-sm border border-white/10 p-6 hover:border-gray-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-600/20 flex items-center justify-center mb-4">
                <privilege.icon className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-white font-semibold mb-2">{privilege.title}</h3>
              <p className="text-white/60 text-sm">{privilege.description}</p>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-gray-800/20 to-slate-900/20 backdrop-blur-sm border border-white/10 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Получите все преимущества Silver</h2>
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
