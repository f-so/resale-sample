import { legalInfo } from "../../config/legal";

export default function LegalPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        特定商取引法に基づく表記
      </h1>

      <div className="space-y-8">
        <section>
          <div className="overflow-x-auto -mx-4 sm:mx-0 bg-white">
            <div className="min-w-[300px] w-full border rounded-lg overflow-hidden">
              <table className="w-full border-collapse text-sm sm:text-base">
                <tbody>
                  {legalInfo.tableData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <th className="p-2 sm:p-4 text-left w-1/4 bg-gray-50">
                        {item.label}
                      </th>
                      <td className="p-2 sm:p-4">
                        {Array.isArray(item.value)
                          ? item.value.map((line, i) => (
                              <span key={i}>
                                {line}
                                {i < item.value.length - 1 && <br />}
                              </span>
                            ))
                          : item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
