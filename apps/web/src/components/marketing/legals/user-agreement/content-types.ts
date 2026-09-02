export type AgreementSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type UserAgreementStrings = {
  pageTitle: string;
  intro: string;
  sections: AgreementSection[];
  closing: string;
};

export type UserAgreementContent = UserAgreementStrings;
