"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type CampaignItem = {
  id: string;
  name: string;
  message: string;
  status: string;
  createdAt: string;
  completedAt?: string | null;
  segmentName?: string | null;
  audienceSize: number;
  sent: number;
  delivered: number;
  failed: number;
};

export default function CampaignsPage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<CampaignItem[]>([]);
  const [loading, setLoading] = useState(false);
  const backend = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`${backend}/api/campaigns`, {
        headers: {
          "x-user-email": session?.user?.email || "",
          "x-user-name": session?.user?.name || "",
        },
      });
      const data = await res.json();
      setItems(data);
      setLoading(false);
    };
    fetchData();
  }, [backend, session?.user?.email, session?.user?.name]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Campaign history</h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-600">No campaigns yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2 border">Name</th>
                <th className="text-left p-2 border">Segment</th>
                <th className="text-left p-2 border">Status</th>
                <th className="text-left p-2 border">Audience</th>
                <th className="text-left p-2 border">Sent</th>
                <th className="text-left p-2 border">Delivered</th>
                <th className="text-left p-2 border">Failed</th>
                <th className="text-left p-2 border">Created</th>
                <th className="text-left p-2 border">Completed</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border font-medium">{c.name}</td>
                  <td className="p-2 border">{c.segmentName || '-'}</td>
                  <td className="p-2 border capitalize">{c.status}</td>
                  <td className="p-2 border">{c.audienceSize}</td>
                  <td className="p-2 border">{c.sent}</td>
                  <td className="p-2 border">{c.delivered}</td>
                  <td className="p-2 border">{c.failed}</td>
                  <td className="p-2 border">{new Date(c.createdAt).toLocaleString()}</td>
                  <td className="p-2 border">{c.completedAt ? new Date(c.completedAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


