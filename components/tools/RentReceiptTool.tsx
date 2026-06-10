"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { COUNTRY_CONFIGS, RENT_COUNTRIES, formatCurrency } from "@/data/countries";
import { Button } from "@/components/ui/Button";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";
import { PDFPreview } from "@/components/ui/PDFPreview";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { UpgradeCard } from "@/components/ui/UpgradeCard";
import { PreviewField } from "@/components/tools/PreviewField";
import { ToolShell } from "@/components/tools/ToolShell";
import { generateRentReceiptPdf } from "@/lib/pdf/rentReceipt";
import { rentReceiptSchema } from "@/lib/validation/rentReceipt";
import { formatDate, todayISO } from "@/lib/utils";
import type { RentCountry, RentReceiptFormValues, RentRegionConfig } from "@/types/rentReceipt";

const paymentMethods = ["Bank transfer", "Cash", "Cheque", "UPI", "Card", "Other"];

function emptyNumber() {
  return "" as unknown as number;
}

function getDefaultValues(region?: RentRegionConfig): RentReceiptFormValues {
  const country = region?.country ?? "India";
  const config = COUNTRY_CONFIGS[country];
  const receiptNo = `DG-${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    country,
    region: region?.displayName ?? config.regions[0],
    landlordName: "",
    landlordAddress: "",
    landlordPan: "",
    tenantName: "",
    tenantAddress: "",
    monthlyRent: emptyNumber(),
    currency: config.currency,
    rentStartDate: todayISO(),
    rentEndDate: todayISO(),
    paymentMethod: paymentMethods[0],
    receiptNo,
    propertyAddress: "",
    receiptDate: todayISO(),
    receiptMode: "monthly",
    includeRevenueStampNote: true,
    includeHraNote: true,
    bulkMonths: 3
  };
}

export function RentReceiptTool({ region }: { region?: RentRegionConfig }) {
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = useForm<RentReceiptFormValues>({
    resolver: zodResolver(rentReceiptSchema),
    defaultValues: getDefaultValues(region),
    mode: "onChange"
  });

  const watched = useWatch({ control });
  const selectedCountry = (watched.country ?? region?.country ?? "India") as RentCountry;
  const countryConfig = COUNTRY_CONFIGS[selectedCountry];
  const isIndia = selectedCountry === "India";

  useEffect(() => {
    setValue("currency", countryConfig.currency, { shouldValidate: true });
    if (!countryConfig.regions.includes(watched.region || "")) {
      setValue("region", countryConfig.regions[0], { shouldValidate: true });
    }
    if (!isIndia) {
      setValue("includeHraNote", false);
      setValue("includeRevenueStampNote", false);
    }
  }, [countryConfig, isIndia, setValue, watched.region]);

  const countryOptions = RENT_COUNTRIES.map((country) => ({
    label: country,
    value: country
  }));

  const regionOptions = countryConfig.regions.map((regionName) => ({
    label: regionName,
    value: regionName
  }));

  const paymentOptions = paymentMethods.map((method) => ({
    label: method,
    value: method
  }));

  const receiptModeOptions = [
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" }
  ];

  const title = region?.h1 ?? "Rent receipts done in 60 seconds.";
  const description =
    region?.intro ??
    "Country-aware fields, instant PDF, HRA-compliant for India. Switch to 12-month bundle for tax filing.";

  const previewAmount = formatCurrency(Number(watched.monthlyRent || 0), selectedCountry);
  const preview = useMemo(
    () => (
      <PDFPreview
        title="Rent receipt"
        footer={
          <>
            <p>We do not store or upload your document details.</p>
            {isIndia && watched.includeHraNote ? (
              <p className="mt-2">
                HRA note: Keep payment proof, lease details, and landlord PAN where required.
              </p>
            ) : null}
          </>
        }
      >
        <dl className="space-y-2">
          <PreviewField label="Country" value={`${selectedCountry} - ${watched.region || ""}`} />
          <PreviewField label="No" value={watched.receiptNo} />
          <PreviewField label="Landlord" value={watched.landlordName} />
          <PreviewField label="Tenant" value={watched.tenantName} />
          <PreviewField label="Amount" value={previewAmount} />
          <PreviewField
            label="Period"
            value={`${formatDate(watched.rentStartDate)} to ${formatDate(watched.rentEndDate)}`}
          />
          <PreviewField label="Payment" value={watched.paymentMethod} />
          <PreviewField label="Property" value={watched.propertyAddress} />
          {isIndia ? <PreviewField label="Landlord PAN" value={watched.landlordPan} /> : null}
        </dl>
      </PDFPreview>
    ),
    [
      isIndia,
      previewAmount,
      selectedCountry,
      watched.includeHraNote,
      watched.landlordName,
      watched.landlordPan,
      watched.paymentMethod,
      watched.propertyAddress,
      watched.receiptNo,
      watched.region,
      watched.rentEndDate,
      watched.rentStartDate,
      watched.tenantName
    ]
  );

  const onDownload = handleSubmit((values) => {
    generateRentReceiptPdf(values);
    setHasDownloaded(true);
  });

  const hasStarted = Boolean(
    watched.landlordName ||
      watched.landlordAddress ||
      watched.landlordPan ||
      watched.tenantName ||
      watched.tenantAddress ||
      watched.propertyAddress ||
      Number(watched.monthlyRent || 0) > 0
  );
  const activeStep = hasDownloaded ? 2 : hasStarted ? 1 : 0;

  const form = (
    <form className="space-y-5" id="rent-receipt-form" onSubmit={onDownload}>
      <div className="inline-flex rounded-xl border border-line bg-paper p-1">
        <button
          className="rounded-lg bg-white px-5 py-3 text-[14px] font-semibold text-body shadow-sm"
          type="button"
        >
          Single Receipt
        </button>
        <button
          className="cursor-not-allowed rounded-lg px-5 py-3 text-[14px] font-semibold text-secondary opacity-60"
          type="button"
          disabled
        >
          12-Month Bundle (Paid)
        </button>
      </div>

      <FormSection
        title="Country/region"
        description="Select the location first so currency and local fields can update."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label="Country"
            options={countryOptions}
            error={errors.country?.message}
            {...register("country")}
          />
          <Select
            label={countryConfig.regionLabel}
            options={regionOptions}
            error={errors.region?.message}
            {...register("region")}
          />
        </div>
        <Input
          label="Currency"
          readOnly
          value={countryConfig.currency}
          helperText="Currency changes automatically based on country."
        />
      </FormSection>

      <FormSection title="Landlord details">
          <Input
            label="Landlord name"
            placeholder="Ramesh Sharma"
            autoComplete="name"
          error={errors.landlordName?.message}
          {...register("landlordName")}
        />
          <Textarea
            label="Landlord address"
            placeholder="House no, street, city"
          error={errors.landlordAddress?.message}
          {...register("landlordAddress")}
        />
        {isIndia ? (
          <Input
            label="Landlord PAN"
            placeholder="ABCDE1234F"
            maxLength={10}
            className="uppercase"
            error={errors.landlordPan?.message}
            {...register("landlordPan", {
              onChange: (event) => {
                event.target.value = event.target.value.toUpperCase();
              }
            })}
          />
        ) : null}
      </FormSection>

      <FormSection title="Tenant details">
          <Input
            label="Tenant name"
            placeholder="Your name"
          autoComplete="name"
          error={errors.tenantName?.message}
          {...register("tenantName")}
        />
        <Textarea
          label="Tenant address"
          placeholder="Flat 12B, Andheri East, Mumbai"
          error={errors.tenantAddress?.message}
          {...register("tenantAddress")}
        />
      </FormSection>

      <FormSection title="Rent details">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label={countryConfig.rentLabel}
            placeholder="25000"
            type="number"
            min="0"
            step="0.01"
            error={errors.monthlyRent?.message}
            {...register("monthlyRent")}
          />
          <Select
            label="Payment method"
            options={paymentOptions}
            error={errors.paymentMethod?.message}
            {...register("paymentMethod")}
          />
          <Input
            label="Rent period start date"
            type="date"
            error={errors.rentStartDate?.message}
            {...register("rentStartDate")}
          />
          <Input
            label="Rent period end date"
            type="date"
            error={errors.rentEndDate?.message}
            {...register("rentEndDate")}
          />
          <Input
            label="Receipt date"
            type="date"
            error={errors.receiptDate?.message}
            {...register("receiptDate")}
          />
          <Select
            label="Receipt mode"
            options={receiptModeOptions}
            error={errors.receiptMode?.message}
            {...register("receiptMode")}
          />
        </div>
        <Input
          label="Receipt No."
          error={errors.receiptNo?.message}
          {...register("receiptNo")}
        />
        <Textarea
          label="Property address"
          placeholder="Flat 12B, Andheri East, Mumbai"
          error={errors.propertyAddress?.message}
          {...register("propertyAddress")}
        />
      </FormSection>

      {isIndia ? (
        <FormSection
          title="India-specific notes"
          description="Include common HRA and revenue stamp reminders in the PDF."
        >
          <label className="flex min-h-11 items-start gap-3 rounded-card border border-slate-200 bg-white p-3 text-[13px] text-body">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-primary"
              {...register("includeRevenueStampNote")}
            />
            <span>Include revenue stamp note</span>
          </label>
          <label className="flex min-h-11 items-start gap-3 rounded-card border border-slate-200 bg-white p-3 text-[13px] text-body">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-primary"
              {...register("includeHraNote")}
            />
            <span>Include HRA compliance note</span>
          </label>
        </FormSection>
      ) : null}
    </form>
  );

  const cta = (
    <section className="space-y-8">
      <div className="space-y-4">
        <span className="inline-flex w-fit rounded-full bg-primary-light px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
          Free · no watermark
        </span>
        <Button
          className="min-h-16 gap-3 text-[18px]"
          type="submit"
          form="rent-receipt-form"
          fullWidth
          disabled={isSubmitting}
        >
          <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v12M7 10l5 5 5-5M5 21h14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
          </svg>
          Download Free PDF
        </Button>
      </div>
      <UpgradeCard
        title="Need a full year? Get the 12-month bundle"
        priceLabel="Early access"
        description="Generate Apr-Mar HRA receipts in one PDF with sequential numbers and dates. Perfect for tax filing."
      />
    </section>
  );

  const note = region ? (
    <p>
      {region.officialLinkLabel}:{" "}
      <span className="font-medium text-body">{region.officialLinkPlaceholder}</span>
    </p>
  ) : null;

  return (
    <ToolShell
      eyebrow="Tool · Rent receipt"
      title={title}
      description={description}
      form={form}
      preview={preview}
      cta={cta}
      note={note}
      activeStep={activeStep}
    />
  );
}
