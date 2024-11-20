import { FC, ReactNode } from 'react'

import { LinkWrapperProps } from './LinkWrapper'
import { ButtonProps } from './Button'
// import Header from './Header'
import useTitle from '../hooks/useTitle'


export type NavigationProps = Pick<LinkWrapperProps, 'disabled' | 'to'> & Pick<ButtonProps, 'title'> & {
  closeWebApp?: boolean
}

export type LayoutProps = {
  title: string
  description?: string
  children: ReactNode
  navigations?: NavigationProps[]
}


const Layout: FC<LayoutProps> = ({
  title,
  children,
}) => {
  useTitle(title)

  return (
    <>
      {/* <Header /> */}
      {children}
    </>
  )
}


export default Layout
