import Accordion from "@/components/dashboard/Accordion";
import Submissions from "@/components/dashboard/Submissions";

const Tab: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Accordion title="Form name">
        Tab content
        <Submissions></Submissions>
      </Accordion>
    </div>
  );
};

export default Tab;
