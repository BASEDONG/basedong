"use client";

import { useState } from "react";
import {
  FeishuBaseLogoIcon,
  MemberFilledIcon,
  QrOutlinedIcon,
  QueryOutlinedIcon,
  VoiceMicIcon,
} from "@/components/forms/shared/icons";
import {
  ASSET_BASE,
  COMPUTE_FORM_URL,
  ECOSYSTEM_FORM_URL,
  FORM_FIELDS,
  FORM_TITLE,
  PRIVACY_POLICY_URL,
  type FormFieldConfig,
} from "./content";
import styles from "./form-page.module.css";

type FieldValues = Record<string, string>;
type MultiSelectValues = Record<string, string[]>;

function getInitialMultiSelect(): MultiSelectValues {
  const initial: MultiSelectValues = {};
  for (const field of FORM_FIELDS) {
    if (field.type === "multi-select") {
      initial[String(field.number)] = [...field.options];
    }
  }
  return initial;
}

function getInitialTextValues(): FieldValues {
  const initial: FieldValues = {};
  for (const field of FORM_FIELDS) {
    if (field.type === "text") {
      initial[String(field.number)] = "";
    }
  }
  return initial;
}

function toggleOption(selected: string[], option: string): string[] {
  return selected.includes(option)
    ? selected.filter((item) => item !== option)
    : [...selected, option];
}

function validateForm(
  textValues: FieldValues,
  multiSelectValues: MultiSelectValues,
): boolean {
  for (const field of FORM_FIELDS) {
    if (!field.required) continue;
    if (field.type === "text" && !textValues[String(field.number)]?.trim()) {
      return false;
    }
    if (
      field.type === "multi-select" &&
      multiSelectValues[String(field.number)]?.length === 0
    ) {
      return false;
    }
  }
  return true;
}

function FieldLabel({ field }: { field: FormFieldConfig }) {
  return (
    <div className={styles.labelRow}>
      {field.required ? <span className={styles.requiredMark}>*</span> : null}
      <span className={styles.numberBadge}>{field.number}</span>
      <span className={styles.arrowIcon} aria-hidden="true">→</span>
      <span className={styles.labelText}>{field.label}</span>
    </div>
  );
}

export function FormPageClient() {
  const [textValues, setTextValues] = useState<FieldValues>(getInitialTextValues);
  const [multiSelectValues, setMultiSelectValues] = useState<MultiSelectValues>(
    getInitialMultiSelect,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateForm(textValues, multiSelectValues)) {
      window.alert("请填写所有必填项");
      return;
    }
    window.alert("表单已提交（克隆演示，未连接飞书后端）");
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={`${styles.headerButton} ${styles.headerButtonRecords}`}
          >
            <QueryOutlinedIcon className={styles.headerButtonIcon} />
            查看提交记录
          </button>
          <button
            type="button"
            className={`${styles.headerButton} ${styles.headerButtonShare}`}
          >
            <QrOutlinedIcon className={styles.headerButtonIcon} />
            分享
          </button>
          <button type="button" className={styles.avatarButton} aria-label="用户">
            <MemberFilledIcon className={styles.avatarIcon} />
          </button>
        </div>
      </header>

      <div className={styles.layout}>
        <img
          className={styles.illustrationBg}
          src={`${ASSET_BASE}/form-illustration.png`}
          alt=""
        />

        <main className={styles.formCard}>
          <div className={styles.formInner}>
            <h1 className={styles.title}>{FORM_TITLE}</h1>

            <div className={styles.description}>
              <p>请先确认您的项目属于商务合作，指路：</p>
              <p>
                若为生态合作：
                <a href={ECOSYSTEM_FORM_URL} target="_blank" rel="noopener noreferrer">
                  {ECOSYSTEM_FORM_URL}
                </a>
              </p>
              <p>
                若为算力联合运营或算力消纳：
                <a href={COMPUTE_FORM_URL} target="_blank" rel="noopener noreferrer">
                  {COMPUTE_FORM_URL}
                </a>
              </p>
              <p>
                📌您提供的信息将被严格保密，仅用于本问卷调研了解业务需求。您提交如下信息即代表同意我们的《隐私政策》
                <a href={PRIVACY_POLICY_URL} target="_blank" rel="noopener noreferrer">
                  {PRIVACY_POLICY_URL}
                </a>
                ，感谢您的信任与支持！
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {FORM_FIELDS.map((field) => (
                <div key={field.number} className={styles.field}>
                  <FieldLabel field={field} />

                  {field.type === "text" ? (
                    <>
                      {field.hint ? <p className={styles.hint}>{field.hint}</p> : null}
                      {field.number === 8 ? (
                        <textarea
                          className={styles.textarea}
                          value={textValues[String(field.number)]}
                          onChange={(event) =>
                            setTextValues((prev) => ({
                              ...prev,
                              [String(field.number)]: event.target.value,
                            }))
                          }
                          placeholder={field.placeholder}
                        />
                      ) : (
                        <input
                          className={styles.input}
                          type="text"
                          value={textValues[String(field.number)]}
                          onChange={(event) =>
                            setTextValues((prev) => ({
                              ...prev,
                              [String(field.number)]: event.target.value,
                            }))
                          }
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      )}
                    </>
                  ) : (
                    <div className={styles.optionGrid}>
                      {field.options.map((option) => {
                        const key = String(field.number);
                        const selected = multiSelectValues[key]?.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            className={`${styles.option} ${selected ? styles.optionSelected : ""}`}
                            onClick={() =>
                              setMultiSelectValues((prev) => ({
                                ...prev,
                                [key]: toggleOption(prev[key] ?? [], option),
                              }))
                            }
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              <div className={styles.submitWrap}>
                <button type="submit" className={styles.submit}>提交</button>
              </div>
            </form>
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerSupport}>
            <span className={styles.footerLine} aria-hidden="true" />
            <FeishuBaseLogoIcon className={styles.footerLogo} />
            <span>飞书多维表格 提供技术支持</span>
            <span className={styles.footerLine} aria-hidden="true" />
          </div>
        </footer>

        <button type="button" className={styles.voiceFab} aria-label="AI 语音录入">
          <VoiceMicIcon className={styles.voiceFabIcon} />
          AI 语音录入
        </button>
      </div>
    </div>
  );
}
