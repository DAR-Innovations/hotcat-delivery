import { CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { MessageDTO } from "common/dto/MessageDTO";
import { NOTIFICATION_TYPES } from "common/types/notification.enum";
import { useRouter } from "next/router";
import { notifySubscribedUsers } from "proxy/fetches/fetchUser";
import React, { MutableRefObject, useRef } from "react";
import { showNotificationModal } from "store/slices/notificationModalSlice";
import { useAppDispatch } from "store/store";

const buttonDefaultStyle =
  "px-10 py-3 border-2 border-black hover:bg-black hover:text-white rounded-lg duration-200 transition-all";
const buttonDisabledStyle = "px-10 py-3 bg-gray-200 rounded-lg";

const SubscriberNotification = () => {
  const dispatch = useAppDispatch();

  const subjectRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const bodyRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const mutation = useMutation(notifySubscribedUsers);

  const handleOnSubmit = async () => {
    const subjectValue = subjectRef.current.value;
    const bodyValue = bodyRef.current.value;

    const formFieldsValues = [subjectValue, bodyValue];

    const isFormInputValid = formFieldsValues.every(
      value => value !== null && value !== undefined && value != ""
    );

    if (!isFormInputValid) {
      return dispatch(
        showNotificationModal({
          message: "Missing some attributes",
          type: NOTIFICATION_TYPES.ERROR,
        })
      );
    }

    const messageDTO: MessageDTO = {
      subject: subjectValue,
      body: bodyValue,
    };

    mutation.mutate(messageDTO);
  };

  if (mutation.isError && !mutation.isLoading) {
    dispatch(
      showNotificationModal({
        message: "Error! try again",
        type: NOTIFICATION_TYPES.ERROR,
      })
    );
  }

  if (mutation.isSuccess && !mutation.isLoading) {
    dispatch(
      showNotificationModal({
        message: "Success",
        type: NOTIFICATION_TYPES.SUCCESS,
      })
    );
  }

  return (
    <div>
      <h1 className="text-lg font-semibold mb-3 px-3">Message sender</h1>

      <div className="px-6 py-7 border-2 border-gray-400 rounded-xl ">
        <h1 className="text-center text-gray-700 text-xl mb-6 font-semibold">
          Send new message to subscribers
        </h1>

        <div className="w-full flex flex-col gap-y-5">
          <textarea
            ref={subjectRef}
            className="w-full h-[100px] border-2 border-gray-200 rounded-lg px-4 py-3"
            placeholder="Subject"
          />
          <textarea
            ref={bodyRef}
            className="w-full h-[100px] border-2 border-gray-200 rounded-lg px-4 py-3"
            placeholder="Body"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            disabled={mutation.isLoading}
            onClick={handleOnSubmit}
            className={
              mutation.isLoading ? buttonDisabledStyle : buttonDefaultStyle
            }
          >
            {mutation.isLoading ? (
              <CircularProgress size="22px" color="inherit" />
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriberNotification;
