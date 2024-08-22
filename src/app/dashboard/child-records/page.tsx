"use client";

import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";
import useASQ3 from "./asq-3/submissions";
import useBriefChildWellnessUpdate from "./brief-child-wellness-update/submissions";
import useDeliveryHistoryInformationForm from "./delivery-history-information-form/submissions";
import useInfancyQuestionnaire from "./infancy-questionnaire/submissions";
import usePerceivedMaternalPlanningSelfEfficacyTool from "./perceived-maternal-parenting-self-efficacy-tool/submissions";

const Tab: React.FC = () => {
  const {
    aSQ3Submissions,
    selectedASQ3Submission,
    handleASQ3Delete,
    handleASQ3SubmissionSelect,
  } = useASQ3();

  const {
    briefChildWellnessUpdateSubmissions,
    selectedBriefChildWellnessUpdateSubmission,
    handleBriefChildWellnessUpdateDelete,
    handleBriefChildWellnessUpdateSubmissionSelect,
  } = useBriefChildWellnessUpdate();

  const {
    deliveryHistoryInformationSubmissions,
    selectedDeliveryHistoryInformationSubmission,
    handleDeliveryHistoryInformationDelete,
    handleDeliveryHistoryInformationSubmissionSelect,
  } = useDeliveryHistoryInformationForm();

  const {
    infancyQuestionnaireSubmissions,
    selectedInfancyQuestionnaireSubmission,
    handleInfancyQuestionnaireDelete,
    handleInfancyQuestionnaireSubmissionSelect,
  } = useInfancyQuestionnaire();

  const {
    perceivedMaternalPlanningSelfEfficacyToolSubmissions,
    selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission,
    handlePerceievedMaternalPlanningSelfEfficacyToolDelete,
    handlePerceievedMaternalPlanningSelfEfficacyToolSubmissionSelect,
  } = usePerceivedMaternalPlanningSelfEfficacyTool();

  return (
    <div className="flex flex-col">
      <Accordion title="ASQ-3 Screening">
        {selectedASQ3Submission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">General Information</h2>
              <p>
                <strong>Participant Name:</strong>{" "}
                {selectedASQ3Submission.participantName}
              </p>
              <p>
                <strong>Case ID:</strong> {selectedASQ3Submission.caseId}
              </p>
              <p>
                <strong>Date Completed:</strong>{" "}
                {new Date(
                  selectedASQ3Submission.dateCompleted
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Staff Name:</strong> {selectedASQ3Submission.staffName}
              </p>
              <p>
                <strong>Child Name:</strong> {selectedASQ3Submission.childName}
              </p>
              <p>
                <strong>Questionnaire Used:</strong>{" "}
                {selectedASQ3Submission.questionnaireUsed}
              </p>
              <p>
                <strong>Age Adjusted:</strong>{" "}
                {selectedASQ3Submission.ageAdjusted ? "Yes" : "No"}
              </p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Screening Results</h2>
              <p>
                <strong>Communication Score:</strong>{" "}
                {selectedASQ3Submission.communicationScoreNotRecorded
                  ? "Not Recorded"
                  : selectedASQ3Submission.communicationScore}
              </p>
              <p>
                <strong>Gross Motor Score:</strong>{" "}
                {selectedASQ3Submission.grossMotorScoreNotRecorded
                  ? "Not Recorded"
                  : selectedASQ3Submission.grossMotorScore}
              </p>
              <p>
                <strong>Fine Motor Score:</strong>{" "}
                {selectedASQ3Submission.fineMotorScoreNotRecorded
                  ? "Not Recorded"
                  : selectedASQ3Submission.fineMotorScore}
              </p>
              <p>
                <strong>Problem Solving Score:</strong>{" "}
                {selectedASQ3Submission.problemSolvingScoreNotRecorded
                  ? "Not Recorded"
                  : selectedASQ3Submission.problemSolvingScore}
              </p>
              <p>
                <strong>Personal-Social Score:</strong>{" "}
                {selectedASQ3Submission.personalSocialScoreNotRecorded
                  ? "Not Recorded"
                  : selectedASQ3Submission.personalSocialScore}
              </p>
              <p>
                <strong>Follow Up Action:</strong>{" "}
                {selectedASQ3Submission.followUpAction.join(", ")}
              </p>
              <p>
                <strong>Activities Provided:</strong>{" "}
                {selectedASQ3Submission.describeActivitiesProvided || "N/A"}
              </p>
            </div>
            <div className="border p-4 rounded-md col-span-2">
              <h2 className="font-bold">Submission Details</h2>
              <p>
                <strong>Label:</strong> {selectedASQ3Submission.label}
              </p>
              <p>
                <strong>Staff Notes:</strong>{" "}
                {selectedASQ3Submission.staffNotes}
              </p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/child-records/asq-3/"
          submissions={aSQ3Submissions}
          onDelete={handleASQ3Delete}
          onSubmissionSelect={handleASQ3SubmissionSelect}
        />
      </Accordion>
      <Accordion title="Brief Child Wellness Update">
        {selectedBriefChildWellnessUpdateSubmission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">General Information</h2>
              <p>
                <strong>Child Name:</strong>{" "}
                {selectedBriefChildWellnessUpdateSubmission.childName}
              </p>
              <p>
                <strong>Date Completed:</strong>{" "}
                {new Date(
                  selectedBriefChildWellnessUpdateSubmission.dateCompleted
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Timeframe:</strong>{" "}
                {selectedBriefChildWellnessUpdateSubmission.timeframe}
              </p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Health Information</h2>
              <p>
                <strong>Health Insurance:</strong>{" "}
                {selectedBriefChildWellnessUpdateSubmission.healthInsurance}
              </p>
              {selectedBriefChildWellnessUpdateSubmission.otherHealthInsurance && (
                <p>
                  <strong>Other Health Insurance:</strong>{" "}
                  {
                    selectedBriefChildWellnessUpdateSubmission.otherHealthInsurance
                  }
                </p>
              )}
              <p>
                <strong>Medical Care:</strong>{" "}
                {selectedBriefChildWellnessUpdateSubmission.medicalCare}
              </p>
              {selectedBriefChildWellnessUpdateSubmission.otherMedicalCare && (
                <p>
                  <strong>Other Medical Care:</strong>{" "}
                  {selectedBriefChildWellnessUpdateSubmission.otherMedicalCare}
                </p>
              )}
              <p>
                <strong>Has Dental Care:</strong>{" "}
                {selectedBriefChildWellnessUpdateSubmission.hasDentalCare}
              </p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Reading Information</h2>
              <p>
                <strong>Reading Frequency:</strong>{" "}
                {selectedBriefChildWellnessUpdateSubmission.readingFrequency}
              </p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Submission Details</h2>
              <p>
                <strong>Label:</strong>{" "}
                {selectedBriefChildWellnessUpdateSubmission.label}
              </p>
              <p>
                <strong>Staff Notes:</strong>{" "}
                {selectedBriefChildWellnessUpdateSubmission.staffNotes}
              </p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/child-records/brief-child-wellness-update/"
          submissions={briefChildWellnessUpdateSubmissions}
          onDelete={handleBriefChildWellnessUpdateDelete}
          onSubmissionSelect={handleBriefChildWellnessUpdateSubmissionSelect}
        />
      </Accordion>
      <Accordion title="Delivery History Information Form">
        {selectedDeliveryHistoryInformationSubmission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">General Information</h2>
              <p>
                <strong>Participant Name:</strong>{" "}
                {selectedDeliveryHistoryInformationSubmission.participantName}
              </p>
              <p>
                <strong>Case ID:</strong>{" "}
                {selectedDeliveryHistoryInformationSubmission.caseId}
              </p>
              <p>
                <strong>Date Completed:</strong>{" "}
                {new Date(
                  selectedDeliveryHistoryInformationSubmission.dateCompleted
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Staff Name:</strong>{" "}
                {selectedDeliveryHistoryInformationSubmission.staffName}
              </p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Delivery Information</h2>
              {selectedDeliveryHistoryInformationSubmission.deliveries.map(
                (delivery: any, index: number) => (
                  <div key={index} className="mb-2">
                    <h3 className="font-semibold">Delivery {index + 1}</h3>
                    <p>
                      <strong>Estimated Delivery Date:</strong>{" "}
                      {new Date(
                        delivery.estimatedDeliveryDate
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Actual Delivery Date:</strong>{" "}
                      {new Date(
                        delivery.actualDeliveryDate
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Delivery Resulted in Birth:</strong>{" "}
                      {delivery.deliveryResultInBirth}
                    </p>
                    <p>
                      <strong>Enrolled as Target Child:</strong>{" "}
                      {delivery.enrolledAsTargetChild || "N/A"}
                    </p>
                  </div>
                )
              )}
            </div>
            <div className="border p-4 rounded-md col-span-2">
              <h2 className="font-bold">Submission Details</h2>
              <p>
                <strong>Label:</strong>{" "}
                {selectedDeliveryHistoryInformationSubmission.label}
              </p>
              <p>
                <strong>Staff Notes:</strong>{" "}
                {selectedDeliveryHistoryInformationSubmission.staffNotes}
              </p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/child-records/delivery-history-information-form/"
          submissions={deliveryHistoryInformationSubmissions}
          onDelete={handleDeliveryHistoryInformationDelete}
          onSubmissionSelect={handleDeliveryHistoryInformationSubmissionSelect}
        />
      </Accordion>
      <Accordion title="Infancy Questionnaire">
        {selectedInfancyQuestionnaireSubmission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">General Information</h2>
              <p>
                <strong>Participant Name:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.participantName}
              </p>
              <p>
                <strong>Child Name:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.childName}
              </p>
              <p>
                <strong>Case ID:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.caseId}
              </p>
              <p>
                <strong>Date Completed:</strong>{" "}
                {new Date(
                  selectedInfancyQuestionnaireSubmission.dateCompleted
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Staff Name:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.staffName}
              </p>
              <p>
                <strong>Timeframe:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.timeframe}
              </p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Sleep Information</h2>
              <p>
                <strong>Sleeps on Back:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.sleepOnBack}
              </p>
              <p>
                <strong>Sleeps Alone:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.sleepAlone}
              </p>
              <p>
                <strong>Sleeps Without Soft Bedding:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.sleepWithoutSoftBedding}
              </p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Development Information</h2>
              <p>
                <strong>Storytelling Frequency:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.storytellingFrequency}
              </p>
              <p>
                <strong>Is Biological Mother:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.isBiologicalMother}
              </p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Postpartum Information</h2>
              <p>
                <strong>Attended Postpartum Visit:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.attendedPostpartumVisit ||
                  "N/A"}
              </p>
              {selectedInfancyQuestionnaireSubmission.postpartumVisitDate && (
                <p>
                  <strong>Postpartum Visit Date:</strong>{" "}
                  {new Date(
                    selectedInfancyQuestionnaireSubmission.postpartumVisitDate
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Breastfeeding Information</h2>
              <p>
                <strong>Had Breast Milk:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.hadBreastMilk || "N/A"}
              </p>
              <p>
                <strong>Breast Milk at 2 Months:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.breastMilkAtTwoMonths ||
                  "N/A"}
              </p>
              <p>
                <strong>Breast Milk at 6 Months:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.breastMilkAtSixMonths ||
                  "N/A"}
              </p>
              <p>
                <strong>Mother Could Not Breastfeed:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.motherCouldNotBreastfeed ||
                  "N/A"}
              </p>
            </div>
            <div className="border p-4 rounded-md col-span-2">
              <h2 className="font-bold">Submission Details</h2>
              <p>
                <strong>Label:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.label}
              </p>
              <p>
                <strong>Staff Notes:</strong>{" "}
                {selectedInfancyQuestionnaireSubmission.staffNotes}
              </p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/child-records/infancy-questionnaire/"
          submissions={infancyQuestionnaireSubmissions}
          onDelete={handleInfancyQuestionnaireDelete}
          onSubmissionSelect={handleInfancyQuestionnaireSubmissionSelect}
        />
      </Accordion>
      <Accordion title="Perceived Maternal Planning Self-Efficacy Tool">
        {selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">General Information</h2>
              <p>
                <strong>Participant Name:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.participantName
                }
              </p>
              <p>
                <strong>Case ID:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.caseId
                }
              </p>
              <p>
                <strong>Date Completed:</strong>{" "}
                {new Date(
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.dateCompleted
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Staff Name:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.staffName
                }
              </p>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="font-bold">Self-Efficacy Information</h2>
              <p>
                <strong>Keeping Baby Occupied:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.keepingBabyOccupied
                }
              </p>
              <p>
                <strong>Feeding Baby:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.feedingBaby
                }
              </p>
              <p>
                <strong>Changing Baby:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.changingBaby
                }
              </p>
              <p>
                <strong>Bathing Baby:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.bathingBaby
                }
              </p>
              <p>
                <strong>Making Baby Happy:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.makingBabyHappy
                }
              </p>
              <p>
                <strong>Calming Crying Baby:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.calmingCryingBaby
                }
              </p>
              <p>
                <strong>Soothing Upset Baby:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.soothingUpsetBaby
                }
              </p>
              <p>
                <strong>Soothing Fussy Baby:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.soothingFussyBaby
                }
              </p>
              <p>
                <strong>Soothing Crying Baby:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.soothingCryingBaby
                }
              </p>
              <p>
                <strong>Soothing Restless Baby:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.soothingRestlessBaby
                }
              </p>
              <p>
                <strong>Getting Baby's Attention:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.gettingBabiesAttention
                }
              </p>
              <p>
                <strong>Recognizing Tiredness:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.recognizingTiredness
                }
              </p>
              <p>
                <strong>Having Control Over Baby:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.havingControlOverBaby
                }
              </p>
              <p>
                <strong>Recognizing Sickness:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.recognizingSickness
                }
              </p>
              <p>
                <strong>Reading Baby's Cues:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.readingBabysCues
                }
              </p>
              <p>
                <strong>Understanding Baby's Wants:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.understandingBabyWants
                }
              </p>
              <p>
                <strong>Knowing Disliked Activities:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.knowingDislikedActivities
                }
              </p>
              <p>
                <strong>Baby Responds Well:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.babyRespondsWell
                }
              </p>
              <p>
                <strong>Good Interaction:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.goodInteraction
                }
              </p>
              <p>
                <strong>Showing Affection:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.showingAffection
                }
              </p>
            </div>
            <div className="border p-4 rounded-md col-span-2">
              <h2 className="font-bold">Submission Details</h2>
              <p>
                <strong>Label:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.label
                }
              </p>
              <p>
                <strong>Staff Notes:</strong>{" "}
                {
                  selectedPerceievedMaternalPlanningSelfEfficacyToolSubmission.staffNotes
                }
              </p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/child-records/perceived-maternal-parenting-self-efficacy-tool/"
          submissions={perceivedMaternalPlanningSelfEfficacyToolSubmissions}
          onDelete={handlePerceievedMaternalPlanningSelfEfficacyToolDelete}
          onSubmissionSelect={
            handlePerceievedMaternalPlanningSelfEfficacyToolSubmissionSelect
          }
        />
      </Accordion>
    </div>
  );
};

export default Tab;
