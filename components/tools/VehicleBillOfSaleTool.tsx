"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { BILL_OF_SALE_SEO_STATES, TOP_US_STATE_NAMES, US_STATES, getStateByName } from "@/data/usStates";
import { Button } from "@/components/ui/Button";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";
import { PDFPreview } from "@/components/ui/PDFPreview";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { UpgradeCard } from "@/components/ui/UpgradeCard";
import { PreviewField } from "@/components/tools/PreviewField";
import { ToolShell } from "@/components/tools/ToolShell";
import { generateBillOfSalePdf } from "@/lib/pdf/billOfSale";
import { billOfSaleSchema } from "@/lib/validation/billOfSale";
import { formatDate, todayISO } from "@/lib/utils";
import type { BillOfSaleFormValues, BillOfSaleStateConfig } from "@/types/billOfSale";

const paymentMethods = ["Cash", "Cashier's check", "Bank transfer", "Certified check", "Other"];

function emptyNumber() {
  return "" as unknown as number;
}

function usd(amount: number | string | undefined) {
  const numeric = Number(amount || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(Number.isNaN(numeric) ? 0 : numeric);
}

function orderedStateOptions() {
  const top = TOP_US_STATE_NAMES.map((name) => US_STATES.find((state) => state.name === name)).filter(
    Boolean
  ) as BillOfSaleStateConfig[];
  const rest = US_STATES.filter((state) => !TOP_US_STATE_NAMES.includes(state.name));
  return [...top, ...rest].map((state) => ({
    label: state.name,
    value: state.name
  }));
}

function getDefaultValues(stateConfig?: BillOfSaleStateConfig): BillOfSaleFormValues {
  return {
    state: stateConfig?.name ?? "Texas",
    sellerName: "",
    sellerAddress: "",
    sellerContact: "",
    buyerName: "",
    buyerAddress: "",
    buyerContact: "",
    vehicleYear: emptyNumber(),
    vehicleMake: "",
    vehicleModel: "",
    bodyType: "",
    color: "",
    vin: "",
    licensePlate: "",
    odometer: emptyNumber(),
    salePrice: emptyNumber(),
    saleDate: todayISO(),
    paymentMethod: paymentMethods[0],
    asIs: true
  };
}

export function VehicleBillOfSaleTool({ stateConfig }: { stateConfig?: BillOfSaleStateConfig }) {
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<BillOfSaleFormValues>({
    resolver: zodResolver(billOfSaleSchema),
    defaultValues: getDefaultValues(stateConfig),
    mode: "onChange"
  });

  const watched = useWatch({ control });
  const selectedState = watched.state || stateConfig?.name || "Texas";
  const activeState = getStateByName(selectedState);
  const stateOptions = orderedStateOptions();
  const paymentOptions = paymentMethods.map((method) => ({ label: method, value: method }));

  const title = stateConfig?.h1 ?? "Sell a vehicle the legit way.";
  const description =
    stateConfig?.intro ??
    "State-aware. 17-character VIN validation. Federal odometer disclosure auto-included. DMV-ready PDF in seconds.";

  const preview = useMemo(
    () => (
      <PDFPreview
        title="Vehicle bill of sale"
        footer={
          <>
            <p>Odometer disclosure is included in the generated PDF.</p>
            <p className="mt-2">
              Legal disclaimer: This document is a general template. Check your local DMV or
              legal authority before use.
            </p>
          </>
        }
      >
        <dl className="space-y-2">
          <PreviewField label="State" value={selectedState} />
          <PreviewField label="Seller" value={watched.sellerName} />
          <PreviewField label="Buyer" value={watched.buyerName} />
          <PreviewField
            label="Vehicle"
            value={`${watched.vehicleYear || ""} ${watched.vehicleMake || ""} ${
              watched.vehicleModel || ""
            }`}
          />
          <PreviewField label="VIN" value={watched.vin} />
          <PreviewField
            label="Odometer"
            value={watched.odometer ? `${Number(watched.odometer).toLocaleString()} miles` : ""}
          />
          <PreviewField label="Price" value={usd(watched.salePrice)} />
          <PreviewField label="Sale date" value={formatDate(watched.saleDate)} />
          {watched.asIs ? <PreviewField label="Terms" value="Sold as-is" /> : null}
        </dl>
      </PDFPreview>
    ),
    [
      selectedState,
      watched.asIs,
      watched.buyerName,
      watched.odometer,
      watched.saleDate,
      watched.salePrice,
      watched.sellerName,
      watched.vehicleMake,
      watched.vehicleModel,
      watched.vehicleYear,
      watched.vin
    ]
  );

  const onDownload = handleSubmit((values) => {
    generateBillOfSalePdf(values);
    setHasDownloaded(true);
  });

  const hasStarted = Boolean(
    watched.sellerName ||
      watched.sellerAddress ||
      watched.buyerName ||
      watched.buyerAddress ||
      watched.vehicleMake ||
      watched.vehicleModel ||
      watched.bodyType ||
      watched.color ||
      watched.vin ||
      Number(watched.vehicleYear || 0) > 0 ||
      Number(watched.odometer || 0) > 0 ||
      Number(watched.salePrice || 0) > 0
  );
  const activeStep = hasDownloaded ? 2 : hasStarted ? 1 : 0;

  const form = (
    <form className="space-y-5" id="vehicle-bill-of-sale-form" onSubmit={onDownload}>
      <FormSection
        title="State"
        description="Choose the state first so DMV notes and labels can update."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Select label="US state" options={stateOptions} error={errors.state?.message} {...register("state")} />
          <Input
            label="Sale date"
            type="date"
            error={errors.saleDate?.message}
            {...register("saleDate")}
          />
        </div>
        <p className="text-[13px] text-secondary">
          {activeState?.note ?? "Check your local motor vehicle agency before use."}
        </p>
      </FormSection>

      <FormSection title="Seller details">
        <Input label="Full name" error={errors.sellerName?.message} {...register("sellerName")} />
        <Textarea
          label="Seller address"
          error={errors.sellerAddress?.message}
          {...register("sellerAddress")}
        />
        <Input
          label="Seller phone or email"
          error={errors.sellerContact?.message}
          {...register("sellerContact")}
        />
      </FormSection>

      <FormSection title="Buyer details">
        <Input label="Full name" error={errors.buyerName?.message} {...register("buyerName")} />
        <Textarea
          label="Buyer address"
          error={errors.buyerAddress?.message}
          {...register("buyerAddress")}
        />
        <Input
          label="Buyer phone or email"
          error={errors.buyerContact?.message}
          {...register("buyerContact")}
        />
      </FormSection>

      <FormSection title="Vehicle details">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Year"
            type="number"
            placeholder="2018"
            min="1900"
            error={errors.vehicleYear?.message}
            {...register("vehicleYear")}
          />
          <Input label="Make" placeholder="Honda" error={errors.vehicleMake?.message} {...register("vehicleMake")} />
          <Input label="Model" placeholder="Civic" error={errors.vehicleModel?.message} {...register("vehicleModel")} />
          <Input label="Body type" error={errors.bodyType?.message} {...register("bodyType")} />
          <Input label="Color" error={errors.color?.message} {...register("color")} />
          <Input
            label="VIN"
            placeholder="1HGCM82633A123456"
            maxLength={17}
            className="uppercase"
            error={errors.vin?.message}
            helperText="VIN must be 17 characters and cannot include I, O, or Q."
            {...register("vin", {
              onChange: (event) => {
                event.target.value = event.target.value.toUpperCase();
              }
            })}
          />
          <Input
            label="License plate"
            error={errors.licensePlate?.message}
            {...register("licensePlate")}
          />
          <Input
            label="Odometer reading"
            type="number"
            min="0"
            placeholder="86420"
            error={errors.odometer?.message}
            {...register("odometer")}
          />
        </div>
      </FormSection>

      <FormSection title="Sale details">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Sale price"
            type="number"
            min="0"
            step="0.01"
            error={errors.salePrice?.message}
            {...register("salePrice")}
          />
          <Select
            label="Payment method"
            options={paymentOptions}
            error={errors.paymentMethod?.message}
            {...register("paymentMethod")}
          />
        </div>
        <label className="flex min-h-11 items-start gap-3 rounded-card border border-slate-200 bg-white p-3 text-[13px] text-body">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-primary" {...register("asIs")} />
          <span>Include as-is clause</span>
        </label>
      </FormSection>

      <FormSection title="Compliance note">
        <div className="space-y-2 text-[13px] text-secondary">
          <p>
            Odometer disclosure note: The seller states the odometer reading is accurate to the
            best of their knowledge.
          </p>
          <p>
            {activeState?.dmvLabel ?? "Official DMV"}:{" "}
            <span className="font-medium text-body">
              {activeState?.officialLinkPlaceholder ?? "Check the official motor vehicle agency website"}
            </span>
          </p>
          <p>
            Legal disclaimer: This document is a general template. Check your local DMV or legal
            authority before use.
          </p>
        </div>
      </FormSection>
    </form>
  );

  const cta = (
    <section className="space-y-8">
      <div className="space-y-4">
        <span className="inline-flex w-fit rounded-full bg-primary-light px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
          Free · DMV-ready
        </span>
        <Button
          className="min-h-16 gap-3 text-[18px]"
          type="submit"
          form="vehicle-bill-of-sale-form"
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
        title="Premium notary-ready template"
        priceLabel="Early access"
        description="Adds a notary-ready layout, extra copies, and supporting checklist."
      />
    </section>
  );

  const note = (
    <p>
      {activeState?.dmvLabel ?? "Official DMV"}:{" "}
      <span className="font-medium text-body">
        {activeState?.officialLinkPlaceholder ?? "Check the official motor vehicle agency website"}
      </span>
    </p>
  );

  return (
    <ToolShell
      eyebrow="Tool · Vehicle bill of sale"
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

export { BILL_OF_SALE_SEO_STATES };
