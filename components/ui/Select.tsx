import React from 'react'

export const Select = ({ children, selectChange, name, config }: { children: React.ReactNode, selectChange: any, name?: string, config?: string }) => {
  return (
    <select name={name ? name : ''} className={`${config} text-sm border p-1.5 rounded-md transition-colors duration-100 focus:outline-none focus:border-main focus:ring-1 focus:ring-main dark:border-neutral-500 dark:text-white`} onChange={selectChange}>
      { children }
    </select>
  )
}
