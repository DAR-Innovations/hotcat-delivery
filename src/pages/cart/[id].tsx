import { useQuery } from "@tanstack/react-query";
import { OrderDetailsDTO } from "common/dto/OrderDetialsDTO";
import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import { IOrder } from "common/types/order.type";
import { IPaymentMethod } from "common/types/paymentMethod.type";
import OrderedCartDeliveryDetails from "components/CartPageComponents/OrderedCartDetails/DeliveryDetails";
import Layout from "components/Layout/Layout";
import MasterCardColored from "components/UI/Icons/MasterCardColored";
import PayPalColored from "components/UI/Icons/PayPalColored";
import Router, { useRouter } from "next/router";
import {
  fillPaymentAndDeliveryDetails,
  getOrderById,
} from "proxy/fetches/fetchOrders";
import { getAllPaymentMethods } from "proxy/fetches/fetchPaymentMethod";
import React, { ChangeEvent, useState } from "react";
import { selectUserId } from "store/slices/authSlice";
import { showNotificationModal } from "store/slices/notificationModalSlice";
import { useAppDispatch, useAppSelector } from "store/store";

const OrderedCartDetailsPage = () => {
  const {
    query: { id },
  } = useRouter();

  const orderId = id as string;
  const userId = useAppSelector(selectUserId);

  const { data: order } = useQuery<IOrder>(
    [`orderWithId${orderId}`],
    () => getOrderById(parseInt(orderId)),
    { enabled: id !== null && id !== undefined }
  );

  const { data: paymentMethods } = useQuery<IPaymentMethod[]>(
    ["paymentMethods"],
    getAllPaymentMethods
  );

  const dispatch = useAppDispatch();

  //Selected payment method
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<
    number | null
  >(null);
  const [selectedPaymentMethodName, setSelectedPaymentMethodName] =
    useState("");

  const renderedPaymentMethods = paymentMethods?.map((paymentMethod, index) => {
    if (index === 0 && selectedPaymentMethodId === null) {
      setSelectedPaymentMethodId(paymentMethod.id);
      setSelectedPaymentMethodName(paymentMethod.name);
    }

    return (
      <div key={paymentMethod.id} className="flex items-center gap-2">
        <input
          defaultChecked={index === 0}
          onChange={e => {
            setSelectedPaymentMethodId(parseInt(e.target.value));
            setSelectedPaymentMethodName(paymentMethod.name);
          }}
          id={paymentMethod.id.toString()}
          type="radio"
          name="paymentMethod"
          value={paymentMethod.id}
        />
        <label className="w-full h-full" htmlFor={paymentMethod.id.toString()}>
          {paymentMethod.name}
        </label>
      </div>
    );
  });

  //Credit card info
  const [creditNumber, setCreditNumber] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [securityCode, setSecurityCode] = useState<string>("");
  const [name, setName] = useState<string>("");

  const onChangeCardNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
      .replace(/[^0-9]/gi, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    setCreditNumber(value);
  };

  const onChangeExpirationDate = (event: ChangeEvent<HTMLInputElement>) => {
    const expdate = event.target.value;
    const expDateFormatter =
      expdate
        .replace(/\//g, "")
        .substring(0, 2)
        .replace(/[^0-9]/gi, "") +
      (expdate.length > 2 ? "/" : "") +
      expdate
        .replace(/\//g, "")
        .substring(2, 4)
        .replace(/[^0-9]/gi, "");
    setExpirationDate(expDateFormatter);
  };

  const onChangeSecurityCode = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/gi, "");
    setSecurityCode(value);
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
  };

  // Delivery information
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAddress(value);
  };

  const onChangeCity = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^A-Za-z]/gi, "");
    setCity(value);
  };

  const onChangeContactNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setContactNumber(event.target.value.replace(/[^0-9]/gi, ""));
  };

  const onChangeAdditionInfo = (event: ChangeEvent<HTMLInputElement>) => {
    setAdditionalInfo(event.target.value);
  };

  //Submit info to API
  const handleOnOrder = async () => {
    const fieldsValue = [
      creditNumber,
      expirationDate,
      securityCode,
      name,
      address,
      city,
      contactNumber,
      additionalInfo,
    ];

    const isFieldsValid = fieldsValue.every(
      field => field !== null && field !== undefined && field !== ""
    );

    if (!isFieldsValid) {
      return dispatch(
        showNotificationModal({
          message: "Missing some attributes",
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }

    const orderDetialsDto: OrderDetailsDTO = {
      payment: {
        totalPrice: order?.totalPrice!,
        userId: order?.appUser.id!,
        restaurantId: order?.restaurant.id!,
        paymentMethodId: selectedPaymentMethodId!,
      },
      deliveryDetails: {
        address: address,
        city: city,
        additionInfo: additionalInfo,
        contactNumber: contactNumber,
      },
    };

    const { status, data } = await fillPaymentAndDeliveryDetails(
      parseInt(orderId),
      orderDetialsDto
    );

    if (status !== 200) {
      return dispatch(
        showNotificationModal({
          message: "Error!" + data?.message,
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }

    //TODO: REDIRECT TO CHECK STATUS PAGE
    Router.push("/");
  };

  return (
    <Layout title="Order Details">
      <div className="py-5 border-b-2 border-orange-400 my-3">
        <h1 className="font-semibold text-xl leading-none">Order details</h1>
      </div>

      {/* Payment */}
      <div className="pt-8 pb-12 border-b-2 border-gray-100">
        <div className="w-full flex flex-col sm:flex-row gap-y-5 gap-x-20 mb-8">
          <div>
            <h1 className="font-semibold text-xl leading-none">
              Payment information
            </h1>
            <p className="text-base text-gray-400">
              Choose your method of payment
            </p>
          </div>

          <div className="flex w-full items-center gap-x-7">
            {renderedPaymentMethods}
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center gap-y-10 sm:gap-x-12 lg:gap-x-24">
          {/* Card UI */}
          <div className="w-full sm:w-[400px] lg:w-[40%] bg-gradient-to-r from-[#e65c00] to-[#f5af19] p-7 rounded-lg">
            <div className="text-gray-100 text-[15px] tracking-wide flex flex-col gap-y-7">
              <div className="flex flex-col gap-2">
                <p className="uppercase text-gray-300">Card number</p>
                <p>{creditNumber}</p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="uppercase text-gray-300">Expritation date</p>
                <p>{expirationDate}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="uppercase text-gray-300">Name</p>
                  <p>{name}</p>
                </div>

                <div>
                  {selectedPaymentMethodName === "Credit card" ? (
                    <MasterCardColored />
                  ) : (
                    <PayPalColored className="w-12 h-12" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info inputs */}
          <div className="w-full flex flex-col gap-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-y-4 sm:gap-x-12">
              <div className="w-full flex flex-col gap-2">
                <p className="px-2 font-medium">Credit card number</p>
                <input
                  type="text"
                  value={creditNumber}
                  onChange={onChangeCardNumber}
                  className="w-full rounded-lg bg-gray-200 px-4 py-3"
                  placeholder="4324 5433 9382 1030"
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <p className="px-2 font-medium">Expiration date</p>
                <input
                  value={expirationDate}
                  onChange={onChangeExpirationDate}
                  type="text"
                  className="w-full rounded-lg bg-gray-200 px-4 py-3"
                  placeholder="03/24"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-y-4 sm:gap-x-12">
              <div className="w-full flex flex-col gap-2">
                <p className="px-2 font-medium">Security code</p>
                <input
                  value={securityCode}
                  onChange={onChangeSecurityCode}
                  type="text"
                  className="rounded-lg w-full bg-gray-200 px-4 py-3"
                  placeholder="420"
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <p className="px-2 font-medium">Full name</p>
                <input
                  value={name}
                  onChange={onChangeName}
                  type="text"
                  className="rounded-lg w-full bg-gray-200 px-4 py-3"
                  placeholder="John Doe"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery */}
      <OrderedCartDeliveryDetails
        address={address}
        city={city}
        contactNumber={contactNumber}
        additionalInfo={additionalInfo}
        onChangeAdditionInfo={onChangeAdditionInfo}
        onChangeAddress={onChangeAddress}
        onChangeCity={onChangeCity}
        onChangeContactNumber={onChangeContactNumber}
      />

      {/* Summary */}
      <div className="pt-8">
        <div className="mb-8">
          <h1 className="font-semibold text-xl leading-none">Summary</h1>
          <p className="text-base text-gray-400">
            Check the information before ordering
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-gray-400">Total Price</p>
            <p>KZT {order?.totalPrice}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-gray-400">Delivery</p>
            <p>{order?.deliveryProvider.name}</p>
          </div>
        </div>

        <div>
          <button
            onClick={handleOnOrder}
            className="bg-black px-10 py-3 text-white font-medium rounded-xl"
          >
            Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderedCartDetailsPage;
