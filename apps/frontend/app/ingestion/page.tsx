"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function IngestionPage() {
  const { data: session } = useSession();
  const [customerFile, setCustomerFile] = useState<File | null>(null);
  const [orderFile, setOrderFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const parseCSV = (text: string): any[] => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
  };

  const uploadCustomers = async (file: File) => {
    const text = await file.text();
    const data = parseCSV(text);
    
    // Transform to expected format
    const customers = data.map(row => ({
      email: row.email || row.Email,
      name: row.name || row.Name,
      phone: row.phone || row.Phone || undefined,
      totalSpend: row.totalSpend || row.total_spend || row.TotalSpend ? parseFloat(row.totalSpend || row.total_spend || row.TotalSpend) : undefined,
      totalVisits: row.totalVisits || row.total_visits || row.TotalVisits ? parseInt(row.totalVisits || row.total_visits || row.TotalVisits) : undefined,
      lastVisit: row.lastVisit || row.last_visit || row.LastVisit || undefined,
    }));

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:4000'}/api/customers/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-email': session?.user?.email || '',
        'x-user-name': session?.user?.name || '',
      },
      body: JSON.stringify(customers),
    });

    if (!response.ok) {
      throw new Error(`Failed to upload customers: ${response.statusText}`);
    }

    const result = await response.json();
    return `✅ Uploaded ${result.count} customers`;
  };

  const uploadOrders = async (file: File) => {
    const text = await file.text();
    const data = parseCSV(text);
    
    // Transform to expected format
    const orders = data.map(row => ({
      customerEmail: row.customerEmail || row.customer_email || row.CustomerEmail,
      amount: parseFloat(row.amount || row.Amount),
      status: row.status || row.Status || 'completed',
      orderDate: row.orderDate || row.order_date || row.OrderDate || new Date().toISOString(),
    }));

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:4000'}/api/orders/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-email': session?.user?.email || '',
        'x-user-name': session?.user?.name || '',
      },
      body: JSON.stringify(orders),
    });

    if (!response.ok) {
      throw new Error(`Failed to upload orders: ${response.statusText}`);
    }

    const result = await response.json();
    return `✅ Uploaded ${result.count} orders`;
  };

  const handleUpload = async () => {
    if (!customerFile && !orderFile) {
      alert('Please select at least one file to upload');
      return;
    }

    setUploading(true);
    setResults([]);
    const newResults: string[] = [];

    try {
      if (customerFile) {
        const result = await uploadCustomers(customerFile);
        newResults.push(result);
      }

      if (orderFile) {
        const result = await uploadOrders(orderFile);
        newResults.push(result);
      }

      setResults(newResults);
    } catch (error) {
      newResults.push(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setResults(newResults);
    } finally {
      setUploading(false);
    }
  };

  if (!session) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Data Upload</h1>
        <p className="text-muted-foreground">Please sign in to upload data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Data Upload</h1>
      <p className="text-muted-foreground">Upload CSV files to import customer and order data.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Upload */}
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-3">Customer Data</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Expected columns: email, name, phone (optional), totalSpend (optional), totalVisits (optional), lastVisit (optional)
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCustomerFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80"
          />
          {customerFile && (
            <p className="text-sm text-green-600 mt-2">✓ {customerFile.name} selected</p>
          )}
        </div>

        {/* Order Upload */}
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium mb-3">Order Data</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Expected columns: customerEmail, amount, status (optional), orderDate (optional)
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setOrderFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80"
          />
          {orderFile && (
            <p className="text-sm text-green-600 mt-2">✓ {orderFile.name} selected</p>
          )}
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex justify-center">
        <button
          onClick={handleUpload}
          disabled={uploading || (!customerFile && !orderFile)}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload Data'}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="border rounded-lg p-4 bg-muted/30">
          <h3 className="font-medium mb-2">Upload Results:</h3>
          <ul className="space-y-1">
            {results.map((result, index) => (
              <li key={index} className="text-sm">{result}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Sample Data Format */}
      <div className="border rounded-lg p-4 bg-muted/30">
        <h3 className="font-medium mb-2">Sample CSV Formats:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <strong>customers.csv:</strong>
            <pre className="mt-1 bg-background p-2 rounded border text-xs overflow-x-auto">
{`email,name,phone,totalSpend,totalVisits,lastVisit
john@example.com,John Doe,+1234567890,1500.50,5,2024-01-15T10:30:00Z
jane@example.com,Jane Smith,,750.25,3,2024-02-10T14:20:00Z`}
            </pre>
          </div>
          <div>
            <strong>orders.csv:</strong>
            <pre className="mt-1 bg-background p-2 rounded border text-xs overflow-x-auto">
{`customerEmail,amount,status,orderDate
john@example.com,299.99,completed,2024-01-15T10:30:00Z
jane@example.com,149.50,completed,2024-02-10T14:20:00Z`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
