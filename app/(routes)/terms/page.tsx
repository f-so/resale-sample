import { Card, CardContent } from "@/components/ui/card";
import { TERMS_OF_SERVICE } from "@/constants/terms";

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">利用規約</h1>
      <Card>
        <CardContent className="p-6 prose prose-gray max-w-none whitespace-pre-line">
          {TERMS_OF_SERVICE}
        </CardContent>
      </Card>
    </div>
  );
}
