declare module "@/data/pricing.json" {
  interface PricingHeader {
    id: string;
    label: string;
    className?: string;
  }

  interface PricingCellValue {
    value: string;
    subtext?: string;
  }

  interface PricingRow {
    feature: string;
    values: PricingCellValue[];
  }

  interface PricingData {
    headers: PricingHeader[];
    rows: PricingRow[];
  }

  const data: PricingData;
  export default data;
} 