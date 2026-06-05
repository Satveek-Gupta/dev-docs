import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    aws: '#ff9900',
    docker: '#2496ed',
    kubernetes: '#326ce5',
    linux: '#f5a623',
    terraform: '#7b42bc',
    devops: '#22c55e',
    cicd: '#f97316',
    networking: '#06b6d4',
    cloud: '#00d4ff',
    security: '#ef4444',
    sysadmin: '#8b5cf6',
    misc: '#6b7280',
  }
  return colors[category.toLowerCase()] ?? '#6b7280'
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str
  return str.slice(0, len).trim() + '…'
}
