"use client";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Xeno CRM
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Powerful customer segmentation and campaign management for modern marketers. 
          Create targeted campaigns, analyze customer behavior, and drive engagement.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Data Upload</CardTitle>
            <CardDescription>
              Import customer and order data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/ingestion">
              <Button className="w-full" variant="outline">
                Upload Data
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Segments</CardTitle>
            <CardDescription>
              Create customer segments with AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/segments">
              <Button className="w-full" variant="outline">
                Create Segment
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Campaigns</CardTitle>
            <CardDescription>
              Launch targeted campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/campaigns">
              <Button className="w-full" variant="outline">
                View Campaigns
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">AI Assistant</CardTitle>
            <CardDescription>
              Natural language segmentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/segments">
              <Button className="w-full">
                Try AI Features
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Features Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Follow these steps to set up your first campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <span className="text-sm">Upload your customer and order data</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <span className="text-sm">Create customer segments using AI or manual rules</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-sm">Launch targeted campaigns and track performance</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>
              Everything you need for effective customer engagement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">AI-Powered Segmentation</p>
                <p className="text-xs text-muted-foreground">Create segments using natural language</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Campaign Management</p>
                <p className="text-xs text-muted-foreground">Track delivery and performance metrics</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Data Import</p>
                <p className="text-xs text-muted-foreground">Easy CSV upload for customers and orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
