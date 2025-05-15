import type { Container } from "@/types/container"
import ContainerCard from "./container-card"

interface ContainerListProps {
  containers: Container[]
}

export default function ContainerList({ containers }: ContainerListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {containers.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No containers found or waiting for data...
        </div>
      ) : (
        containers.map((container) => <ContainerCard key={container.name} container={container} />)
      )}
    </div>
  )
}
