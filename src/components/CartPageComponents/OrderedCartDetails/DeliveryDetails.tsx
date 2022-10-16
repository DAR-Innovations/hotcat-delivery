import React, { ChangeEventHandler, memo } from "react";

interface OrderedCartDeliveryDetailsProps {
  address: string;
  city: string;
  contactNumber: string;
  additionalInfo: string;
  onChangeAddress: ChangeEventHandler;
  onChangeCity: ChangeEventHandler;
  onChangeContactNumber: ChangeEventHandler;
  onChangeAdditionInfo: ChangeEventHandler;
}

const OrderedCartDeliveryDetails = ({
  address,
  city,
  contactNumber,
  additionalInfo,
  onChangeAddress,
  onChangeCity,
  onChangeContactNumber,
  onChangeAdditionInfo,
}: OrderedCartDeliveryDetailsProps) => {
  return (
    <div className="border-b-2 pt-8 pb-12 border-gray-100">
      {/* Personal info */}
      <div className="w-full flex items-center gap-x-20 mb-8">
        <div>
          <h1 className="font-semibold text-xl leading-none">
            Delivery information
          </h1>
          <p className="text-base text-gray-400">Fill out all fields</p>
        </div>
      </div>

      {/* Info inputs */}
      <div className="w-full flex flex-col gap-y-4 sm:gap-y-10">
        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-y-4 sm:gap-x-12">
          <div className="flex flex-col gap-2">
            <p className="px-2 font-medium">Address</p>
            <input
              value={address}
              onChange={onChangeAddress}
              type="text"
              className="rounded-lg w-full sm:w-[220px] bg-gray-200 px-4 py-3"
              placeholder="Kabanbay baty 6"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="px-2 font-medium">City</p>
            <input
              value={city}
              onChange={onChangeCity}
              type="text"
              className="rounded-lg w-full sm:w-[220px] bg-gray-200 px-4 py-3"
              placeholder="Astana"
            />
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-y-4 gap-x-12">
          <div className="flex flex-col gap-2">
            <p className="px-2 font-medium">Contact number</p>
            <input
              value={contactNumber}
              onChange={onChangeContactNumber}
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              className="w-full sm:w-[220px] rounded-lg bg-gray-200 px-4 py-3"
              placeholder="+7 777 123 3512"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="px-2 font-medium">Additional information</p>
            <input
              value={additionalInfo}
              onChange={onChangeAdditionInfo}
              type="text"
              className="rounded-lg w-full sm:w-[220px] bg-gray-200 px-4 py-3"
              placeholder="Entrance, apartment number"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OrderedCartDeliveryDetails);
