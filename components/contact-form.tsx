"use client";

import { useState, type FormEvent } from "react";
import { copy, restaurant, type Locale } from "../lib/site";
import { Icon } from "./icon";

export function ContactForm({ locale }: { locale: Locale }) {
  const labels = copy[locale].contactForm;
  const [draft, setDraft] = useState("");

  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = [values.get("name"), values.get("lastName")].filter(Boolean).join(" ");
    const subject = encodeURIComponent(`Tokyo BBQ House · ${name}`);
    const body = encodeURIComponent(`${values.get("message")}\n\n${name}\n${values.get("email")}`);
    const href = `mailto:${restaurant.email}?subject=${subject}&body=${body}`;
    setDraft(href);
    window.location.href = href;
  }

  return (
    <form className="contact-form" onSubmit={openEmail}>
      <h3>{labels.title}</h3>
      <div className="form-row">
        <label>{labels.name}<input name="name" autoComplete="given-name" required /></label>
        <label>{labels.lastName}<input name="lastName" autoComplete="family-name" /></label>
      </div>
      <label>{labels.email}<input type="email" name="email" autoComplete="email" required /></label>
      <label>{labels.message}<textarea name="message" rows={3} required /></label>
      <label className="consent"><input type="checkbox" required />{labels.consent}</label>
      <button className="button button-red" type="submit">{labels.action} <Icon name="mail" /></button>
      <p className="form-note">{draft ? <a href={draft}>{labels.action}</a> : labels.help}</p>
    </form>
  );
}
