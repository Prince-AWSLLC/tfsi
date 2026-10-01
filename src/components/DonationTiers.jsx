import { useMemo, useState } from "react";
import { useSite } from "../data/siteData";
import { Field } from "./Field";

const MIN = 1;
const MAX = 100000;

function formatUsd(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function DonationTiers() {
  const { get } = useSite();
  const tiers = get("donate.tiers.amounts") ?? [];
  const designations = get("donate.tiers.designations") ?? [];
  const paypal = get("org.paypal");

  const [selected, setSelected] = useState(tiers[3]?.amount ?? tiers[0]?.amount ?? 50);
  const [custom, setCustom] = useState("");
  const [designation, setDesignation] = useState(designations[0] ?? "");

  const customValue = Number.parseInt(custom, 10);
  const customValid = Number.isInteger(customValue) && customValue >= MIN && customValue <= MAX;
  const amount = custom !== "" ? (customValid ? customValue : null) : selected;

  const href = useMemo(() => {
    if (!paypal || !amount) return paypal ?? "#";
    const url = new URL(paypal);
    url.searchParams.set("amount", String(amount));
    url.searchParams.set("currency_code", "USD");
    return url.toString();
  }, [paypal, amount]);

  const pickTier = (value) => {
    setSelected(value);
    setCustom("");
  };

  return (
    <form
      className="tiers"
      onSubmit={(event) => {
        event.preventDefault();
        if (amount) window.open(href, "_blank", "noopener");
      }}
    >
      <fieldset className="tier-grid">
        <legend className="sr-only">Gift amount</legend>
        {tiers.map((tier) => {
          const active = custom === "" && tier.amount === selected;
          return (
            <label
              key={tier.amount}
              className={`tier${active ? " is-active" : ""}`}
              data-json="donate.tiers.amounts"
            >
              <input
                type="radio"
                name="tier"
                value={tier.amount}
                checked={active}
                onChange={() => pickTier(tier.amount)}
              />
              <span className="tier-amount">{formatUsd(tier.amount)}</span>
              {tier.label ? <span className="tier-label">{tier.label}</span> : null}
            </label>
          );
        })}
        <div className={`tier tier-custom${custom !== "" ? " is-active" : ""}`}>
          <Field
            id="custom-amount"
            label="Other amount (USD)"
            type="number"
            inputMode="numeric"
            min={MIN}
            max={MAX}
            step="1"
            value={custom}
            onChange={(event) => setCustom(event.target.value.replace(/[^\d]/g, ""))}
            aria-invalid={custom !== "" && !customValid}
          />
        </div>
      </fieldset>

      <div className="tier-controls">
        <Field
          id="designation"
          label="Designation"
          as="select"
          value={designation}
          onChange={(event) => setDesignation(event.target.value)}
        >
          {designations.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Field>
        <p className="form-note" data-json="donate.tiers.designationNote">
          {get("donate.tiers.designationNote")}
        </p>
      </div>

      <div className="tier-summary" aria-live="polite">
        <div>
          <span className="tier-summary-label">Your gift</span>
          <span className="tier-summary-value">
            {amount ? formatUsd(amount) : "Enter an amount"}
          </span>
        </div>
        <div>
          <span className="tier-summary-label">Designation</span>
          <span className="tier-summary-value tier-summary-small">{designation}</span>
        </div>
        <div className="tier-summary-action">
          <a
            className={`btn btn-accent btn-lg${amount ? "" : " is-disabled"}`}
            href={amount ? href : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!amount}
            onClick={(event) => {
              if (!amount) event.preventDefault();
            }}
          >
            {get("donate.tiers.button")}
          </a>
          <span className="form-note" data-json="donate.tiers.monthlyNote">
            {get("donate.tiers.monthlyNote")}
          </span>
        </div>
      </div>
      {custom !== "" && !customValid ? (
        <p className="form-error" role="alert">
          Enter a whole-dollar amount between {formatUsd(MIN)} and {formatUsd(MAX)}.
        </p>
      ) : null}
    </form>
  );
}
