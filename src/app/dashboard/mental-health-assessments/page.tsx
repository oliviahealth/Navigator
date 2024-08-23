'use client';

import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";
import useDukeUniversityReligionIndex from "./duke-university-religion-index/submissions";
import useEdinburgPostnatalDepressionScale from "./edinburg-postnatal-depression-scale/submissions";
import useGeneralizedAnxietyDisorder from "./generalized-anxiety-disorder/submissions";
import useMentalHealthHistory from "./mental-health-history/submissions";
import usePercievedStressScale from "./perceived-stress-scale/submissions";
import { dukeLabelMapping } from "./duke-university-religion-index/definitions";
import { edinburgLabelMapping } from "./edinburg-postnatal-depression-scale/definitions";
import { generalizedAnxietyLabelMapping } from "./generalized-anxiety-disorder/definitions";
import { options } from "./perceived-stress-scale/definitions";

type MentalHealthHistoryItem = {
  diagnosis: string;
  date: Date | string;
  provider: string;
  providerPhone: string;
};

const Tab: React.FC = () => {
  const {
    dukeUniversityReligionIndexSubmissions,
    selectedDukeUniversityReligionIndexSubmission,
    handleDukeUniversityReligionIndexDelete,
    handleDukeUniversityReligionIndexSubmissionSelect
  } = useDukeUniversityReligionIndex();

  const {
    edinburgPostnatalDepressionScaleSubmission,
    selectedEdinburgPostnatalDepressionScaleSubmission,
    handleEdinburgPostnatalDepressionScaleDelete,
    handleEdinburgPostnatalDepressionScaleSelect
  } = useEdinburgPostnatalDepressionScale();

  const {
    generalizedAnxietyDisorderSubmission,
    selectedGeneralizedAnxietyDisorderSubmission,
    handleGeneralizedAnxietyDisorderDelete,
    handleGeneralizedAnxietyDisorderSelect
  } = useGeneralizedAnxietyDisorder();
  
  const {
    mentalHealthHistorySubmissions,
    selectedMentalHealthHistorySubmissions,
    handleMentalHealthHistorySubmissionDelete,
    handleMentalHealthHistorySubmissionSelect
  } = useMentalHealthHistory();

  const {
    percievedStressScaleSubmissions,
    selectedPercievedStressScale,
    handlePercievedStressScaleDelete,
    handlePercievedStressScaleSubmissionSelect
  } = usePercievedStressScale();

  return (
    <div className="flex flex-col">
      <Accordion title="Duke University Religion Index">
        {selectedDukeUniversityReligionIndexSubmission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bento-inner">
              <p><strong>Church Attendence:</strong> {dukeLabelMapping.churchAttendance[selectedDukeUniversityReligionIndexSubmission.churchAttendance as keyof typeof dukeLabelMapping.churchAttendance]}</p>
              <p><strong>Time Spent Religiously:</strong> {dukeLabelMapping.timeSpentReligiously[selectedDukeUniversityReligionIndexSubmission.timeSpentReligiously as keyof typeof dukeLabelMapping.timeSpentReligiously]}</p>
              <p><strong>Divine Experience:</strong> {dukeLabelMapping.truthLevel[selectedDukeUniversityReligionIndexSubmission.divineExperience as keyof typeof dukeLabelMapping.truthLevel]}</p>
              <p><strong>Belief Life Influence:</strong> {dukeLabelMapping.truthLevel[selectedDukeUniversityReligionIndexSubmission.religiousIntegrationEffort as keyof typeof dukeLabelMapping.truthLevel]}</p>
              <p><strong>Religious Integration Effort:</strong> {dukeLabelMapping.truthLevel[selectedDukeUniversityReligionIndexSubmission.religiousIntegrationEffort as keyof typeof dukeLabelMapping.truthLevel]}</p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/mental-health-assessments/duke-university-religion-index/"
          submissions={dukeUniversityReligionIndexSubmissions}
          onDelete={handleDukeUniversityReligionIndexDelete}
          onSubmissionSelect={handleDukeUniversityReligionIndexSubmissionSelect} 
        />
      </Accordion>

      <Accordion title="Edinburg Postnatal Depression Scale">
        {selectedEdinburgPostnatalDepressionScaleSubmission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bento-inner">
              <p><strong>Laugh:</strong> {edinburgLabelMapping.laugh[selectedEdinburgPostnatalDepressionScaleSubmission.laugh as keyof typeof edinburgLabelMapping.laugh]}</p>
              <p><strong>Enjoyment:</strong> {edinburgLabelMapping.enjoyment[selectedEdinburgPostnatalDepressionScaleSubmission.enjoyment as keyof typeof edinburgLabelMapping.enjoyment]}</p>
              <p><strong>Self Blame:</strong> {edinburgLabelMapping.selfBlame[selectedEdinburgPostnatalDepressionScaleSubmission.selfBlame as keyof typeof edinburgLabelMapping.selfBlame]}</p>
              <p><strong>Anxiety:</strong> {edinburgLabelMapping.anxiety[selectedEdinburgPostnatalDepressionScaleSubmission.anxiety as keyof typeof edinburgLabelMapping.anxiety]}</p>
              <p><strong>Scared:</strong> {edinburgLabelMapping.scared[selectedEdinburgPostnatalDepressionScaleSubmission.scared as keyof typeof edinburgLabelMapping.scared]}</p>
              <p><strong>Cope Inability:</strong> {edinburgLabelMapping.copeInability[selectedEdinburgPostnatalDepressionScaleSubmission.copeInability as keyof typeof edinburgLabelMapping.copeInability]}</p>
              <p><strong>Difficulty Sleeping:</strong> {edinburgLabelMapping.difficultySleeping[selectedEdinburgPostnatalDepressionScaleSubmission.difficultySleeping as keyof typeof edinburgLabelMapping.difficultySleeping]}</p>
              <p><strong>Sadness:</strong> {edinburgLabelMapping.sadness[selectedEdinburgPostnatalDepressionScaleSubmission.sadness as keyof typeof edinburgLabelMapping.sadness]}</p>
              <p><strong>Crying:</strong> {edinburgLabelMapping.crying[selectedEdinburgPostnatalDepressionScaleSubmission.crying as keyof typeof edinburgLabelMapping.crying]}</p>
              <p><strong>Scared:</strong> {edinburgLabelMapping.scared[selectedEdinburgPostnatalDepressionScaleSubmission.scared as keyof typeof edinburgLabelMapping.scared]}</p>
              <p><strong>Self Harm Thoughts:</strong> {edinburgLabelMapping.selfHarmThoughts[selectedEdinburgPostnatalDepressionScaleSubmission.selfHarmThoughts as keyof typeof edinburgLabelMapping.selfHarmThoughts]}</p>
              <p><strong>Participant Name:</strong> {selectedEdinburgPostnatalDepressionScaleSubmission.participantName}</p>
              <p><strong>Case ID:</strong> {selectedEdinburgPostnatalDepressionScaleSubmission.caseId}</p>
              <p><strong>Date Completed:</strong> {new Date(selectedEdinburgPostnatalDepressionScaleSubmission.dateCompleted).toLocaleString()}</p>
              <p><strong>Staff Name:</strong> {selectedEdinburgPostnatalDepressionScaleSubmission.staffName}</p>
              <p><strong>Timeframe:</strong> {edinburgLabelMapping.timeframe[selectedEdinburgPostnatalDepressionScaleSubmission.timeframe as keyof typeof edinburgLabelMapping.timeframe]}</p>
              <p><strong>Total Score:</strong> {selectedEdinburgPostnatalDepressionScaleSubmission.totalScore}</p>
              <p><strong>Notes:</strong> {selectedEdinburgPostnatalDepressionScaleSubmission.notes}</p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/mental-health-assessments/edinburg-postnatal-depression-scale/"
          submissions={edinburgPostnatalDepressionScaleSubmission}
          onDelete={handleEdinburgPostnatalDepressionScaleDelete}
          onSubmissionSelect={handleEdinburgPostnatalDepressionScaleSelect} 
        />
      </Accordion>

      <Accordion title="Generalized Anxiety Disorder">
        {selectedGeneralizedAnxietyDisorderSubmission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bento-inner">
              <p><strong>Feeling Nervous:</strong> {generalizedAnxietyLabelMapping.answers[selectedGeneralizedAnxietyDisorderSubmission.feelingNervous as keyof typeof generalizedAnxietyLabelMapping.answers]}</p>
              <p><strong>Unable to Control Worrying:</strong> {generalizedAnxietyLabelMapping.answers[selectedGeneralizedAnxietyDisorderSubmission.unableToControlWorrying as keyof typeof generalizedAnxietyLabelMapping.answers]}</p>
              <p><strong>Worrying too Much:</strong> {generalizedAnxietyLabelMapping.answers[selectedGeneralizedAnxietyDisorderSubmission.worryingTooMuch as keyof typeof generalizedAnxietyLabelMapping.answers]}</p>
              <p><strong>Trouble Relaxing:</strong> {generalizedAnxietyLabelMapping.answers[selectedGeneralizedAnxietyDisorderSubmission.troubleRelaxing as keyof typeof generalizedAnxietyLabelMapping.answers]}</p>
              <p><strong>Restlessness:</strong> {generalizedAnxietyLabelMapping.answers[selectedGeneralizedAnxietyDisorderSubmission.restlessness as keyof typeof generalizedAnxietyLabelMapping.answers]}</p>
              <p><strong>Easily Annoyed:</strong> {generalizedAnxietyLabelMapping.answers[selectedGeneralizedAnxietyDisorderSubmission.easilyAnnoyed as keyof typeof generalizedAnxietyLabelMapping.answers]}</p>
              <p><strong>Feeling Afraid:</strong> {generalizedAnxietyLabelMapping.answers[selectedGeneralizedAnxietyDisorderSubmission.feelingAfraid as keyof typeof generalizedAnxietyLabelMapping.answers]}</p>
              <p><strong>Difficulty with Problems:</strong> {generalizedAnxietyLabelMapping.difficulty[selectedGeneralizedAnxietyDisorderSubmission.problemsDifficulty as keyof typeof generalizedAnxietyLabelMapping.difficulty]}</p>
              <p><strong>Total Score:</strong> {selectedGeneralizedAnxietyDisorderSubmission.totalScore}</p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/mental-health-assessments/generalized-anxiety-disorder/"
          submissions={generalizedAnxietyDisorderSubmission}
          onDelete={handleGeneralizedAnxietyDisorderDelete}
          onSubmissionSelect={handleGeneralizedAnxietyDisorderSelect} 
        />
      </Accordion>

      <Accordion title="Mental Health History">
        {selectedMentalHealthHistorySubmissions && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bento-inner">
              <h3>Mental Health History:</h3>
              {selectedMentalHealthHistorySubmissions.mentalHealthHistory.map((history: MentalHealthHistoryItem, index: number) => (
                <div key={index} className="mb-4">
                  <p><strong>Diagnosis:</strong> {history.diagnosis}</p>
                  <p><strong>Date:</strong> {history.date instanceof Date ? history.date.toLocaleDateString() : history.date}</p>
                  <p><strong>Provider:</strong> {history.provider}</p>
                  <p><strong>Provider Phone:</strong> {history.providerPhone}</p>
                </div>
              ))}

              <p><strong>Taking Medication:</strong> {selectedMentalHealthHistorySubmissions.takingMedication}</p>

              {selectedMentalHealthHistorySubmissions.medicationDetails && (
                <p><strong>Medication Details:</strong> {selectedMentalHealthHistorySubmissions.medicationDetails}</p>
              )}

              {selectedMentalHealthHistorySubmissions.notes && (
                <p><strong>Notes:</strong> {selectedMentalHealthHistorySubmissions.notes}</p>
              )}

              <p><strong>Label:</strong> {selectedMentalHealthHistorySubmissions.label}</p>
              <p><strong>Staff Notes:</strong> {selectedMentalHealthHistorySubmissions.staffNotes}</p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/mental-health-assessments/mental-health-history/"
          submissions={mentalHealthHistorySubmissions}
          onDelete={handleMentalHealthHistorySubmissionDelete}
          onSubmissionSelect={handleMentalHealthHistorySubmissionSelect}
        />
      </Accordion>

      <Accordion title="Perceived Stress Scale">
        {selectedPercievedStressScale && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bento-inner">
              <p><strong>Upset Unexpectedly:</strong> {options[options.indexOf(selectedPercievedStressScale.upsetUnexpectedly)]}</p>
              <p><strong>Unable to Control Important Things:</strong> {options[options.indexOf(selectedPercievedStressScale.unableControlImportant)]}</p>
              <p><strong>Nervous and Stressed:</strong> {options[options.indexOf(selectedPercievedStressScale.nervousAndStressed)]}</p>
              <p><strong>Handle Problems Confidently:</strong> {options[options.indexOf(selectedPercievedStressScale.handleProblemsConfidently)]}</p>
              <p><strong>Things Going Your Way:</strong> {options[options.indexOf(selectedPercievedStressScale.thingsGoingWay)]}</p>
              <p><strong>Inability to Cope:</strong> {options[options.indexOf(selectedPercievedStressScale.copeInability)]}</p>
              <p><strong>Control Irritations:</strong> {options[options.indexOf(selectedPercievedStressScale.controlIrritations)]}</p>
              <p><strong>On Top of Things:</strong> {options[options.indexOf(selectedPercievedStressScale.onTopOfThings)]}</p>
              <p><strong>Angered by Things Outside Control:</strong> {options[options.indexOf(selectedPercievedStressScale.angeredOutsideControl)]}</p>
              <p><strong>Difficulties Piling Up:</strong> {options[options.indexOf(selectedPercievedStressScale.difficultiesPilingUp)]}</p>
              <p><strong>Total Score:</strong> {selectedPercievedStressScale.totalScore}</p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/mental-health-assessments/perceived-stress-scale/"
          submissions={percievedStressScaleSubmissions}
          onDelete={handlePercievedStressScaleDelete}
          onSubmissionSelect={handlePercievedStressScaleSubmissionSelect}
        />
      </Accordion>
    </div>
  );
};

export default Tab;
