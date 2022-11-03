import { useQuery } from "@tanstack/react-query";
import MenuFoodModal from "components/MenuFoodList/MenuFoodModal";
import Navbar from "components/Navbar/Navbar";
import NotificationModal from "components/NotificationModal/NotificationModal";
import DeliveredModalStatus from "components/UserOrderStatus/DeliveredModalStatus";
import UserOrderStatus from "components/UserOrderStatus/UserOrderStatus";
import UserOrderStatusModal from "components/UserOrderStatus/UserOrderStatusModal";
import Head from "next/head";
import { checkAuth, getAccessAndRefreshToken } from "proxy/fetches/authApi";
import {
  changeStateOfOrderInLocalStorage,
  fetchCart,
  getStateOfOrderInLocalStorage,
} from "proxy/fetches/fetchLocalStorage";
import { checkIfOrderIsActiveByUserId } from "proxy/fetches/fetchOrders";
import React, { memo, useEffect, useState } from "react";
import { selectUserId } from "store/slices/authSlice";
import { setCartItemsArr } from "store/slices/cartSlice";
import { showDeliveredModal } from "store/slices/deliveredModalStatus";
import {
  selectNotificationModalIsActive,
  selectNotificationModalMessage,
  selectNotificationModalType,
} from "store/slices/notificationModalSlice";
import {
  clearUserOrderStatusModal,
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

  const isOrderActive = getStateOfOrderInLocalStorage();

  const notificationModalMessage = useAppSelector(
    selectNotificationModalMessage
  );
  const notificationModalType = useAppSelector(selectNotificationModalType);

  const isOrderProcceding = useAppSelector(
    selectUserOrderStatusModalIsProcceding
  );

  const layoutClassName = !Boolean(className)
    ? "container w-full min-h-full mx-auto px-3 py-1 bg-white text-black font-montserrat tracking-normal leading-none pb-20"
    : className;

  const headerTitle = `${title} | Hotcat`;

  const dispatch = useAppDispatch();

  const { data: userOrderStatus } = useQuery(
    [`userOrderStatus`],
    () => checkIfOrderIsActiveByUserId(userId!),
    {
      enabled: userId !== null && isOrderActive == true,
      refetchInterval: 3000,
    }
  );

  //Check auth
  useEffect(() => {
    const { refreshToken, accessToken } = getAccessAndRefreshToken();
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
          changeStateOfOrderInLocalStorage(false);
          dispatch(showDeliveredModal());
          return dispatch(clearUserOrderStatusModal());
        }
      }
    }

    handleCheckIfOrderIsActiveByUserId();
  }, [dispatch, userId, userOrderStatus]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-hidden relative">
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
        <meta
          name="google-site-verification"
          content="kq5h0t6E1AdmFrG9yY1aLoR0QAspgeYkJV5idyHp6j4"
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
      <MenuFoodModal />

      {isOrderProcceding && <UserOrderStatusModal />}

      {true && <DeliveredModalStatus />}
    </div>
  );
};

export default memo(Layout);
