export function RentTable({ id }: { id?: string }) {
  return (
    <div id={id} className="overflow-x-auto rounded-2xl border border-primary/10 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">Unit type</th>
            <th className="px-4 py-3 font-semibold">B17 price range</th>
            <th className="px-4 py-3 font-semibold">FMC price range</th>
            <th className="px-4 py-3 font-semibold">Availability</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/10 text-body">
          <tr>
            <td className="px-4 py-3">Studio / 1-bed</td>
            <td className="px-4 py-3">Rs. 18,000–28,000</td>
            <td className="px-4 py-3">Rs. 20,000–32,000</td>
            <td className="px-4 py-3 text-emerald-700">Available</td>
          </tr>
          <tr className="bg-surface/60">
            <td className="px-4 py-3">2-bed flat</td>
            <td className="px-4 py-3">Rs. 28,000–45,000</td>
            <td className="px-4 py-3">Rs. 30,000–50,000</td>
            <td className="px-4 py-3 text-emerald-700">Available</td>
          </tr>
          <tr>
            <td className="px-4 py-3">3-bed flat</td>
            <td className="px-4 py-3">Rs. 45,000–70,000</td>
            <td className="px-4 py-3">Rs. 50,000–75,000</td>
            <td className="px-4 py-3 text-amber-700">Limited</td>
          </tr>
          <tr className="bg-surface/60">
            <td className="px-4 py-3">Shop</td>
            <td className="px-4 py-3">Rs. 25,000–60,000</td>
            <td className="px-4 py-3">Rs. 30,000–65,000</td>
            <td className="px-4 py-3 text-emerald-700">Available</td>
          </tr>
          <tr>
            <td className="px-4 py-3">Office</td>
            <td className="px-4 py-3">Rs. 20,000–40,000</td>
            <td className="px-4 py-3">Rs. 22,000–45,000</td>
            <td className="px-4 py-3 text-emerald-700">Available</td>
          </tr>
        </tbody>
      </table>
      <p className="border-t border-primary/10 px-4 py-3 text-xs text-muted">
        Prices updated monthly. Average rent Multi Gardens B17 and average
        rent MPCHS Islamabad figures are indicative — contact Kohisar Plaza
        for live units in FMC and B17.
      </p>
    </div>
  );
}
