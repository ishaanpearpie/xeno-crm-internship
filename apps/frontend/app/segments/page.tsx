"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

type ConditionField = "totalSpend" | "totalVisits" | "inactiveDays";
type Comparison = "gt" | "gte" | "lt" | "lte" | "eq";

export default function SegmentsPage() {
  const { data: session } = useSession();
  const [operator, setOperator] = useState<"AND" | "OR">("AND");
  const [conditions, setConditions] = useState<Array<{ field: ConditionField; op: Comparison; value: number }>>([
    { field: "totalSpend", op: "gt", value: 1000 },
  ]);
  const [audience, setAudience] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("Hi {{name}}, here’s 10% off on your next order!");
  const [nlPrompt, setNlPrompt] = useState<string>("");
  const [parsing, setParsing] = useState<boolean>(false);
  const backend = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:4000";

  const updateCondition = (idx: number, key: string, value: any) => {
    setConditions(prev => prev.map((c, i) => (i === idx ? { ...c, [key]: value } : c)));
  };

  const addCondition = () => setConditions(prev => [...prev, { field: "totalVisits", op: "gte", value: 1 }]);
  const removeCondition = (idx: number) => setConditions(prev => prev.filter((_, i) => i !== idx));

  const previewAudience = async () => {
    setAudience(null);
    const body = { operator, conditions };
    const res = await fetch(`${backend}/api/segments/preview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setAudience(data.audienceSize ?? 0);
  };

  const createCampaign = async () => {
    if (!session) return;
    const body = {
      name: name || "Untitled Campaign",
      message,
      rules: { operator, conditions },
    };
    const res = await fetch(`${backend}/api/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-email": session.user?.email || "",
        "x-user-name": session.user?.name || "",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      alert("Campaign created and delivered (simulated).");
      setName("");
    } else {
      const err = await res.text();
      alert(`Failed: ${err}`);
    }
  };

  const parseNaturalLanguage = async () => {
    if (!nlPrompt.trim()) return;
    setParsing(true);
    try {
      const res = await fetch(`${backend}/api/ai/nl-to-rules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": session?.user?.email || "",
          "x-user-name": session?.user?.name || "",
        },
        body: JSON.stringify({ prompt: nlPrompt }),
      });
      const data = await res.json();
      if (data?.operator && Array.isArray(data?.conditions)) {
        setOperator((data.operator === 'OR' ? 'OR' : 'AND'));
        // Sanitize and coerce values
        const sanitized = (data.conditions as any[])
          .map((c) => ({ field: c.field, op: c.op, value: Number(c.value) }))
          .filter((c) => (c.field === 'totalSpend' || c.field === 'totalVisits' || c.field === 'inactiveDays') && !Number.isNaN(c.value));
        if (sanitized.length > 0) setConditions(sanitized as any);
      }
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Segments</h1>

      {/* Natural language input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Describe your audience</label>
        <div className="flex items-center gap-2">
          <input className="border rounded px-3 py-2 w-full" placeholder="e.g., customers who spent more than 100 and visited at least 3 times"
            value={nlPrompt} onChange={e => setNlPrompt(e.target.value)} />
          <button className="px-3 py-2 border rounded" onClick={parseNaturalLanguage} disabled={parsing}>
            {parsing ? 'Parsing...' : 'Convert to Rules'}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <label className="text-sm">Combine with</label>
          <select className="border rounded px-2 py-1" value={operator} onChange={e => setOperator(e.target.value as any)}>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>
        {conditions.map((cond, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <select className="border rounded px-2 py-1" value={cond.field} onChange={e => updateCondition(idx, "field", e.target.value)}>
              <option value="totalSpend">totalSpend</option>
              <option value="totalVisits">totalVisits</option>
              <option value="inactiveDays">inactiveDays</option>
            </select>
            <select className="border rounded px-2 py-1" value={cond.op} onChange={e => updateCondition(idx, "op", e.target.value)}>
              <option value="gt">gt</option>
              <option value="gte">gte</option>
              <option value="lt">lt</option>
              <option value="lte">lte</option>
              <option value="eq">eq</option>
            </select>
            <input type="number" className="border rounded px-2 py-1 w-40" value={cond.value}
              onChange={e => updateCondition(idx, "value", Number(e.target.value))} />
            <button className="px-2 py-1 text-sm border rounded" onClick={() => removeCondition(idx)}>Remove</button>
          </div>
        ))}
        <button className="px-3 py-1 border rounded" onClick={addCondition}>Add condition</button>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={previewAudience}>Preview audience</button>
        {audience !== null && <span className="text-sm text-gray-700">Audience size: {audience}</span>}
      </div>

      <div className="space-y-2">
        <input className="border rounded w-full px-3 py-2" placeholder="Campaign name"
          value={name} onChange={e => setName(e.target.value)} />
        <textarea className="border rounded w-full px-3 py-2" placeholder="Message (use {{name}} for personalization)"
          value={message} onChange={e => setMessage(e.target.value)} />
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={createCampaign}>Save and Send</button>
      </div>
    </div>
  );
}


