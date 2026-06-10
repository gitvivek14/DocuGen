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
    propertyAddress: "",
    receiptDate: todayISO(),
    receiptMode: "monthly",
    includeRevenueStampNote: true,
    includeHraNote: true,
    bulkMonths: 3
  };
}

export function RentReceiptTool({ region }: { region?: RentRegionConfig }) {
  const [premiumMessage, setPremiumMessage] = useState("");
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

  const title = region?.h1 ?? "Rent receipt generator";
  const description =
    region?.intro ??
    "Create a clean rent receipt PDF with landlord, tenant, rent, property, and payment details. Preview live and download instantly.";

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
      watched.region,
      watched.rentEndDate,
      watched.rentStartDate,
      watched.tenantName
    ]
  );

  const onDownload = handleSubmit((values) => {
    generateRentReceiptPdf(values);
  });

  const form = (
    <form className="space-y-5" id="rent-receipt-form" onSubmit={onDownload}>
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
          autoComplete="name"
          error={errors.landlordName?.message}
          {...register("landlordName")}
        />
        <Textarea
          label="Landlord address"
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
          autoComplete="name"
          error={errors.tenantName?.message}
          {...register("tenantName")}
        />
        <Textarea
          label="Tenant address"
          error={errors.tenantAddress?.message}
          {...register("tenantAddress")}
        />
      </FormSection>

      <FormSection title="Rent details">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label={countryConfig.rentLabel}
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
        <Textarea
          label="Property address"
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
    <section className="rounded-card border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex w-fit rounded-full bg-cta-light px-3 py-1 text-[13px] font-medium text-cta">
          Free - no watermark
        </span>
        <Button type="submit" form="rent-receipt-form" disabled={isSubmitting}>
          Download free PDF
        </Button>
      </div>
      <div className="my-4 flex items-center gap-3 text-[13px] text-secondary">
        <span className="h-px flex-1 bg-slate-200" />
        <span>or upgrade for more</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <UpgradeCard
        title="Bulk receipts"
        description="Prepare the data model for 1-12 monthly receipts. Checkout is not enabled in this MVP."
      >
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <Input
            label="Number of months"
            type="number"
            min="1"
            max="12"
            error={errors.bulkMonths?.message}
            {...register("bulkMonths")}
          />
          <Button
            variant="secondary"
            onClick={() => setPremiumMessage("Premium checkout coming soon.")}
          >
            Generate bulk receipts
          </Button>
        </div>
        {premiumMessage ? (
          <p className="mt-3 text-[13px] font-medium text-cta">{premiumMessage}</p>
        ) : null}
      </UpgradeCard>
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
      title={title}
      description={description}
      form={form}
      preview={preview}
      cta={cta}
      note={note}
    />
  );
}
