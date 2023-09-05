import React, { FC, useState } from "react";
import { TextInput, Title, Divider, Text, Icon, Button } from "@tremor/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { BoostedTweetInterface } from "@/lib/api/types";
import { addTweet } from "@/lib/api/client";
interface TwitterModalProps {
  title: string;
  handleModal: () => void;
}

export const TweetsModal: FC<TwitterModalProps> = (props) => {
  const [formData, setFormdata] = useState<BoostedTweetInterface>({
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addTweet(formData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] flex items-center justify-center bg-gray-600 bg-opacity-40 z-50">
      <div className="w-full h-fit max-w-screen-sm max-h-[80%] bg-white rounded-2xl p-10">
        <div className="flex-1 flex justify-between">
          <Title>Add tweet</Title>

          <Icon
            size="sm"
            icon={XMarkIcon}
            className="cursor-pointer"
            onClick={props.handleModal}
          />
        </div>
        <Divider />
        <form className="flex flex-col flex-9  gap-4" onSubmit={onSubmit}>
          <div className="flex flex-wrap gap-4">
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
              <Text>Comments</Text>
              <TextInput
                value={formData.comments.toString()}
                onChange={handleFormDataNumber}
                required
                name="comments"
              />
            </div>
            <div>
              <Text>Likes</Text>
              <TextInput
                required
                value={formData.likes.toString()}
                onChange={handleFormDataNumber}
                name="likes"
              />
            </div>
            <div>
              <Text>Retweets</Text>
              <TextInput
                required
                value={formData.retweets.toString()}
                onChange={handleFormDataNumber}
                name="retweets"
              />
            </div>
            <div>
              <Text>Impressions</Text>
              <TextInput
                value={formData!.impressions!.toString()}
                onChange={handleFormDataNumber}
                name="impressions"
              />
            </div>
            <div>
              <Text>Video Views</Text>
              <TextInput
                value={formData.videoViews!.toString()}
                onChange={handleFormDataNumber}
                name="videoViews"
              />
            </div>
            <div>
              <Text>Initial Percent</Text>
              <TextInput
                value={formData.initialPercent!.toString()}
                onChange={handleFormDataNumber}
                name="initialPercent"
              />
            </div>
            <div>
              <Text>Drip Minutes</Text>
              <TextInput
                value={formData.dripMinutes!.toString()}
                onChange={handleFormDataNumber}
                name="dripMinutes"
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
              size="xs"
              type="button"
              variant="secondary"
              onClick={() => console.log("clicked")}
            >
              Cancel
            </Button>
            <Button size="xs" onClick={() => console.log("clicked")}>
              Add Tweet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetsModal;
