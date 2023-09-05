import { useState } from "react";
import { useTheme } from "next-themes";
import { useStytchB2BClient, useStytchMember } from "@stytch/nextjs/dist/b2b";
import { StytchB2BHeadlessClient } from "@stytch/vanilla-js/dist/b2b";
import { SectionHeader } from "./SectionHeader";
import { ThemeButton } from "./ThemeButton";
import { Button } from "@tremor/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Select } from "./Select";
import TweetsModal from "@/components/DashboardV2/TweetsModal";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import CreateSpaceModal from "@/components/DashboardV2/CreateSpace";
import CreateCampaign from "@/components/DashboardV2/CreateCampaign";

interface TopNavigationProps {
  profileData: any;
  title?: string;
  download?: boolean;
}

export default function TopNavigation({
  profileData,
  title = "Growth Dashboard",
  download,
}: TopNavigationProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModaSchedulelOpen, setIsModaSchedulelOpen] = useState(false);
  const [isModalSpaceOpen, setIsModalSpaceOpen] = useState(false);
  const user = useStytchMember();

  const stytch = useStytchB2BClient() as StytchB2BHeadlessClient;

  const handleOption = (isOpen: boolean) => {
    setIsOpen(!isOpen);
  };

  const handleModal = () => setIsModalOpen(!isModalOpen);
  const handleModalSchedule = () =>
    setIsModaSchedulelOpen(!isModaSchedulelOpen);

  const handleModalSpace = () => setIsModalSpaceOpen(!isModalSpaceOpen);

  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  const downloadPDF = () => {
    const input = document.getElementById("dashboard");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pageWidth = imgWidth;
        const pageHeight = Math.min(imgHeight, 14400); // jsPDF has a max height of 14400 pixels.

        const totalPages = Math.ceil(imgHeight / pageHeight);

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [pageWidth, pageHeight],
        });

        for (let i = 0; i < totalPages; i++) {
          if (i !== 0) {
            pdf.addPage([pageWidth, pageHeight], "portrait");
          }

          const srcY = i * pageHeight;
          const sHeight = Math.min(pageHeight, imgHeight - srcY);
          const canvasPiece = document.createElement("canvas");
          canvasPiece.width = imgWidth;
          canvasPiece.height = sHeight;
          const ctxPiece = canvasPiece.getContext("2d");
          ctxPiece!.drawImage(
            canvas,
            0,
            srcY,
            imgWidth,
            sHeight,
            0,
            0,
            imgWidth,
            sHeight
          );
          const imgDataPiece = canvasPiece.toDataURL("image/png");
          pdf.addImage(imgDataPiece, "PNG", 0, 0, pageWidth, pageHeight);
        }

        pdf.save("download.pdf");
      });
    }
  };
  return (
    <>
      <nav className="w-full rounded border-gray-200 pb-2 pt-2.5">
        <div className="flex flex-wrap items-center justify-between w-full mb-4 gap-x-10 gap-y-5 lg:flex-nowrap">
          <div className="grid items-center w-full grid-cols-1">
            <span className="swhitespace-nowrap w-full whitespace-pre-wrap text-[24px] font-[500] text-black dark:text-white sm:text-[36px]">
              {title}
            </span>
            <div className="flex items-center gap-4 my-4 ">
              <Button
                variant="secondary"
                icon={PlusIcon}
                iconPosition="right"
                color="pink"
                size="xs"
                className="mr-2"
                onClick={handleModal}
              >
                Add Tweet
              </Button>
              <Button
                variant="secondary"
                color="pink"
                size="xs"
                iconPosition="right"
                onClick={handleModalSpace}
              >
                Create Campaign
              </Button>
              {/* <Button
                variant="secondary"
                color="pink"
                size="xs"
                iconPosition="right"
                onClick={handleModalSchedule}
              >
                Schedule Twitter Space
              </Button> */}
            </div>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 ml-auto text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={() => handleOption(isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? "flex" : "hidden md:flex"
            } w-full flex-wrap items-center justify-end sm:flex-nowrap`}
          >
            <ThemeButton
              theme={theme}
              setTheme={setTheme}
              currentTheme={currentTheme}
              className="max-w-[25px]"
            />
            <Button
              color="pink"
              size="sm"
              className="mr-4 font-[600]"
              onClick={downloadPDF}
              disabled={!download}
            >
              Generate Report
            </Button>
            <Select placeholder="@VenomFoundation" />
          </div>
        </div>

        <SectionHeader />
      </nav>
      {isModalOpen && <TweetsModal title={"sdf"} handleModal={handleModal} />}
      {isModaSchedulelOpen && (
        <CreateSpaceModal handleModal={handleModalSchedule} />
      )}
      {isModalSpaceOpen && (
        <CreateCampaign title={"sdf"} handleModal={handleModalSpace} />
      )}
    </>
  );
}
