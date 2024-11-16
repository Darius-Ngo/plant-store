import { useState, useEffect } from "react"

function useDeviceType() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 768 && window.innerWidth <= 1024,
  )
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024)
      setIsDesktop(window.innerWidth > 1024)
    }

    // Thêm sự kiện khi thay đổi kích thước cửa sổ
    window.addEventListener("resize", handleResize)

    // Dọn dẹp sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return { isMobile, isTablet, isDesktop }
}

export default useDeviceType
