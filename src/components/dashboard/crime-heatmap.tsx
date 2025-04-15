
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CrimeHeatmapProps {
  title: string;
  className?: string;
}

export function CrimeHeatmap({ title, className }: CrimeHeatmapProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-[16/9] overflow-hidden rounded-md border border-border bg-muted/20 relative">
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <p className="text-center text-sm">
              Interactive crime map visualization would be integrated here with a real mapping library
            </p>
          </div>
          <div className="absolute bottom-4 right-4 p-2 bg-card border border-border rounded-md shadow-sm">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="h-3 w-3 rounded-full bg-heatmap-low"></div>
                <span>Low</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-3 w-3 rounded-full bg-heatmap-medium"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-3 w-3 rounded-full bg-heatmap-high"></div>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
