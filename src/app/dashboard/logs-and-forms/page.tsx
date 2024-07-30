import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";

const Tab: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Accordion title="Form name">
        Tab content
        <Submission></Submission>
      </Accordion>
    </div>
  );
};

export default Tab;
