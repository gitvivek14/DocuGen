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
  const [premiumMessage, setPremiumMessage] = useState("");
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

  const title = stateConfig?.h1 ?? "Vehicle bill of sale generator";
  const description =
    stateConfig?.intro ??
    "Create a clean vehicle bill of sale PDF with seller, buyer, vehicle, odometer, and sale details. Preview live and download instantly.";

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
  });

  const form = (
    <form className="space-y-5" id="vehicle-bill-of-sale-form" onSubmit={onDownload}>
      <FormSection
        title="State"
        description="Choose the state first so DMV notes and labels can update."
      >
        <Select label="US state" options={stateOptions} error={errors.state?.message} {...register("state")} />
        <p className="text-[13px] text-secondary">
          {activeState?.note ?? "Check your local motor vehicle agency before use."}
        </p>
      </FormSection>

      <FormSection title="Seller details">
        <Input label="Seller name" error={errors.sellerName?.message} {...register("sellerName")} />
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
        <Input label="Buyer name" error={errors.buyerName?.message} {...register("buyerName")} />
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
            min="1900"
            error={errors.vehicleYear?.message}
            {...register("vehicleYear")}
          />
          <Input label="Make" error={errors.vehicleMake?.message} {...register("vehicleMake")} />
          <Input label="Model" error={errors.vehicleModel?.message} {...register("vehicleModel")} />
          <Input label="Body type" error={errors.bodyType?.message} {...register("bodyType")} />
          <Input label="Color" error={errors.color?.message} {...register("color")} />
          <Input
            label="VIN"
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
          <Input
            label="Sale date"
            type="date"
            error={errors.saleDate?.message}
            {...register("saleDate")}
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
              {activeState?.officialLinkPlaceholder ?? "Official link placeholder"}
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
    <section className="rounded-card border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex w-fit rounded-full bg-cta-light px-3 py-1 text-[13px] font-medium text-cta">
          Free - no watermark
        </span>
        <Button type="submit" form="vehicle-bill-of-sale-form" disabled={isSubmitting}>
          Download free PDF
        </Button>
      </div>
      <div className="my-4 flex items-center gap-3 text-[13px] text-secondary">
        <span className="h-px flex-1 bg-slate-200" />
        <span>or upgrade for more</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <UpgradeCard
        title="Premium packets"
        description="Future premium downloads can bundle extra checklists and copies. Checkout is not enabled in this MVP."
      >
        <Button
          variant="secondary"
          onClick={() => setPremiumMessage("Premium checkout coming soon.")}
        >
          Generate premium packet
        </Button>
        {premiumMessage ? (
          <p className="mt-3 text-[13px] font-medium text-cta">{premiumMessage}</p>
        ) : null}
      </UpgradeCard>
    </section>
  );

  const note = (
    <p>
      {activeState?.dmvLabel ?? "Official DMV"}:{" "}
      <span className="font-medium text-body">
        {activeState?.officialLinkPlaceholder ?? "Official link placeholder"}
      </span>
    </p>
  );

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

export { BILL_OF_SALE_SEO_STATES };
