import React from 'react';
import PageTitle from './PageTitle';
import { APP_NAME } from '../config/app';
import { useBreakpoint } from '../hooks/useBreakpoint';
import DesktopLogin from './auth/DesktopLogin';
import MobileLogin from './auth/MobileLogin';

export default function LoginPage() {
  const isDesktop = useBreakpoint(1024); // 1024px is the 'lg' breakpoint in Tailwind

  return (
    <>
      <PageTitle title="Login" description={`Sign in to ${APP_NAME}`} />
      {isDesktop ? <DesktopLogin /> : <MobileLogin />}
    </>
  );
}