import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"
import Link from "next/link"

interface GradeCardProps {
  profile: {
    grade: string
    subscription: string
    balance: number
  }
}

const gradeConfig = {
  bronze: {
    label: "Bronze",
    minBalance: 0,
    nextGrade: "Silver",
    nextBalance: 3000000,
    gradient: "grade-bronze",
    iconGradient: "from-amber-700 to-amber-900",
  },
  silver: {
    label: "Silver",
    minBalance: 3000000,
    nextGrade: "Gold",
    nextBalance: 5000000,
    gradient: "grade-silver",
    iconGradient: "from-gray-300 to-gray-500",
  },
  gold: {
    label: "Gold",
    minBalance: 5000000,
    nextGrade: "Diamond",
    nextBalance: 10000000,
    gradient: "grade-gold",
    iconGradient: "from-yellow-300 to-yellow-600",
  },
  diamond: {
    label: "Diamond",
    minBalance: 10000000,
    nextGrade: null,
    nextBalance: null,
    gradient: "grade-diamond",
    iconGradient: "from-blue-300 to-blue-600",
  },
}

const subscriptionLabels = {
  none: "Без подписки",
  pro: "T-Pro",
  premium: "T-Premium",
}

export function GradeCard({ profile }: GradeCardProps) {
  const config = gradeConfig[profile.grade as keyof typeof gradeConfig]

  const progress = config.nextBalance
    ? Math.min(((profile.balance - config.minBalance) / (config.nextBalance - config.minBalance)) * 100, 100)
    : 100

  const remainingToNext = config.nextBalance ? config.nextBalance - profile.balance : 0

  return (
    <div className="mb-8">
      <Card className={`${config.gradient} border-2 border-white/10 overflow-hidden`}>
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.iconGradient} shadow-lg flex items-center justify-center`}
                >
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-white">Ваш статус</h2>
                  <Badge className="bg-white/20 text-white hover:bg-white/30 border-white/30">
                    {config.label} статус
                  </Badge>
                </div>
                {config.nextGrade && (
                  <p className="text-white/70">
                    До уровня {config.nextGrade} осталось {remainingToNext.toLocaleString("ru-RU")} ₽
                  </p>
                )}
                {!config.nextGrade && <p className="text-white/70">Максимальный уровень достигнут</p>}
              </div>
            </div>

            <div className="text-right">
              <div className="text-white/70 text-sm mb-1">Текущий баланс</div>
              <div className="text-3xl font-bold text-white">{profile.balance.toLocaleString("ru-RU")} ₽</div>
            </div>
          </div>

          {config.nextGrade && (
            <div>
              <div className="flex items-center justify-between mb-2 text-sm text-white/70">
                <span>{config.minBalance.toLocaleString("ru-RU")} ₽</span>
                <span>{config.nextBalance?.toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/50 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-center mt-2 text-white/70 text-sm">
                {progress.toFixed(0)}% до {config.nextGrade}
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {Object.entries(gradeConfig).map(([key, grade]) => {
          const isActive = key === profile.grade
          const isPassed = profile.balance >= grade.minBalance

          return (
            <Link key={key} href={`/grades/${key}`}>
              <Card
                className={`${grade.gradient} border-2 ${isActive ? "border-white/30 ring-2 ring-accent" : "border-white/10"} overflow-hidden transition-all hover:scale-105 cursor-pointer`}
              >
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${grade.iconGradient} shadow-lg`}></div>
                  </div>
                  <h3 className="font-bold text-center text-white mb-1">{grade.label}</h3>
                  <p className="text-white/60 text-xs text-center">
                    {grade.minBalance === 0 ? "от 0 ₽" : `от ${(grade.minBalance / 1000000).toFixed(0)} млн ₽`}
                  </p>
                  {isPassed && (
                    <div className="mt-2 text-center">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                        {isActive ? "Текущий" : "Достигнут"}
                      </Badge>
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
