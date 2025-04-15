
import { AlertTriangle, BarChart3, Map, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { CrimeTrendChart } from "@/components/dashboard/crime-trend-chart";
import { CrimeHeatmap } from "@/components/dashboard/crime-heatmap";
import { PredictionChart } from "@/components/dashboard/prediction-chart";
import { RecentIncidents } from "@/components/dashboard/recent-incidents";
import { crimeTrendData, predictionData, recentIncidents } from "@/data/mock-data";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Indian Crime Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time crime data analysis and predictive forecasting across India
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Crime Rate" 
            value="1,356"
            description="Cases reported this month"
            icon={BarChart3}
            trend={{ value: 12, positive: false }}
          />
          <StatCard 
            title="Violent Crime" 
            value="283"
            description="Cases this month"
            icon={AlertTriangle}
            trend={{ value: 8, positive: false }}
          />
          <StatCard 
            title="Prediction Accuracy" 
            value="94.2%"
            description="Based on last 6 months"
            icon={TrendingUp}
            trend={{ value: 3, positive: true }}
          />
          <StatCard 
            title="Active Hotspots" 
            value="23"
            description="Across major cities"
            icon={Map}
            trend={{ value: 5, positive: true }}
          />
        </div>
        
        <div className="grid gap-4 lg:grid-cols-2">
          <CrimeTrendChart 
            data={crimeTrendData} 
            title="Crime Rate Trends" 
            subtitle="Year to date crime statistics by category"
          />
          <PredictionChart 
            data={predictionData} 
            title="Crime Predictions"
            subtitle="Actual vs AI predicted crime rates"
          />
        </div>
        
        <div className="grid gap-4 lg:grid-cols-3">
          <CrimeHeatmap 
            title="Crime Hotspot Map"
            className="lg:col-span-2" 
          />
          <RecentIncidents incidents={recentIncidents} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
