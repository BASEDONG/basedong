"use client";

import { useEffect, useRef, useState } from "react";
import {
  AddOutlinedIcon,
  DownBoldOutlinedIcon,
  FeishuBaseLogoIcon,
  MemberFilledIcon,
  QrOutlinedIcon,
  QueryOutlinedIcon,
} from "@/components/forms/shared/icons";
import {
  CATEGORY_OPTIONS,
  FORM_DESCRIPTION,
  FORM_TITLE,
  PROBLEM_HINT,
  type CategoryOption,
} from "./content";
import styles from "./form-page.module.css";

export function FormPageClient() {
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<CategoryOption | "">("");
  const [description, setDescription] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!category) {
      setDropdownOpen(true);
      return;
    }
    window.alert("表单已提交（克隆演示，未连接飞书后端）");
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerActions}>
          <button type="button" className={`${styles.headerButton} ${styles.headerButtonRecords}`}>
            <QueryOutlinedIcon className={styles.headerButtonIcon} />
            查看提交记录
          </button>
          <button type="button" className={`${styles.headerButton} ${styles.headerButtonShare}`}>
            <QrOutlinedIcon className={styles.headerButtonIcon} />
            分享
          </button>
          <button type="button" className={styles.avatarButton} aria-label="用户">
            <MemberFilledIcon className={styles.avatarIcon} />
          </button>
        </div>
      </header>

      <div className={styles.banner} />

      <main className={styles.formBody}>
        <div className={styles.formInner}>
          <h1 className={styles.title}>{FORM_TITLE}</h1>
          <p className={styles.description}>{FORM_DESCRIPTION}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <div className={styles.labelRow}>
                <span className={styles.required}>*</span>
                接收反馈邮箱
              </div>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="请输入内容"
                required
              />
            </div>

            <div className={styles.field}>
              <div className={styles.labelRow}>
                <span className={styles.required}>*</span>
                问题分类
              </div>
              <div className={styles.selectWrap} ref={selectRef}>
                <button
                  type="button"
                  className={`${styles.selectTrigger} ${dropdownOpen ? styles.selectOpen : ""}`}
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <span className={category ? undefined : styles.selectPlaceholder}>
                    {category || "请选择选项"}
                  </span>
                  <DownBoldOutlinedIcon className={styles.selectIcon} />
                </button>
                {dropdownOpen ? (
                  <div className={styles.dropdown} role="listbox">
                    {CATEGORY_OPTIONS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={category === option}
                        className={`${styles.option} ${category === option ? styles.optionActive : ""}`}
                        onClick={() => {
                          setCategory(option);
                          setDropdownOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.labelRow}>
                <span className={styles.required}>*</span>
                问题描述
              </div>
              <div className={styles.controlColumn}>
                <p className={styles.hint}>{PROBLEM_HINT}</p>
                <input
                  className={`${styles.input} ${styles.descriptionInput}`}
                  type="text"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="请输入内容"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.labelRow}>附件</div>
              <div className={styles.uploadBox}>
                <div className={styles.uploadDrop}>粘贴或拖拽至这里上传</div>
                <div className={styles.uploadActions}>
                  <button
                    type="button"
                    className={styles.uploadButton}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <AddOutlinedIcon className={styles.uploadButtonIcon} />
                    添加本地文件
                  </button>
                  <input ref={fileInputRef} type="file" hidden multiple />
                </div>
              </div>
            </div>

            <div className={styles.submitWrap}>
              <button type="submit" className={styles.submit}>
                提交
              </button>
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
    </div>
  );
}
