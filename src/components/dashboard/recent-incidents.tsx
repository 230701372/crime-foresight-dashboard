
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Incident {
  id: string;
  type: string;
  location: string;
  time: string;
  severity: "low" | "medium" | "high";
  status: "open" | "investigating" | "closed";
}

interface RecentIncidentsProps {
  incidents: Incident[];
  className?: string;
}

export function RecentIncidents({ incidents, className }: RecentIncidentsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">Recent Incidents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="flex flex-col space-y-2 rounded-md border p-3 text-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{incident.type}</span>
                <Badge 
                  variant="outline" 
                  className={cn(
                    incident.severity === "low" && "border-blue-500 text-blue-500",
                    incident.severity === "medium" && "border-amber-500 text-amber-500",
                    incident.severity === "high" && "border-red-500 text-red-500",
                  )}
                >
                  {incident.severity}
                </Badge>
              </div>
              <div className="text-muted-foreground">
                <div className="flex justify-between">
                  <span>{incident.location}</span>
                  <span>{incident.time}</span>
                </div>
              </div>
              <div>
                <Badge 
                  variant="secondary"
                  className={cn(
                    "text-xs",
                    incident.status === "open" && "bg-blue-100 text-blue-800",
                    incident.status === "investigating" && "bg-amber-100 text-amber-800",
                    incident.status === "closed" && "bg-green-100 text-green-800",
                  )}
                >
                  {incident.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
