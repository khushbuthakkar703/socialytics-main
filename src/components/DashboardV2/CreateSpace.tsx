import React, { FC, useState } from "react";
import {
  Button,
  Icon,
  Metric,
  Subtitle,
  Text,
  TextInput,
  Title,
  Bold,
} from "@tremor/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import mic from "@/public/images/SpaceMic.svg";
import Image from "next/image";
import { Pagination } from "@/components/Pagination";
import orderhistory from "@/public/images/OrderHistory.svg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
interface CreateSpaceModalProps {
  title?: string;
  handleModal?: () => void;
}

export const CreateSpaceModal: FC<CreateSpaceModalProps> = (props) => {
  const [operation, setOperation] = useState<string>("options");
  const [formData, setFormdata] = useState<any>({
    id: "",
    comments: 0,
    likes: 0,
    retweets: 0,
    impressions: 0,
    videoViews: 0,
    initialPercent: 0,
    dripMinutes: 0,
    explanation: "",
  });

  const handleFormDataNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;

    if (isNaN(parseInt(data)) && data !== "") return;
    setFormdata({
      ...formData,
      [e.target.name]: data === "" ? parseInt("0") : parseInt(data),
    });
  };

  const handleFormDataString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const operationToRender = () => {
    switch (operation) {
      case "options":
        return (
          <div className="flex-9  flex  w-full justify-evenly gap-4">
            <button
              className="flex  h-40  w-2/5 cursor-pointer flex-col items-center justify-center rounded-xl shadow
                    hover:bg-[#011B38] hover:!text-white dark:bg-inherit  dark:text-white "
              onClick={() => setOperation("schedule")}
            >
              <div className="relative h-2/5 w-2/5 gap-4">
                <Image src={mic} alt="Picture of the author" fill />
              </div>
              <Subtitle>Start a Space</Subtitle>
            </button>
            <button
              className="flex h-40 w-2/5 cursor-pointer flex-col items-center justify-center rounded-xl shadow
                    hover:bg-[#011B38] hover:!text-white dark:bg-inherit  dark:text-white "
              onClick={() => setOperation("order")}
            >
              <div className="relative h-2/5 w-2/5 gap-4">
                <Image src={orderhistory} alt="Picture of the author" fill />
              </div>
              <Subtitle>Order History</Subtitle>
            </button>
          </div>
        );
      case "schedule":
        return (
          <div>
            <form
              className="flex-9 flex flex-col  gap-10"
              onSubmit={() => console.log("")}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <Text>Tweet ID</Text>
                  <TextInput
                    value={formData.id}
                    onChange={handleFormDataString}
                    required
                    name="id"
                  />
                </div>
                <div>
                  <Text>Tweet ID</Text>
                  <TextInput
                    value={formData.id}
                    onChange={handleFormDataString}
                    required
                    name="id"
                  />
                </div>

                <div>
                  <Text>Explanation</Text>
                  <TextInput
                    value={formData.explanation!.toString()}
                    onChange={handleFormDataString}
                    name="explanation"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  color="pink"
                  size="sm"
                  className="mr-4 font-[600]"
                  type="button"
                  variant="secondary"
                  onClick={() => setOperation("options")}
                >
                  Cancel
                </Button>
                <Button
                  color="pink"
                  size="sm"
                  className="font-[600]"
                  onClick={() => console.log("clicked")}
                >
                  Start Space
                </Button>
              </div>
            </form>
          </div>
        );
      case "order":
        return (
          <>
            <TextInput
              icon={MagnifyingGlassIcon}
              placeholder="Search by Space ID e.g0001234TEWE"
              className="mb-10 max-w-[40%] rounded-xl"
            />

            <div className="flex-9 flex flex-col  gap-4">
              <div className="flex rounded-xl bg-blue-500 p-4 text-center text-white">
                <div className="flex w-[12.5%] items-center justify-center">
                  <Bold>SPACE ID</Bold>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Bold> DATE & TIME ORDERED</Bold>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Bold>SPACE STATUS</Bold>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Bold> REMINDERS ORDERED</Bold>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Bold> CURRENT LISTENERS</Bold>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Bold> PENDING LISTENERS</Bold>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Bold> ENTRY RATE (LISTENERS)</Bold>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Bold> REPLAYS ORDERED</Bold>
                </div>
              </div>
              <div className="flex rounded-xl p-4 text-center text-white shadow">
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text>001245CF45AWE</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 03, MAY 2023 </Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text>Pending</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21S</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 321</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
              </div>
              <div className="flex rounded-xl p-4 text-center text-white shadow">
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text>001245CF45AWE</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 03, MAY 2023 </Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text>Pending</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21S</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 321</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
              </div>
              <div className="flex rounded-xl p-4 text-center text-white shadow">
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text>001245CF45AWE</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 03, MAY 2023 </Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text>Pending</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21S</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 321</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
              </div>
              <div className="flex rounded-xl p-4 text-center text-white shadow">
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text>001245CF45AWE</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 03, MAY 2023 </Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text>Pending</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21S</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 321</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
              </div>
              <div className="flex rounded-xl p-4 text-center text-white shadow">
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text>001245CF45AWE</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 03, MAY 2023 </Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text>Pending</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21S</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 321</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
                <div className="flex w-[12.5%] items-center justify-center">
                  <Text> 21</Text>
                </div>
              </div>
              <Pagination
                page={0}
                setActualPage={() => console.log(3)}
                totalPages={20}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-[100vh] w-full items-center justify-center bg-gray-600 bg-opacity-40">
      <div className="h-fit max-h-[80%] w-full max-w-screen-lg rounded-2xl bg-white p-10">
        <div className="mb-10 flex flex-1 items-center justify-between">
          <Metric>Schedule Twitter Space</Metric>

          <Icon
            size="lg"
            icon={XCircleIcon}
            className="cursor-pointer opacity-50 hover:opacity-100"
            color="gray"
            onClick={props.handleModal}
          />
        </div>

        {operationToRender()}
      </div>
    </div>
  );
};

export default CreateSpaceModal;
