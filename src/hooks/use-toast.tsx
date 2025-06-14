import { useState, useEffect } from "react"

type ToastProps = {
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

type Toast = ToastProps & {
  id: string
  open: boolean
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, action, variant = "default" }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = {
      id,
      title,
      description,
      action,
      variant,
      open: true,
    }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 5000)

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  // For use in components that need to access the current toasts
  useEffect(() => {
    // You could add a global toast container here if needed
    const toastContainer = document.getElementById("toast-container")
    
    if (!toastContainer && toasts.length > 0) {
      const container = document.createElement("div")
      container.id = "toast-container"
      container.className = "fixed top-0 right-0 p-4 space-y-4 z-50"
      document.body.appendChild(container)
      
      toasts.forEach(toast => {
        const toastElement = document.createElement("div")
        toastElement.className = `border rounded-md p-4 shadow-lg ${
          toast.variant === "destructive"
            ? "bg-red-600 text-white border-red-700"
            : "bg-white text-black border-gray-300"
        }`
        
        
        const titleElement = document.createElement("div")
        titleElement.className = "font-medium"
        titleElement.textContent = toast.title || ""
        
        const descElement = document.createElement("div")
        descElement.className = "text-sm text-gray-500"
        descElement.textContent = toast.description || ""
        
        toastElement.appendChild(titleElement)
        toastElement.appendChild(descElement)
        
        container.appendChild(toastElement)
      })
      
      return () => {
        if (document.getElementById("toast-container")) {
          document.body.removeChild(container)
        }
      }
    }
  }, [toasts])

  return { toast, dismiss }
}