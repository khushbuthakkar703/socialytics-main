import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  Icon,
  Subtitle,
  Text,
  TextInput,
  Title,
} from "@tremor/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { createCampaign } from "@/lib/api/client";

interface TwitterModalProps {
  title: string;
  handleModal: () => void;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SelectTypeButton = ({ formData, field, title, onChange }: any) => {
  return (
    <Button
      size="xs"
      variant="secondary"
      onClick={() => onChange({ ...formData, [field]: !formData[field] })}
      type={"button"}
      className={
        formData[field]
          ? "flex h-12 w-2/5 items-center rounded-3xl border-2 px-0"
          : "flex h-12 w-2/5 items-center rounded-3xl border-2 border-gray-500 text-gray-500 shadow-md" +
            " !focus:outline-none !outline-none"
      }
    >
      <span className="flex w-[200px] items-center justify-between  ">
        {formData[field] ? (
          <Icon
            size="lg"
            icon={CheckCircleIcon}
            className="cursor-pointer p-0"
            color="blue"
          />
        ) : (
          <div className="flex h-[28px] w-[28px] items-center justify-center">
            <div className="h-[23px] w-[23px] rounded-full border-[1px] border-gray-400"></div>
          </div>
        )}{" "}
        {title}
      </span>
    </Button>
  );
};

const DateFields = ({ days, months, years, handler, formdata }: any) => (
  <div>
    <Title>Campaign Start date</Title>
    <div className={"flex gap-4"}>
      <Dropdown
        className="flex-2 mt-2"
        onValueChange={(value) => handler(value, "month")}
        placeholder="Month"
        value={formdata.month ?? monthNames[new Date().getMonth()]}
      >
        {months.map((month: any) => (
          <DropdownItem value={month} text={month} key={month} />
        ))}
      </Dropdown>
      <Dropdown
        className="mt-2 flex-1"
        onValueChange={(value) => handler(value, "day")}
        placeholder="Day"
        value={formdata.day ?? new Date().getDate().toString()}
      >
        {days.map((day: any) => (
          <DropdownItem value={day} text={day} key={day} />
        ))}
      </Dropdown>
      <Dropdown
        className="mt-2 flex-1"
        onValueChange={(value) => handler(value, "year")}
        placeholder="Year"
        value={formdata.year ?? new Date().getFullYear().toString()}
      >
        {years.map((year: any) => (
          <DropdownItem value={year} text={year} key={year} />
        ))}
      </Dropdown>
    </div>
  </div>
);

const WordFields = ({ handlerObject }: any) => (
  <div>
    <Title>Words</Title>
    <TextInput
      placeholder="Exact match"
      required
      className="mb-2 mt-4"
      name={"exactMatch"}
      onChange={(e) => handlerObject(e, "words")}
    />
    <TextInput
      placeholder="Words"
      required
      className="mb-2"
      name={"words"}
      onChange={(e) => handlerObject(e, "words")}
    />
    <TextInput
      placeholder="Number of Comments per mention"
      className="mb-2"
      name={"comments"}
      onChange={(e) => handlerObject(e, "words")}
    />
  </div>
);

const AboutFields = ({ handlerText, handlerObject }: any) => (
  <>
    <div>
      <Title>What would you like the tweets to be about?</Title>
      <Subtitle>Please provide 2-3 examples</Subtitle>
      <TextInput
        required
        className="mb-2 mt-4"
        name={"about1"}
        onChange={(e) => handlerObject(e, "about")}
      />
      <TextInput
        required
        className="mb-2"
        name={"about2"}
        onChange={(e) => handlerObject(e, "about")}
      />
      <TextInput
        className="mb-2"
        name={"about3"}
        onChange={(e) => handlerObject(e, "about")}
      />
    </div>
    <div>
      <Title>How many tweets would you like per hour?</Title>
      <TextInput
        className="mb-2"
        name={"tweetsPerHour"}
        onChange={handlerText}
      />
    </div>
  </>
);

const NumberOfDaysField = ({ handler }: any) => (
  <div>
    <Title>Number of days</Title>
    <TextInput className="mb-2" name={"duration"} onChange={handler} />
  </div>
);

export const CreateCampaign: FC<TwitterModalProps> = (props) => {
  const [formData, setFormdata] = useState<any>({
    name: "",
    campaignName: "",
    organicTweet: false,
    scrap: false,
    month: monthNames[new Date().getMonth()],
    year: new Date().getFullYear().toString(),
    day: new Date().getDay().toString(),
    duration: "1",
    about: { about1: "", about2: "", about3: "" },
    words: { exactMatch: "", words: "", comments: "" },
    tweetsPerHour: "",
  });
  const [operation, setOperation] = useState(0);
  const [days, setDays] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const datesHandler = (value: string, field: string) => {
    setFormdata({
      ...formData,
      [field]: value,
    });
  };

  const handleFormDataObject = (e: any, field: string) => {
    setFormdata({
      ...formData,
      [field]: {
        ...formData[field],
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleFormDataString = (e: any) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createCampaign(formData);
      setFormdata({
        name: "",
        campaignName: "",
        organicTweet: false,
        scrap: false,
        month: monthNames[new Date().getMonth()],
        year: new Date().getFullYear().toString(),
        day: new Date().getDay().toString(),
        duration: "1",
        about: { about1: "", about2: "", about3: "" },
        words: { exactMatch: "", words: "", comments: "" },
        tweetsPerHour: "",
      });
      setSuccess(true);
    } catch (e) {
      console.log(e);
    }
  };

  const changeForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.scrap && formData.organicTweet) {
      setOperation(1);
    } else if (formData.scrap && formData.name) {
      setOperation(2);
    } else if (formData.organicTweet && formData.name) {
      setOperation(3);
    } else {
      return;
    }
  };

  useEffect(() => {
    setMonths(monthNames);

    const currentYear = new Date().getFullYear();
    const yearOptions = [];

    for (let year = currentYear; year <= currentYear + 10; year++) {
      yearOptions.push(year.toString());
    }

    setYears(yearOptions);
  }, []);

  useEffect(() => {
    function generateDayOptions() {
      const isLeap = (year: any) => new Date(year, 1, 29).getDate() === 29;
      const selectedMonth = monthNames.indexOf(formData.month);
      const selectedYear = parseInt(formData.year);
      let lastDay;
      console.log(selectedMonth, selectedYear);
      const dayOptions = [];

      if (selectedMonth === 1) {
        console.log("aca");
        console.log(isLeap(selectedYear), selectedYear);
        lastDay = isLeap(selectedYear) ? 29 : 28; // Febrero en un año bisiesto tiene 29 días
      } else {
        lastDay = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      }

      for (let day = 1; day <= lastDay; day++) {
        dayOptions.push(day.toString());
      }

      setDays(dayOptions);
    }
    generateDayOptions();
  }, [formData]);

  const renderForm = () => {
    if (operation === 0) {
      return (
        <>
          <div className="flex w-full flex-wrap gap-4">
            <div className="w-full">
              <Text className="text-xl">
                Campaign Name <span className="text-red-500">*</span>
              </Text>
              <TextInput
                value={formData.name}
                onChange={handleFormDataString}
                required
                name="name"
              />
            </div>
          </div>
          <div className="flex w-full flex-col flex-wrap gap-4">
            <Text className="text-xl">Campaign Type</Text>
            <SelectTypeButton
              formData={formData}
              field={"organicTweet"}
              onChange={setFormdata}
              title={"Organic Tweet"}
            />
            <SelectTypeButton
              formData={formData}
              field={"scrap"}
              onChange={setFormdata}
              title={"Scrape and Comment"}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              size="xs"
              color="pink"
              className="font-[600] disabled:cursor-not-allowed"
              disabled={
                ((!formData.scrap && !formData.organicTweet) ||
                  !formData.name) &&
                true
              }
            >
              Create a Campaign
            </Button>
          </div>
        </>
      );
    } else if (operation === 1) {
      return (
        <>
          <AboutFields
            handlerText={handleFormDataString}
            handlerObject={handleFormDataObject}
          />
          <Title>Scrap and Comment</Title>
          <WordFields handlerObject={handleFormDataObject} />
          <DateFields
            days={days}
            months={months}
            years={years}
            handler={datesHandler}
            formdata={formData}
          />
          <NumberOfDaysField handler={handleFormDataString} />
          <div className="flex justify-end gap-4">
            <Button
              color="pink"
              size="sm"
              className="mr-4 font-[600]"
              type="button"
              variant="secondary"
              onClick={() => setOperation(0)}
            >
              Cancel
            </Button>
            <Button color="pink" size="sm" className="font-[600]">
              Create Campaign
            </Button>
          </div>
        </>
      );
    } else if (operation === 2) {
      return (
        <>
          <WordFields handlerObject={handleFormDataObject} />
          <DateFields
            days={days}
            months={months}
            years={years}
            handler={datesHandler}
            formdata={formData}
          />
          <NumberOfDaysField handler={handleFormDataString} />
          <div className="flex justify-end gap-4">
            <Button
              color="pink"
              size="sm"
              className="mr-4 font-[600]"
              type="button"
              variant="secondary"
              onClick={() => setOperation(0)}
            >
              Cancel
            </Button>
            <Button color="pink" size="sm" className="font-[600]">
              Create Campaign
            </Button>
          </div>
        </>
      );
    } else if (operation === 3) {
      return (
        <>
          <AboutFields
            handlerText={handleFormDataString}
            handlerObject={handleFormDataObject}
          />
          <DateFields
            days={days}
            months={months}
            years={years}
            handler={datesHandler}
            formdata={formData}
          />
          <NumberOfDaysField handler={handleFormDataString} />
          <div className="flex justify-end gap-4">
            <Button
              color="pink"
              size="sm"
              className="mr-4 font-[600]"
              type="button"
              variant="secondary"
              onClick={() => setOperation(0)}
            >
              Cancel
            </Button>
            <Button color="pink" size="sm" className="font-[600]">
              Create Campaign
            </Button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex min-h-[100vh] w-full items-center justify-center scroll-auto bg-gray-600 bg-opacity-40">
      {!success ? (
        <div className="h-fit w-full max-w-screen-sm  rounded-2xl bg-white p-5">
          <div className="flex flex-1 justify-between">
            <Title className="text-xl font-extrabold font-extrabold">
              {operation === 0
                ? "Create a Campaign"
                : operation === 2
                ? "Scrape and Comment"
                : "Organic Tweet"}
            </Title>

            <Icon
              size="lg"
              icon={XCircleIcon}
              className="cursor-pointer opacity-50 hover:opacity-100"
              color="gray"
              onClick={props.handleModal}
            />
          </div>

          <form
            className="flex-9 flex flex-col  gap-4"
            onSubmit={operation === 0 ? changeForm : onSubmit}
          >
            {renderForm()}
          </form>
        </div>
      ) : (
        <div className="flex items-center gap-4 rounded-lg bg-blue-100 p-4">
          <div>
            <p className="text-2xl font-extrabold !text-green-500">Success!</p>
            <p className="font-light text-gray-600">
              Your Social Success manager has been notified of your request.
              They will contact you once your campaign is confirmed.
            </p>
          </div>
          <div className="tiems-center flex h-full justify-center">
            <Icon
              size="lg"
              icon={XCircleIcon}
              className="cursor-pointer opacity-50 hover:opacity-100"
              color="gray"
              onClick={props.handleModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;
