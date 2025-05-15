export interface ContainerStats {
  cpu: string
  mem_usage: string
  mem_limit: string
  mem_percent: string
}

export interface Container {
  name: string
  state: string
  status: string
  stats: ContainerStats
}
