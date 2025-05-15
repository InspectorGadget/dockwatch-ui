import type { Container } from "@/types/container"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Cpu, Database, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ContainerCardProps {
  container: Container
}

export default function ContainerCard({ container }: ContainerCardProps) {
  // Extract container name without the leading slash
  const displayName = container.name.startsWith("/") ? container.name.substring(1) : container.name

  // Parse memory percentage as a number
  const memPercent = Number.parseFloat(container.stats.mem_percent.replace("%", ""))

  // Parse CPU percentage as a number
  const cpuPercent = Number.parseFloat(container.stats.cpu.replace("%", ""))

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="p-4 md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-lg mb-1 truncate" title={displayName}>
              {displayName}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <Badge
                variant={container.state === "running" ? "success" : "destructive"}
                className={`capitalize ${container.state === "running" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"}`}
              >
                {container.state}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              {container.status}
            </div>
          </div>

          <div className="p-4 md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Cpu className="h-4 w-4 mr-2 text-blue-500" />
                    <span className="text-sm font-medium">CPU Usage</span>
                  </div>
                  <span className="text-sm font-medium">{container.stats.cpu}</span>
                </div>
                <Progress value={cpuPercent} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Database className="h-4 w-4 mr-2 text-purple-500" />
                    <span className="text-sm font-medium">Memory Usage</span>
                  </div>
                  <span className="text-sm font-medium">{container.stats.mem_percent}</span>
                </div>
                <Progress value={memPercent} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>{container.stats.mem_usage}</span>
                  <span>{container.stats.mem_limit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
