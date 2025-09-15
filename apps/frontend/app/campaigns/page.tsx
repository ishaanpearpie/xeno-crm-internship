"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";

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

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDeliveryRate = (delivered: number, sent: number) => {
    if (sent === 0) return '0%';
    return `${Math.round((delivered / sent) * 100)}%`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const userName = session?.user?.name || "Your";

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{userName.split(" ")[0]}&apos;s Campaigns</h1>
          <p className="text-muted-foreground">
            Track your marketing campaign performance and delivery metrics.
          </p>
        </div>
      </div>

      {loading ? (
        <Card>
          <CardContent className="flex items-center justify-center h-32">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
              <p className="text-muted-foreground">Loading campaigns...</p>
            </div>
          </CardContent>
        </Card>
      ) : items.length === 0 ? (
        <Card>
          <CardHeader className="text-center">
            <CardTitle>No campaigns yet</CardTitle>
            <CardDescription>
              Create your first campaign by setting up a segment and sending targeted messages to your customers.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Campaign History</CardTitle>
            <CardDescription>
              {items.length} campaign{items.length !== 1 ? 's' : ''} • Most recent first
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Audience</TableHead>
                  <TableHead className="text-right">Sent</TableHead>
                  <TableHead className="text-right">Delivered</TableHead>
                  <TableHead className="text-right">Delivery Rate</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {campaign.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {campaign.segmentName || 'All Customers'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(campaign.status)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {campaign.audienceSize.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {campaign.sent.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span>{campaign.delivered.toLocaleString()}</span>
                        {campaign.failed > 0 && (
                          <span className="text-xs text-destructive">
                            {campaign.failed} failed
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={campaign.delivered === campaign.sent ? "success" : "secondary"}>
                        {getDeliveryRate(campaign.delivered, campaign.sent)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(campaign.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


