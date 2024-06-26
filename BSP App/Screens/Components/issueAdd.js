// FormUtils.js
export const updateIssueArea = (
  issue,
  setIssue,
  otherIssue,
  setOtherIssue,
  issueArea,
  setIssueArea
) => {
  let updatedIssueArea = issueArea || "";

  if (issue === "None") {
    if (otherIssue && otherIssue.trim() !== "") {
      updatedIssueArea = updatedIssueArea
        ? `${updatedIssueArea}, ${otherIssue}`
        : otherIssue;
    }
  } else {
    if (issue && issue.trim() !== "") {
      if (otherIssue && otherIssue.trim() !== "") {
        updatedIssueArea = updatedIssueArea
          ? `${updatedIssueArea}, ${issue}, ${otherIssue}`
          : `${issue}, ${otherIssue}`;
      } else {
        updatedIssueArea = updatedIssueArea
          ? `${updatedIssueArea}, ${issue}`
          : issue;
      }
    }
  }

  setIssueArea(updatedIssueArea);
  setIssue("");
  setOtherIssue("");
};
