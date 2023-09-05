import { Dashboard } from "@/components/DashboardV2/Dashboard";
import Layout from "@/components/DashboardV2/Layout";
import { useState } from "react";

export default function IndexPage() {
  const [downloadReport, setDownloadReport] = useState(false);
  const handleDownload = () => setDownloadReport(true);
  return (
    <Layout download={downloadReport}>
      <Dashboard enableReport={handleDownload} />
    </Layout>
  );
}
