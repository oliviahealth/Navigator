"use client";

import Accordion from "@/components/dashboard/Accordion";
import Submission from "@/components/dashboard/Submission";
import useIPVForms from "./intimate-partner-violence/submissions";
import useIPVDisclosureScreeningTools from "./ipv-disclosure-screening-tool/submissions";
import useSocialSupportForms from "./social-support-form/submissions";
import { SocialSupportFormLabelMapping } from "./social-support-form/definitions";

const Tab: React.FC = () => {
  const {
    IPVFormSubmissions,
    selectedIPVFormSubmission,
    handleIPVFormDelete,
    handleIPVFormSubmissionSelect,
  } = useIPVForms();

  const {
    IPVDisclosureScreeningToolSubmissions,
    selectedIPVDisclosureScreeningToolSubmission,
    handleIPVDisclosureScreeningToolDelete,
    handleIPVDisclosureScreeningToolSubmissionSelect
  } = useIPVDisclosureScreeningTools();

  const {
    SocialSupportFormSubmissions,
    selectedSocialSupportFormSubmission,
    handleSocialSupportFormDelete,
    handleSocialSupportFormSubmissionSelect
  } = useSocialSupportForms();

  const language = "en";

  return (
    <div className="flex flex-col">
      <Accordion title="Intimate Partner Violence">
        {selectedIPVFormSubmission && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bento-inner">
              <h2 className="font-bold text-lg">How often does your partner:</h2>
              <p><strong>Physically hurt you: </strong> {selectedIPVFormSubmission.physicallyHurt} </p>
              <p><strong>Insult or talk down to you: </strong> {selectedIPVFormSubmission.insultOrTalkDown} </p>
              <p><strong>Threaten you with harm:</strong> {selectedIPVFormSubmission.threatenWithHarm} </p>
              <p><strong>Scream or curse at you:</strong> {selectedIPVFormSubmission.screamOrCurse} </p>
            </div>
            <div className="bento-inner">
              <h2 className="font-bold text-lg">Staff Notes</h2>
              <p>{selectedIPVFormSubmission.staffNotes || "N/A"} </p>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/interpersonal-relations-assessments/intimate-partner-violence/"
          submissions={IPVFormSubmissions!}
          onDelete={handleIPVFormDelete}
          onSubmissionSelect={handleIPVFormSubmissionSelect}
        />
      </Accordion>

      <Accordion title="IPV Disclosure Screening Tool">
        {selectedIPVDisclosureScreeningToolSubmission && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <div className="flex-1 bento-inner">
                <h2 className="font-bold text-lg">IPV Screening</h2>
                <p><strong>Date Taken:</strong> {new Date(selectedIPVDisclosureScreeningToolSubmission.dateTaken).toLocaleDateString()}</p>
                <p><strong>IPV Screening Date: </strong>{new Date(selectedIPVDisclosureScreeningToolSubmission.ipvScreeningDate).toLocaleDateString()}</p>
                <p><strong>Screening Tool Used: </strong>{selectedIPVDisclosureScreeningToolSubmission.screeningToolUsed}</p>
                <p><strong>Total Score: </strong>{selectedIPVDisclosureScreeningToolSubmission.totalScore}</p>
              </div>
              <div className="flex-1 bento-inner">
                <h2 className="font-bold text-lg">IPV Disclosure</h2>
                <p><strong>IPV Disclosure: </strong>{selectedIPVDisclosureScreeningToolSubmission.ipvDisclosure}</p>
                <p><strong>IPV Disclosure Date: </strong>{new Date(selectedIPVDisclosureScreeningToolSubmission.ipvDisclosureDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex-1 bento-inner">
                <h2 className="font-bold text-lg">Notes</h2>
                <p>{selectedIPVDisclosureScreeningToolSubmission.notes || "N/A"}</p>
              </div>
              <div className="flex-1 bento-inner">
                <h2 className="font-bold text-lg">Staff Notes</h2>
                <p>{selectedIPVDisclosureScreeningToolSubmission.staffNotes}</p>
              </div>
            </div>
          </div>
        )}
        <Submission
          link="/dashboard/interpersonal-relations-assessments/ipv-disclosure-screening-tool/"
          submissions={IPVDisclosureScreeningToolSubmissions}
          onDelete={handleIPVDisclosureScreeningToolDelete}
          onSubmissionSelect={handleIPVDisclosureScreeningToolSubmissionSelect}
        />
      </Accordion>

      <Accordion title="Multidimensional Social Support Form">
        {selectedSocialSupportFormSubmission && (
          <div className="bento-outer">
            <div className="bento-inner">
              <p><strong>Assessment Date: </strong>{selectedSocialSupportFormSubmission.assessmentDate}</p>
              <p><strong>Site ID: </strong>{selectedSocialSupportFormSubmission.siteId}</p>
              <p><strong>Participant ID: </strong>{selectedSocialSupportFormSubmission.participantId}</p>
              <p><strong>Relation: </strong>{selectedSocialSupportFormSubmission.relation}</p>
              <p><strong>Form Completion Status: </strong>{selectedSocialSupportFormSubmission.formCompletionStatus}</p>
              <p><strong>Phase: </strong>{selectedSocialSupportFormSubmission.phase}</p>
              <p><strong>Segment: </strong>{selectedSocialSupportFormSubmission.segment}</p>
            </div>
            <div className="bento-inner">
              {/* <p><strong>Form Completion Language: </strong>{selectedSocialSupportFormSubmission.formCompletionLanguage}</p> */}
              <p><strong>There is a special person who is around when I am in need: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.specialPersonInNeed]}</p>
              <p><strong>There is a special person with whom I can share my joys and sorrows: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.specialPersonJoysSorrows]}</p>
              <p><strong>My family really tries to help me: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.familyHelp]}</p>
              <p><strong>I get the emotional help and support I need from my family: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.emotionalHelp]}</p>
              <p><strong>I have a special person who is a real source of comfort to me: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.specialPersonForComfort]}</p>
              <p><strong>My friends really try to help me: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.friendsHelp]}</p>
              <p><strong>I can count on my friends when things go wrong: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.canCountOnFriends]}</p>
              <p><strong>I can talk about my problems with my family: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.talkToFamilyAboutProblems]}</p>
              <p><strong>I have friends with whom I can share my joys and sorrows: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.friendsJoysSorrows]}</p>
              <p><strong>There is a special person in my life who cares about my feelings: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.specialPersonToTalkFeelings]}</p>
              <p><strong>My family is willing to help me make decisions: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.familyHelpsDecisions]}</p>
              <p><strong>I can talk about my problems with my friends: </strong>{SocialSupportFormLabelMapping[selectedSocialSupportFormSubmission.talkToFamilyAboutProblems]}</p>
            </div>
            <div className="bento-inner">
              <p><strong>Special Person: </strong>{selectedSocialSupportFormSubmission.specialPersonInitials}</p>
              <p><strong>Special Person Relationship: </strong>{selectedSocialSupportFormSubmission.specialPersonRelationship}</p>
            </div>
            <div className="bento-inner">
              <p><strong>Comments: </strong>{selectedSocialSupportFormSubmission.comments || "N/A"}</p>
              <p><strong>Staff Notes: </strong>{selectedSocialSupportFormSubmission.staffNotes}</p>
            </div>
          </div >
        )}
        <Submission
          link="/dashboard/interpersonal-relations-assessments/social-support-form/"
          submissions={SocialSupportFormSubmissions}
          onDelete={handleSocialSupportFormDelete}
          onSubmissionSelect={handleSocialSupportFormSubmissionSelect}
        />
      </Accordion >
    </div >
  );
};

export default Tab;