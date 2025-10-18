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
  Briefcase,
  TrendingUp,
  ArrowLeft,
  Gem,
} from "lucide-react"

const privileges = [
  {
    icon: CreditCard,
    title: "Diamond карта",
    description: "Эксклюзивная карта с бриллиантом и гравировкой",
  },
  {
    icon: Percent,
    title: "Кешбэк до 50%",
    description: "Беспрецедентный кешбэк до 50% без ограничений",
  },
  {
    icon: ArrowLeftRight,
    title: "Премиум переводы",
    description: "Мгновенные переводы по всему миру без комиссий",
  },
  {
    icon: Banknote,
    title: "Неограниченное снятие",
    description: "Снятие любых сумм без комиссий и лимитов",
  },
  {
    icon: Users,
    title: "Private Banking",
    description: "Команда персональных менеджеров и экспертов",
  },
  {
    icon: Headphones,
    title: "Выделенная линия",
    description: "Прямая линия с приоритетом №1",
  },
  {
    icon: Shield,
    title: "Максимальное страхование",
    description: "Полное страхование до 5 млн ₽",
  },
  {
    icon: Plane,
    title: "VIP-трансферы",
    description: "Личный трансфер и сопровождение в аэропортах",
  },
  {
    icon: Sparkles,
    title: "Элитный консьерж",
    description: "Персональный консьерж для любых задач",
  },
  {
    icon: Crown,
    title: "Закрытые мероприятия",
    description: "Доступ к самым престижным событиям мира",
  },
  {
    icon: Briefcase,
    title: "Финансовый советник",
    description: "Личный советник по инвестициям и налогам",
  },
  {
    icon: TrendingUp,
    title: "Индивидуальные условия",
    description: "Персональные тарифы под ваши потребности",
  },
]

export default function DiamondPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-950 to-neutral-950">
      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к дашборду
          </Button>
        </Link>

        <div className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
          <div className="flex items-start gap-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-300 to-blue-600 shadow-2xl" />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-3">Diamond - Вершина эксклюзивности</h1>
              <p className="text-white/70 text-lg mb-6">12 эксклюзивных привилегий для вашего комфорта</p>

              <Button className="bg-blue-700/30 hover:bg-blue-700/40 text-white border border-blue-500/50">
                <Gem className="w-4 h-4 mr-2" />
                Diamond статус
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {privileges.map((privilege, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-blue-900/20 to-slate-950/20 backdrop-blur-sm border border-white/10 p-6 hover:border-blue-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-700/20 flex items-center justify-center mb-4">
                <privilege.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{privilege.title}</h3>
              <p className="text-white/60 text-sm">{privilege.description}</p>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-blue-900/20 to-slate-950/20 backdrop-blur-sm border border-white/10 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Получите все преимущества Diamond</h2>
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
