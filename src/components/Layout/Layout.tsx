import { useQuery } from "@tanstack/react-query";
import Navbar from "components/Navbar/Navbar";
import NotificationModal from "components/NotificationModal/NotificationModal";
import UserOrderStatus from "components/UserOrderStatus/UserOrderStatus";
import UserOrderStatusModal from "components/UserOrderStatus/UserOrderStatusModal";
import Head from "next/head";
import { checkAuth } from "proxy/fetches/authApi";
import { fetchCart } from "proxy/fetches/fetchLocalStorage";
import { checkIfOrderIsActiveByUserId } from "proxy/fetches/fetchOrders";
import React, { useEffect, useState } from "react";
import { selectUserId } from "store/slices/authSlice";
import { setCartItemsArr } from "store/slices/cartSlice";
import {
  selectNotificationModalIsActive,
  selectNotificationModalMessage,
  selectNotificationModalType,
} from "store/slices/notificationModalSlice";
import {
  clearUserOrderStatusModal,
  closeUserOrderStatusModal,
  selectUserOrderStatusModalIsProcceding,
  setUserOrderStatus,
} from "store/slices/userOrderStatusModalSlice";
import { useAppDispatch, useAppSelector } from "store/store";

interface LayoutProps {
  className?: string;
  title: string;
  children?: React.ReactNode | React.ReactNode[];
  navbarIncluded?: boolean;
}

const Layout = ({
  title,
  children,
  className,
  navbarIncluded = true,
}: LayoutProps) => {
  const isNotificationModalActive = useAppSelector(
    selectNotificationModalIsActive
  );
  const userId = useAppSelector(selectUserId);

  const notificationModalMessage = useAppSelector(
    selectNotificationModalMessage
  );
  const notificationModalType = useAppSelector(selectNotificationModalType);

  const isOrderProcceding = useAppSelector(
    selectUserOrderStatusModalIsProcceding
  );

  const layoutClassName = !Boolean(className)
    ? "container mx-auto px-3 py-1 bg-white text-black font-inter leading-none pb-20"
    : className;
  const headerTitle = `Hotcat | ${title}`;

  const dispatch = useAppDispatch();

  const { data: userOrderStatus } = useQuery(
    [`userOrderStatus`],
    () => checkIfOrderIsActiveByUserId(userId!),
    {
      enabled: userId !== null,
      refetchInterval: 3000,
    }
  );

  //Check auth
  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && refreshToken) {
      checkAuth(dispatch, refreshToken);
    }
  }, [dispatch]);

  //Check ordersList
  useEffect(() => {
    const cart = fetchCart();
    dispatch(setCartItemsArr(cart));
  }, [dispatch]);

  //Check user active orders
  useEffect(() => {
    async function handleCheckIfOrderIsActiveByUserId() {
      if (userId !== null && userOrderStatus) {
        if (userOrderStatus.active) {
          return dispatch(
            setUserOrderStatus({
              order: userOrderStatus!.order,
              isProceeding: userOrderStatus!.active,
            })
          );
        } else {
          return dispatch(clearUserOrderStatusModal());
        }
      }
    }

    handleCheckIfOrderIsActiveByUserId();
  }, [dispatch, userId, userOrderStatus]);

  return (
    <div className="h-screen w-full overflow-x-hidden">
      <Head>
        <title>{headerTitle}</title>
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
      </Head>
      <div className={layoutClassName}>
        {navbarIncluded && <Navbar />}
        {children}
      </div>

      <NotificationModal
        isActive={isNotificationModalActive}
        message={notificationModalMessage}
        type={notificationModalType}
      />

      {isOrderProcceding && <UserOrderStatus />}

      {isOrderProcceding && <UserOrderStatusModal />}
    </div>
  );
};

export default Layout;
